var argv = require('yargs').argv,
  browserify = require('browserify'),
  compass = require('gulp-compass'),
  connect = require('gulp-connect'),
  del = require('del'),
  ejs = require('gulp-ejs'),
  errorHandler = require('./tasks/errorHandler.js'),
  fs = require('fs'),
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  open = require('gulp-open'),
  reactify = require('reactify'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  shell = require('gulp-shell'),
  source = require('vinyl-source-stream'),
  stylish = require('jshint-stylish');

require('./tasks/test.js');
require('./tasks/release.js');

gulp.task('default', [
  'watch',
  'serve'
]);

gulp.task('watch', ['assets', '_copyTestAssets'], function() {
  gulp.watch(['src/pivotal-ui/**/*', 'hologram/**/*'], ['assets', '_copyTestAssets']);
});

gulp.task('serve', function() {
  connect.server({
    root: ['build'],
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
  '_images',
  '_fonts',
  '_styleguide'
]);

gulp.task('clean', function(done) {
  del(['build'], {force: true}, done);
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

gulp.task('_compassBuild', [
  '_compassBuildPui',
  '_compassBuildPuiRails',
  '_compassBuildStyleguide'
]);

gulp.task('_compassBuildPui', ['clean'], function() {
  return gulp.src(['src/pivotal-ui/pivotal-ui.scss'])
    .pipe(
      compass({
        config_file: './config/compass.rb',
        css: 'build',
        sass: 'src/pivotal-ui'
      }).on('error', errorHandler.handleError)
    );
});

gulp.task('_compassBuildPuiRails', ['_compassBuildPui'], function() {
  return gulp.src('build/pivotal-ui.css')
    .pipe(
      replace(/url\(('|")\.\.\/fonts\//g, 'font-url\($1')
    )
    .pipe(
      replace(/url\(('|")\.\.\/images\//g, 'image-url\($1')
    )
    .pipe(rename('pivotal-ui-rails.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('_compassBuildStyleguide', ['clean'], function() {
  return gulp.src(['src/styleguide/styleguide.scss'])
    .pipe(
      compass({
        config_file: './config/compass.rb',
        css: 'build',
        sass: 'src'
      }).on('error', errorHandler.handleError)
    );
});

gulp.task('_copyPrism', ['clean'], function() {
  return gulp.src(['src/syntax-highlighting/*.css'])
    .pipe(gulp.dest('./build/syntax-highlighting/'));
});

gulp.task('_scripts', ['clean'], function() {
  var b = browserify('./src/pivotal-ui/javascripts/pivotal-ui.js');
  b.transform(reactify);

  return b.bundle()
    .pipe(source('./pivotal-ui.js'))
    .pipe(gulp.dest('build/'))
});

gulp.task('_images', ['clean'], function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('_fontAwesome', ['clean'], function() {
  return gulp.src([
    'node_modules/font-awesome/fonts/*',
  ])
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('_sourceSansPro', ['clean'], function() {
  return gulp.src([
    'src/source-sans-pro/**/*',
    '!src/source-sans-pro/source-sans-pro.css.scss'
  ])
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('_copyStyleguideAssets', ['clean'], function() {
  return gulp.src(['src/styleguide/*.js', 'src/styleguide/github.css'])
    .pipe(gulp.dest('./build/styleguide'));
});

gulp.task('_copyRandomAssets', ['clean'], function() {
  return gulp.src([
    'src/nginx.conf',
    'src/Staticfile',
    'src/styleguide/404.html',
    'src/styleguide/pane.html',
    'src/styleguide/reset_password.html'
  ])
    .pipe(gulp.dest('./build/'));
});

gulp.task('_hologramBuild', ['clean', '_cleanTest'], function() {
  return gulp.src('')
    .pipe(shell('bundle exec hologram'))
    .on('error', errorHandler.handleError);
});
