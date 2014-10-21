var gulp = require('gulp');
var source = require('vinyl-source-stream');
var del = require('del');
var compass = require('gulp-compass');
var browserify = require('browserify');
var hologram = require('gulp-hologram');
var connect = require('gulp-connect');
var open = require('gulp-open');
var ejs = require('gulp-ejs');
var fs = require('fs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var argv = require('yargs').argv;
var changelog = require('conventional-changelog');
var zip = require('gulp-zip');
var bump = require('gulp-bump');
var git = require('gulp-git');
require('shelljs/global');

gulp.task('default', [
  'watch',
  'serve'
]);

gulp.task('test', [
  'lint',
  '_cssCritic',
]);

gulp.task('ci', [
  'lint',
  'assets'
]);

gulp.task('release', [
  '_pushVersion',
  '_zip',
]);

gulp.task('_changelog', ['_bumpPackage'], function(done) {
  changelog({
    version: packageJson().version,
    file: 'CHANGELOG.md',
    changeLevels: ['breaking']
  }, function(err, log) {
    if (err) { handleError(err); }
    fs.writeFile('CHANGELOG.md', log, function(err) {
      if (err) { handleError(err); }
      done();
    });
  });
});

gulp.task('_zip', [
  'assets',
], function(){
  return gulp.src('dist/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('tmp/'));
});

gulp.task('_bumpPackage', [], function(done) {
  determineReleaseType(function(err, releaseType) {
    if (err) {
      handleError(err);
      process.exit(1);
    }

    var stream = gulp.src(['./package.json'])
      .pipe(bump({type: releaseType}))
      .pipe(gulp.dest('./'));

    stream.on('finish', done);
  });
});

gulp.task('_bumpVersion', ['_bumpPackage', '_changelog'], function(){
  return gulp.src(['package.json','CHANGELOG.md'])
    .pipe(git.commit('v' + packageJson().version));
});

gulp.task('_tagVersion', ['_bumpVersion'], function(done) {
  git.tag(tagName(), tagName(), done);
});

gulp.task('_pushVersion', ['_tagVersion'], function() {
  // These calls are synchronous in case there is a prompt for credentials
  var res = exec('git push origin HEAD');
  if (res.code !== 0) {
    process.exit(1);
  }

  res = exec('git push origin ' + tagName());
  if (res.code !== 0) {
    process.exit(1);
  }
});

function determineReleaseType(callback) {
  changelog({
    version: packageJson().version,
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
  return 'v' + packageJson().version;
}

gulp.task('watch', ['assets', '_copyTestAssets'], function() {
  gulp.watch(['src/**/*', 'hologram/**/*'], ['assets', '_copyTestAssets']);
});

gulp.task('serve', function() {
  connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});

gulp.task('lint', function() {
  return gulp.src('./src/pivotal-ui/javascripts/**/*.js')
    .pipe(jshint().on('error', handleError))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('assets', [
  '_styles',
  '_scripts',
  '_images',
  '_fonts',
  '_styleguide'
]);

gulp.task('clean', function(done) {
  del(['dist'], {force: true}, done);
});

// private

gulp.task('_cleanTest', function(done) {
  del(['test/components'], {force: true}, function() {
    fs.mkdir('test/components', done);
  });
});

gulp.task('_styleguide', [
  'clean',
  '_hologramBuild',
  '_copyStyleguideAssets',
  '_copyRandomAssets'
]);

gulp.task('_styles', [
  'clean',
  '_compassBuild',
  '_copyPrism'
]);

gulp.task('_fonts', [
  'clean',
  '_fontAwesome',
  '_sourceSansPro'
]);

gulp.task('_compassBuild', ['clean'], function() {
  return gulp.src(['src/pivotal-ui/pivotal-ui.scss', 'src/styleguide/styleguide.scss'])
    .pipe(
      compass({
        config_file: './config/compass.rb',
        css: 'dist',
        sass: 'src'
      }).on('error', handleError)
    );
});

gulp.task('_copyPrism', ['clean'], function() {
  return gulp.src(['src/syntax-highlighting/*.css'])
    .pipe(gulp.dest('./dist/syntax-highlighting/'));
});

gulp.task('_scripts', ['clean'], function() {
  return browserify('./src/pivotal-ui/javascripts/pivotal-ui.js').bundle()
    .pipe(source('./pivotal-ui.js'))
    .pipe(gulp.dest('dist/pivotal-ui/'))
});

gulp.task('_images', ['clean'], function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('_fontAwesome', ['clean'], function() {
  return gulp.src([
    'node_modules/font-awesome/fonts/*',
  ])
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('_sourceSansPro', ['clean'], function() {
  return gulp.src([
    'src/source-sans-pro/**/*',
    '!src/source-sans-pro/source-sans-pro.css.scss'
  ])
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('_copyStyleguideAssets', ['clean'], function() {
  return gulp.src(['src/styleguide/*.js', 'src/styleguide/github.css'])
    .pipe(gulp.dest('./dist/styleguide'));
});

gulp.task('_copyRandomAssets', ['clean'], function() {
  return gulp.src([
    'src/nginx.conf',
    'src/Staticfile',
    'src/styleguide/404.html',
    'src/styleguide/pane.html'
  ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('_hologramBuild', ['clean', '_cleanTest'], function() {
  return gulp.src('hologram_config.yml')
    .pipe(
      hologram({
        bundler: true
      }).on('error', handleError)
    );
});

gulp.task('_copyTestAssets', ['assets'], function() {
  return gulp.src([
    'dist/**/*',
  ]).pipe(gulp.dest('./test/dist/'));
});

gulp.task('_createTestFileList', ['assets'], function(cb) {
  fs.readdir('./test/components/', function(err, files) {
    if (err) { handleError(err) }

    var stream = gulp.src('./test/regressionRunner.ejs')
      .pipe(ejs({
        files: files
      }, {
        ext: '.js'
      }))
      .pipe(gulp.dest('./test/'));

    stream.on('finish', cb)
  });
});

gulp.task('_cssCritic', ['lint', '_copyTestAssets', '_createTestFileList'], function() {
  return gulp.src("./test/regressionRunner.html")
    .pipe(open("./test/regressionRunner.html",{app:"firefox"}));
});

function packageJson() {
  return JSON.parse(fs.readFileSync("./package.json", "utf8"));
}

function isFatal() {
  return !!argv.fatal;
}

function handleError(err) {
  console.error(err)
  if (isFatal()) {
    process.exit(1);
  }
}
