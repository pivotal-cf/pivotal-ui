var argv = require('yargs').argv;
var browserify = require('browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var del = require('del');
var ejs = require('gulp-ejs');
var errorHandler = require('./tasks/errorHandler.js');
var fs = require('fs');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var open = require('gulp-open');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var uglifyJs = require('gulp-uglify');

require('./tasks/test.js');
require('./tasks/release.js');

gulp.task('default', [
  'watch',
  'serve'
]);

gulp.task('ci', [
  'lint',
  'assets'
]);

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
    .pipe(jshint().on('error', errorHandler.handleError))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('assets', [
  '_styles',
  '_scripts',
  '_minify',
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

gulp.task('_minify', ['_minifyjs', '_minifycss']);

gulp.task('_minifycss', ['_styles'], function() {
  return gulp.src('./dist/pivotal-ui/pivotal-ui.css')
    .pipe(minifyCss({keepBreaks:true}))
    .pipe(rename('pivotal-ui.min.css'))
    .pipe(gulp.dest('./dist/pivotal-ui/'));
});

gulp.task('_minifyjs', ['_scripts'], function() {
  return gulp.src('./dist/pivotal-ui/*.js')
    .pipe(uglifyJs())
    .pipe(rename('pivotal-ui.min.js'))
    .pipe(gulp.dest('./dist/pivotal-ui/'));
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
      }).on('error', errorHandler.handleError)
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
  return gulp.src('')
    .pipe(shell('bundle exec hologram'))
    .on('error', errorHandler.handleError);
});
