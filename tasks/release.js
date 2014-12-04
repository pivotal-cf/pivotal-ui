require('shelljs/global');
var bump = require('gulp-bump'),
  fs = require('fs'),
  gulp = require('gulp'),
  minifyCss = require('gulp-minify-css'),
  q = require('q'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  stp = require('stream-to-promise'),
  uglifyJs = require('gulp-uglify'),
  zip = require('gulp-zip');

var errorHandler = require('./errorHandler');
var githubService = require('./githubService');
var releaseHelper = require('./releaseHelper');


gulp.task('release', [
  '_pushVersion',
  '_zip',
], function(done) {
  q.all([releaseHelper.getNewTagName, releaseHelper.getVersionChanges])
  .spread(function(newTagName, versionChanges) {
    return githubService.createRelease(newTagName, versionChanges);
  })
  .then(function() {
    done();
  })
  .catch(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});

// private

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

gulp.task('_addFilesToRelease', ['assets'], function() {
  return releaseHelper.getNewReleaseName
  .then(function(newReleaseName) {
    return q.all([
      stp(gulp.src([
          'src/oocss/utils/_clearfix-me.scss',
          'src/oocss/list/_listWhitespace.scss',
          'src/oocss/whitespace/_whitespace.scss',
        ]).pipe(gulp.dest('release/' + newReleaseName + '/oocss/'))),

      stp(gulp.src('node_modules/bootstrap-sass/assets/stylesheets/**/*')
        .pipe(gulp.dest('release/' + newReleaseName + '/bootstrap-sass/'))),

      stp(gulp.src('src/pivotal-ui/components/pui-variables.scss')
        .pipe(gulp.dest('release/' + newReleaseName + '/'))),

      stp(gulp.src('build/**/*')
        .pipe(gulp.dest('release/' + newReleaseName + '/')))
    ]);
  })
  .fail(function(err) {
    errorHandler.handleError(err, {isFatal: true});
  });
});

gulp.task('_removeCommentsFromCss', ['_addFilesToRelease'], function(done) {
  releaseHelper.getNewReleaseName
  .then(function(newReleaseName) {
    gulp.src('release/' + newReleaseName + '/pivotal-ui.css')
      .pipe(replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/\n?/g, ''))
      .pipe(gulp.dest('release/' + newReleaseName + '/'))
      .on('end', done);
  });
});

gulp.task('_minifycss', ['_addFilesToRelease'], function(done) {
  releaseHelper.getNewReleaseName
  .then(function(newReleaseName) {
    gulp.src('release/' + newReleaseName + '/pivotal-ui.css')
      .pipe(minifyCss({keepBreaks: true}))
      .pipe(rename('pivotal-ui.min.css'))
      .pipe(gulp.dest('release/' + newReleaseName))
      .on('end', done);
  });
});

gulp.task('_minifyjs', ['_addFilesToRelease'], function() {
  releaseHelper.getNewReleaseName
  .then(function(newReleaseName) {
    gulp.src('release/' + newReleaseName + '/pivotal-ui.js')
      .pipe(uglifyJs())
      .pipe(rename('pivotal-ui.min.js'))
      .pipe(gulp.dest('release/' + newReleaseName))
      .on('end', done);
  });
});

gulp.task('_addVersionRelease', [
  '_addFilesToRelease',
  '_removeCommentsFromCss',
  '_minifycss',
  '_minifyjs',
]);

gulp.task('_zip', [
  'assets',
  '_addVersionRelease',
], function(done){
  releaseHelper.getNewReleaseName
  .then(function(newReleaseName) {
    gulp.src(['release/' + newReleaseName + '/**/*'])
      .pipe(zip(newReleaseName + '.zip'))
      .pipe(gulp.dest('./'))
      .on('end', done);
  })
  .fail(function(err) {
    errorHandler.handleError(err, {callback: done});
  });
});

gulp.task('_bumpVersion', [
  '_changelog',
  '_bumpPackage',
  '_addVersionRelease',
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
