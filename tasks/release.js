require('shelljs/global');
var bump = require('gulp-bump');
var fs = require('fs');
var gulp = require('gulp');
var q = require('q');
var zip = require('gulp-zip');

var errorHandler = require('./errorHandler');
var githubService = require('./githubService');
var releaseHelper = require('./releaseHelper');


gulp.task('release', [
  '_pushVersion',
  '_zip',
], function(done) {
  q.all([releaseHelper.getNewTagName, releaseHelper.getVersionChanges])
  .spread(function(newTagName, versionChanges) {
    return [
      githubService.createRelease(newTagName, versionChanges),
      q.nfcall(fs.readFile, 'src/pivotal-ui/components/variables.scss', {encoding: 'utf-8'})
    ];
  })
  .spread(function(res, sass) {
    return githubService.uploadFile(res.releaseId, sass);
  })
  .then(function() {
    done();
  })
  .catch(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});

// private

gulp.task('_zip', [
  'assets',
], function(){
  return gulp.src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('_changelog', function(done) {
  releaseHelper.getVersionChanges
  .then(function(versionChanges) {
    fs.readFile('CHANGELOG.md', function(err, oldLog) {
      if (err) { errorHandler.handleError(err, {callback: done}); }

      fs.writeFile('CHANGELOG.md', versionChanges + oldLog, function(err) {
        if (err) { errorHandler.handleError(err, {callback: done}); }
        done();
      });
    });
  })
  .fail(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});

gulp.task('_bumpPackage', ['assets'], function(done) {
  releaseHelper.getNewVersion
  .then(function(newVersion) {
    gulp.src(['./package.json'])
      .pipe(bump({version: newVersion}))
      .pipe(gulp.dest('./'))
      .on('end', done);
  })
  .fail(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});

gulp.task('_addVersionRelease', ['assets'], function(done) {
  releaseHelper.getNewVersion
  .then(function(newVersion) {
    gulp.src('dist/**/*')
      .pipe(gulp.dest('release/' + newVersion + '/'))
      .on('end', done);
  })
  .fail(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});

gulp.task('_bumpVersion', [
  '_changelog',
  '_bumpPackage',
  '_addVersionRelease'
], function(done) {
  releaseHelper.getNewVersion
  .then(function(newVersion) {
    // Can't use gulp git because of https://github.com/stevelacy/gulp-git/issues/49
    var res = exec('git add package.json CHANGELOG.md release/');
    if (res.code !== 0) {
      errorHandler.handleError('Unable to add files for committing', {isFatal: true});
    }

    res = exec('git commit -m "v' + newVersion + '"');
    if (res.code !== 0) {
      errorHandler.handleError('Unable to commit version changes', {isFatal: true});
    }

    done();
  })
  .fail(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});

gulp.task('_tagVersion', ['_bumpVersion'], function(done) {
  releaseHelper.getNewTagName
  .then(function(tagName) {
    var res = exec('git tag ' + tagName);
    if (res.code !== 0) {
      errorHandler.handleError('Unable to create tag', {isFatal: true});
    }
    done();
  })
  .fail(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});

gulp.task('_pushVersion', ['_tagVersion'], function(done) {
  // These calls are synchronous in case there is a prompt for credentials
  releaseHelper.getNewTagName
  .then(function(tagName) {
    var res = exec('git push origin HEAD');
    if (res.code !== 0) {
      errorHandler.handleError('Unable to push version', {isFatal: true});
    }

    res = exec('git push origin ' + tagName);
    if (res.code !== 0) {
      errorHandler.handleError('Unable to push tag', {isFatal: true});
    }

    done();
  })
  .fail(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});
