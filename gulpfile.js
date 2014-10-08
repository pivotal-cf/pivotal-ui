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

gulp.task('default', [
  'watch',
  'serve'
]);

gulp.task('test', [
  '_lint',
  '_cssCritic',
]);

gulp.task('watch', ['assets', '_copyTestAssets'], function() {
  gulp.watch("src/**/*", ['assets', '_copyTestAssets']);
});

gulp.task('serve', function() {
  connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});

gulp.task('clean', function(done) {
  del(['dist'], {force: true}, done);
});

gulp.task('assets', [
  '_styles',
  '_scripts',
  '_images',
  '_fonts',
  '_styleguide'
]);

// private

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
  return gulp.src(['src/pivotal-ui/pivotal-ui.scss', 'src/style_guide/style_guide.scss'])
    .pipe(compass({
      config_file: './config/compass.rb',
      css: 'dist',
      sass: 'src'
    }).on('error', function() { console.error(arguments) })
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
  return gulp.src(['src/style_guide/*.js', 'src/style_guide/github.css'])
    .pipe(gulp.dest('./dist/style_guide'));
});

gulp.task('_copyRandomAssets', ['clean'], function() {
  return gulp.src([
    'src/nginx.conf',
    'src/Staticfile',
    'src/style_guide/404.html',
    'src/style_guide/pane.html'
  ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('_hologramBuild', ['clean'], function() {
  return gulp.src('hologram_config.yml')
    .pipe(hologram({
      bundler: true
    }));
});

gulp.task('_copyTestAssets', ['assets'], function() {
  return gulp.src([
    'dist/**/*',
  ]).pipe(gulp.dest('./test/dist/'));
});

gulp.task('_createTestFileList', function(cb) {
  fs.readdir('./test/components/', function(err, files) {
    if (err) {
      console.error(err);
      process.exit(1)
    }

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

gulp.task('_cssCritic', ['_lint', '_copyTestAssets', '_createTestFileList'], function() {
  return gulp.src("./test/regressionRunner.html")
    .pipe(open("./test/regressionRunner.html",{app:"firefox"}));
});

gulp.task('_lint', function() {
  return gulp.src('./src/pivotal-ui/javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
});


