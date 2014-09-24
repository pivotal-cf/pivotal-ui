var gulp = require('gulp');
var source = require('vinyl-source-stream');
var del = require('del');
var compass = require('gulp-compass');
var browserify = require('browserify');
var hologram = require('gulp-hologram');
var shell = require('gulp-shell');
var concat = require('gulp-concat');


gulp.task('clean', function(done) {
  del(['dist'], done);
});


gulp.task('styles', ['clean'], function() {
  gulp.src(['src/pivotal-ui/pivotal-ui.scss', 'src/style_guide/style_guide.scss'])
    .pipe(compass({
      config_file: './config/compass.rb',
      css: '.tmp/',
      sass: 'src'
    }));

  gulp.src(['src/syntax-highlighting/*.css'])
    .pipe(gulp.dest('./dist/syntax-highlighting/'));

  gulp.src(['.tmp/pivotal-ui/pivotal-ui.css', '.tmp/bundle.css'])
    .pipe(concat('pivotal-ui.css'))
    .pipe(gulp.dest('./dist/pivotal-ui/'));

  gulp.src('.tmp/style_guide/style_guide.css')
    .pipe(gulp.dest('dist/style_guide/'));

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
      'src/font-awesome/**/*',
      '!src/font-awesome/font-awesome.css.scss',
    ])
    .pipe(gulp.dest('./dist/font-awesome/'));

  gulp.src([
      'src/source-sans-pro/**/*',
      '!src/source-sans-pro/source-sans-pro.css.scss'
    ])
    .pipe(gulp.dest('./dist/source-sans-pro'));
});


gulp.task('styleguide', ['clean'], function() {
  gulp.src('hologram_config.yml')
    .pipe(hologram());

  gulp.src(['src/style_guide/*.js', 'src/style_guide/github.css'])
    .pipe(gulp.dest('./dist/style_guide'));

  gulp.src(['src/nginx.conf',
    'src/Staticfile',
    'src/style_guide/404.html',
    'src/style_guide/pane.html'
  ])
    .pipe(gulp.dest('./dist/'));
});


gulp.task('assets', [
  'styles',
  'scripts',
  'images',
  'fonts',
  'styleguide'
]);

gulp.task('watch', function() {
  gulp.watch("src/**/*", ['assets']);
});

gulp.task('serve', shell.task([
  'python -m SimpleHTTPServer 8000'
], {cwd: 'dist/' }));

gulp.task('default', [
  'assets'
]);