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


gulp.task('clean', function(done) {
  del(['dist'], {force: true}, done);
});


gulp.task('styles', ['clean'], function() {
  gulp.src(['src/pivotal-ui/pivotal-ui.scss', 'src/style_guide/style_guide.scss'])
    .pipe(compass({
      config_file: './config/compass.rb',
      css: 'dist',
      sass: 'src'
    }).on('error', function() { console.error(arguments) })
  );

  gulp.src(['src/syntax-highlighting/*.css'])
    .pipe(gulp.dest('./dist/syntax-highlighting/'));
});


gulp.task('scripts', ['clean'], function() {
  browserify('./src/pivotal-ui/javascripts/pivotal-ui.js').bundle()
    .pipe(source('./pivotal-ui.js'))
    .pipe(gulp.dest('dist/pivotal-ui/'))
});


gulp.task('images', ['clean'], function() {
  gulp.src('src/images/**/*')
    .pipe(gulp.dest('./dist/images/'));
});


gulp.task('fonts', ['clean'], function() {
  gulp.src([
      'node_modules/font-awesome/fonts/*',
    ])
    .pipe(gulp.dest('./dist/fonts/'));

  gulp.src([
      'src/source-sans-pro/**/*',
      '!src/source-sans-pro/source-sans-pro.css.scss'
    ])
    .pipe(gulp.dest('./dist/fonts/'));
});


gulp.task('styleguide', ['clean'], function() {
  gulp.src('hologram_config.yml')
    .pipe(hologram({
      bundler: true
    }));

  gulp.src(['src/style_guide/*.js', 'src/style_guide/github.css'])
    .pipe(gulp.dest('./dist/style_guide'));

  gulp.src(['src/nginx.conf',
    'src/Staticfile',
    'src/style_guide/404.html',
    'src/style_guide/pane.html'
  ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('_copyTestAssets', function() {
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
  gulp.src("./test/regressionRunner.html")
    .pipe(open("./test/regressionRunner.html",{app:"firefox"}));
});

gulp.task('_lint', function() {
  return gulp.src('./src/pivotal-ui/javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
});

gulp.task('test', [
  '_lint',
  '_cssCritic',
]);

gulp.task('assets', [
  'styles',
  'scripts',
  'images',
  'fonts',
  'styleguide'
]);

gulp.task('watch', ['assets'], function() {
  gulp.watch("src/**/*", ['assets']);
});

gulp.task('serve', function() {
  connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});

gulp.task('default', [
  'watch', 'serve'
]);
