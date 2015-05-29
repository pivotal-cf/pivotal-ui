require('babel/register')({optional: ['es7.objectRestSpread', 'regenerator']});

var argv = require('yargs').argv,
  cssnext = require('gulp-cssnext'),
  browserify = require('browserify'),
  connect = require('gulp-connect'),
  del = require('del'),
  drFrankenstyle = require('dr-frankenstyle'),
  errorHandler = require('./tasks/errorHandler.js'),
  fs = require('fs'),
  gulp = require('gulp'),
  path = require('path'),
  reactify = require('reactify'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  runSequence = require('run-sequence'),
  shell = require('gulp-shell'),
  source = require('vinyl-source-stream'),
  jsxTransform = require('gulp-react'),
  sass = require('gulp-sass'),
  through = require('through2');

require('./tasks/build.js');
require('./tasks/publish.js');
require('./tasks/test.js');
require('./tasks/release.js');
var src = require('./tasks/util').src;

gulp.task('default', [
  'watch',
  'serve'
]);

gulp.task('watch', ['assets'], function() {
  gulp.watch(['src/pivotal-ui/components/**/*.scss', 'src/pivotal-ui/pivotal-ui.scss'], ['_puiCss']);
  gulp.watch(['src/pivotal-ui/javascripts/**/*.js', 'src/pivotal-ui/javascripts/**/*.jsx'], ['_puiJs']);
  gulp.watch(['src/styleguide/**/*.scss'], ['_styleguideCss']);
});

gulp.task('serve', function() {
  connect.server({
    root: ['build'],
    port: 8000,
    livereload: true
  });
});

gulp.task('assets', [
  '_puiCss',
  '_styleguideCss',
  '_puiJs',
  '_otherAssets'
]);

gulp.task('clean', function(done) {
  del(['build'], {force: true}, done);
});

// private

gulp.task('_puiCss', function(callback) {
  runSequence(
    '_cleanBuiltPuiCss',
    '_buildPuiCss',
    '_buildPuiRailsCss',
    '_hologramBuild',
    '_copyOtherHtmlFiles',
  callback);
});

gulp.task('_cleanBuiltPuiCss', function(done) {
  del([
    'build/pivotal-ui.css',
    'build/pivotal-ui-rails.css',
    'build/*.html',
    'dist/'
  ], {force: true}, done);
});

gulp.task('_buildPuiCss', ['_buildComponents'], function() {
  return drFrankenstyle()
    .pipe(rename(function(filePath) {
      if (filePath.basename === 'components') {
        filePath.basename = 'pivotal-ui';
      }
      return filePath;
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('_buildPuiRailsCss', function() {
  return drFrankenstyle()
    .pipe(drFrankenstyle.railsUrls())
    .pipe(rename(function(filePath) {
      if (filePath.basename === 'components') {
        filePath.basename = 'pivotal-ui-rails';
      }
      return filePath;
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('_hologramBuild', function() {
  return src('')
    .pipe(shell('bundle exec hologram'))
    .on('error', errorHandler.handleError);
});

gulp.task('_copyOtherHtmlFiles', function() {
  return src([
    'src/styleguide/404.html',
    'src/styleguide/pane.html',
    'src/styleguide/reset_password.html'
  ]).pipe(gulp.dest('./build/'));
});



gulp.task('_cleanBuiltStyleguideCss', function(done) {
  del(['build/styleguide.css'], {force: true}, done);
});

var cssnextOptions = Object.keys(require('cssnext').features).reduce(function(memo, featureName) {
  memo[featureName] = featureName === 'autoprefixer';
  return memo;
}, {});
gulp.task('_styleguideCss', ['_cleanBuiltStyleguideCss'], function() {
  return src(['src/styleguide/styleguide.scss'])
    .pipe(sass())
    .pipe(cssnext(cssnextOptions))
    .pipe(gulp.dest('build/styleguide'));
});

gulp.task('_puiJs', [
  '_buildPuiJs',
  '_buildPuiReactJs'
]);

gulp.task('_cleanBuiltPuiJs', function(done) {
  del([
    'build/pivotal-ui.js',
    'build/pivotal-ui-react.js'
  ], {force: true}, done);
});

gulp.task('_buildPuiJs', ['_cleanBuiltPuiJs'], function() {
  var b = browserify('./src/pivotal-ui/javascripts/pivotal-ui.js');

  return b.bundle()
    .pipe(source('./pivotal-ui.js'))
    .pipe(gulp.dest('build/'))
});

gulp.task('_buildPuiReactJs', ['_cleanBuiltPuiJs'], function() {
  var b = browserify('./src/pivotal-ui/javascripts/pivotal-ui-react.js');
  b.transform(reactify, {es6: true});

  return b.bundle()
    .pipe(source('./pivotal-ui-react.js'))
    .pipe(gulp.dest('build/'))
});

gulp.task('_otherAssets', [
  '_copyPrism',
  '_copyStyleguideAssets',
  '_copyStaticfile',
  '_copyZeroClipboard',
  '_copyNginxConf'
]);

gulp.task('_cleanOtherAssets', function(done) {
  del([
    'build/prismjs',
    'build/styleguide/*.js',
    'build/styleguide/github.css',
    'build/Staticfile',
    'build/zeroclipboard'
  ], {force: true}, done);
});

gulp.task('_copyPrism', ['_cleanOtherAssets'], function() {
  return src(['node_modules/prismjs/themes/prism-okaidia.css', 'node_modules/prismjs/themes/prism.css'])
    .pipe(gulp.dest('./build/prismjs/'));
});

gulp.task('_copyStyleguideAssets', ['_cleanOtherAssets'], function() {
  return src([
    'src/styleguide/*.js',
    'src/styleguide/github.css',
    'src/images/*'
  ]).pipe(gulp.dest('./build/styleguide'));
});

gulp.task('_copyStaticfile', ['_cleanOtherAssets'], function() {
  return src(['src/Staticfile'])
    .pipe(gulp.dest('./build/'));
});

gulp.task('_copyZeroClipboard', ['_cleanOtherAssets'], function() {
  return src([
    'node_modules/zeroclipboard/dist/ZeroClipboard.js',
    'node_modules/zeroclipboard/dist/ZeroClipboard.swf'
  ])
    .pipe(gulp.dest('./build/zeroclipboard/'));
});

gulp.task('_copyNginxConf', ['_cleanOtherAssets'], function() {
  return src(['config/nginx.conf'])
    .pipe(gulp.dest('./build/'));
});