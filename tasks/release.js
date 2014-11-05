require('shelljs/global');
var bump = require('gulp-bump');
var changelog = require('conventional-changelog');
var fs = require('fs');
var gulp = require('gulp');
var q = require('q');
var semver = require('semver');
var zip = require('gulp-zip');

var errorHandler = require('./errorHandler');
var githubService = require('./githubService');

var getNewVersion = function() {
  var deferred = q.defer();

  determineReleaseType(function(err, releaseType) {
    if (err) {
      deferred.reject(err);
    } else {
      var newVersion;
      var oldVersion = require('../package.json').version;
      newVersion = semver.inc(oldVersion, releaseType);
      deferred.resolve(newVersion);
    }
  });

  return deferred.promise;
}();

var getNewTagName = function() {
  var deferred = q.defer();

  getNewVersion
  .then(function(newVersion) {
    deferred.resolve('v' + newVersion);
  })
  .fail(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}();

var getVersionChanges = function() {
  var deferred = q.defer();

  getNewVersion
  .then(function(newVersion) {
    changelog({
      version: newVersion,
      file: 'tmp/foo',
    }, function(err, versionChanges) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(versionChanges);
      }
    });
  })
  .fail(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}();

gulp.task('release', [
  '_pushVersion',
  '_zip',
], function(done) {
  q.all([getNewTagName, getVersionChanges])
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
  getVersionChanges
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

gulp.task('_bumpPackage', function(done) {
  getNewVersion
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
  getNewVersion
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
  getNewVersion
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
  getNewTagName
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
  getNewTagName
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

function determineReleaseType(callback) {
  changelog({
    version: 'foo',
    file: 'tmp/foo'
  }, function(err, log) {
    if (err) {
      callback(err, null);
    } else if (/# breaking changes/i.test(log)) {
      callback(null, 'major');
    } else if (/# features/i.test(log)) {
      callback(null, 'minor');
    } else if (/# bug fixes/i.test(log)) {
      callback(null, 'patch');
    } else {
      callback('No changes found', null);
    }
  });
}
