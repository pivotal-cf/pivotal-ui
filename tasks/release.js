var gulp = require('gulp');
var fs = require('fs');
var argv = require('yargs').argv;
var changelog = require('conventional-changelog');
var zip = require('gulp-zip');
var bump = require('gulp-bump');
var git = require('gulp-git');
require('shelljs/global');
var rest = require('restler');

gulp.task('release', [
  '_pushVersion',
  '_zip',
], function(done) {
  rest.post('https://api.github.com/repos/pivotal-cf/pivotal-ui/releases', {
    query: {
      access_token: process.env.RELEASE_TOKEN,
    },
    data: JSON.stringify({
      'tag_name': tagName(),
      'name': tagName(),
      'body': versionChanges,
      'draft': true
    })
  }).on('complete', function(result, response) {
    if (!/2../.test(response.statusCode)) {
      handleError(result, {callback: done});
    }
    fs.readFile('src/pivotal-ui/components/variables.scss', {encoding: 'utf-8'}, function(err, sass) {
      if (err) {
        handleError(err);
        done();
      }
      rest.post('https://uploads.github.com/repos/pivotal-cf/pivotal-ui/releases/' + result.id + '/assets', {
        query: {
          name: 'variables.scss',
          access_token: process.env.RELEASE_TOKEN,
        },
        headers: {
          'Content-Type': 'text/plain'
        },
        data: sass,
      }).on('complete', function(result, response) {
        if (!/2../.test(response.statusCode)) {
          handleError(result);
          return done();
        }
        console.log('Successfully created draft release ' + tagName());
        done();
      });
    });
  });
});

gulp.task('_changelog', ['_bumpPackage'], function(done) {
  changelog({
    version: version(),
    file: 'tmp/foo',
  }, function(err, log) {
    if (err) { handleError(err, {callback: done}); }

    versionChanges = log;
    fs.readFile('CHANGELOG.md', function(err, oldLog) {
      if (err) { handleError(err, {callback: done}); }

      fs.writeFile('CHANGELOG.md', versionChanges + oldLog, function(err) {
        if (err) { handleError(err, {callback: done}); }
        done();
      });
    });
  });
});

gulp.task('_zip', [
  'assets',
], function(){
  return gulp.src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('_bumpPackage', [], function(done) {
  determineReleaseType(function(err, releaseType) {
    if (err) {
      handleError(err, {isFatal: true});
    }

    var stream = gulp.src(['./package.json'])
      .pipe(bump({type: releaseType}))
      .pipe(gulp.dest('./'));

    stream.on('finish', done);
  });
});

gulp.task('_addVersionRelease', ['_bumpPackage'], function(done) {
  return gulp.src('dist/**/*')
    .pipe(gulp.dest('release/' + version() + '/'))
    .pipe(git.add({args: '-N'}));
});

gulp.task('_bumpVersion', ['_bumpPackage', '_addVersionRelease', '_changelog'], function(){
  return gulp.src(['package.json','CHANGELOG.md', 'release/'])
    .pipe(git.commit('v' + version()));
});

gulp.task('_tagVersion', ['_bumpVersion'], function(done) {
  git.tag(tagName(), tagName(), done);
});

gulp.task('_pushVersion', ['_tagVersion'], function(done) {
  // These calls are synchronous in case there is a prompt for credentials
  var res = exec('git push origin HEAD');
  if (res.code !== 0) {
    handleError('Unable to push version', {isFatal: true});
  }

  res = exec('git push origin ' + tagName());
  if (res.code !== 0) {
    handleError('Unable to push tag', {isFatal: true});
  }

  done();
});

function determineReleaseType(callback) {
  changelog({
    version: version(),
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

function tagName() {
  return 'v' + version();
}

function version() {
  return packageJson().version;
}

function packageJson() {
  return JSON.parse(fs.readFileSync("./package.json", "utf8"));
}

function handleError(err, opts) {
  opts = opts || {};

  console.error(err);
  if (!!argv.fatal || opts.isFatal) {
    process.exit(1);
  } else if (opts.callback) {
    opts.callback();
  }
}
