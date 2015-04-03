var argv = require('yargs').argv,
  autoprefixer = require('gulp-autoprefixer'),
  autoprefixerCore = require('autoprefixer-core'),
  browserify = require('browserify'),
  connect = require('gulp-connect'),
  del = require('del'),
  ejs = require('gulp-ejs'),
  errorHandler = require('./tasks/errorHandler.js'),
  fs = require('fs'),
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  open = require('gulp-open'),
  mkdirp = require('mkdirp'),
  path = require('path'),
  reactify = require('reactify'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  shell = require('gulp-shell'),
  source = require('vinyl-source-stream'),
  stylish = require('jshint-stylish'),
  jsxTransform = require('gulp-react'),
  sass = require('gulp-sass'),
  nodeSass = require('node-sass'),
  through = require('through2');


require('./tasks/test.js');
require('./tasks/release.js');
var src = require('./tasks/util').src;

gulp.task('default', [
  'watch',
  'serve'
]);

gulp.task('watch', ['assets'], function() {
  gulp.watch(['src/pivotal-ui/components/**/*.scss', 'src/pivotal-ui/pivotal-ui.scss'], ['_puiScss']);
  gulp.watch(['src/pivotal-ui/javascripts/**/*.js', 'src/pivotal-ui/javascripts/**/*.jsx'], ['_puiJs']);
  gulp.watch(['src/styleguide/**/*.scss'], ['_styleguideScss']);
});

gulp.task('serve', function() {
  connect.server({
    root: ['build'],
    port: 8000,
    livereload: true
  });
});

gulp.task('lint', function() {
  return src('./src/pivotal-ui/javascripts/**/*.js?(x)')
    .pipe(jsxTransform())
    .pipe(jshint().on('error', errorHandler.handleError))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('assets', [
  '_puiScss',
  '_styleguideScss',
  '_puiJs',
  '_otherAssets',
  '_testAssets',
]);

gulp.task('clean', function(done) {
  del(['build', 'test/css/build'], {force: true}, done);
});

// private

gulp.task('_puiScss', [
  '_sassBuildPui',
  '_sassBuildPuiRails',
  '_sassBuildComponents',
  '_copyPuiScssToTest',
  '_hologramBuild',
  '_copyOtherHtmlFiles',
]);

gulp.task('_cleanBuiltPuiScss', function(done) {
  del([
    'build/pivotal-ui.css',
    'build/pivotal-ui-rails.css',
    'build/*.html',
    'dist/',
    'test/css/components',
    'test/css/build/',
  ], {force: true}, function() {
    fs.mkdir('test/css/components', done);
  });
});

gulp.task('_sassBuildPui', ['_cleanBuiltPuiScss'], function() {
  return src(['src/pivotal-ui/pivotal-ui.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build'));
});

gulp.task('_sassBuildComponents', ['_cleanBuiltPuiScss'], function(){
  return src(['src/pivotal-ui/components/*.scss'])
    .pipe(through.obj(function(file, encoding, callback) {
      var componentName = path.basename(file.path, '.scss');
      var outputDir = path.resolve(__dirname, 'dist', componentName);

      if(componentName !== "mixins" && componentName !== "pui-variables") {
        var css = nodeSass.renderSync({
          outputStyle: 'compressed',
          file: file.path
        }).css;
        css = autoprefixerCore.process(css).css;

        mkdirp.sync(outputDir);
        fs.writeFileSync(path.resolve(outputDir, componentName+'.css'), css);

      }
      callback();
    }));
});

gulp.task('_sassBuildPuiRails', ['_cleanBuiltPuiScss', '_sassBuildPui'], function() {
  return src('build/pivotal-ui.css')
    .pipe(
      replace(/url\(('|")\.\.\/fonts\//g, 'font-url\($1fonts/')
    )
    .pipe(
      replace(/url\(('|")\.\.\/images\//g, 'image-url\($1images/')
    )
    .pipe(rename('pivotal-ui-rails.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('_copyPuiScssToTest', ['_sassBuildPui'], function() {
  return src(['build/pivotal-ui.css'])
    .pipe(gulp.dest('test/css/build/'));
});

gulp.task('_hologramBuild', ['_cleanBuiltPuiScss'], function() {
  return src('')
    .pipe(shell('bundle exec hologram'))
    .on('error', errorHandler.handleError);
});

gulp.task('_copyOtherHtmlFiles', ['_cleanBuiltPuiScss'], function() {
  return src([
    'src/styleguide/404.html',
    'src/styleguide/pane.html',
    'src/styleguide/reset_password.html'
  ]).pipe(gulp.dest('./build/'));
});



gulp.task('_styleguideScss', [
  '_sassBuildStyleguide',
]);

gulp.task('_cleanBuiltStyleguideScss', function(done) {
  del(['build/styleguide.css'], {force: true}, done);
});

gulp.task('_sassBuildStyleguide', ['_cleanBuiltStyleguideScss'], function() {
  return src(['src/styleguide/styleguide.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/styleguide'));
});



gulp.task('_puiJs', [
  '_buildPuiJs',
  '_buildPuiReactJs',
  '_copyPuiJsToTest',
]);

gulp.task('_cleanBuiltPuiJs', function(done) {
  del([
    'build/pivotal-ui.js',
    'build/pivotal-ui-react.js',
    'test/css/build/pivotal-ui-react.js',
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

gulp.task('_copyPuiJsToTest', ['_cleanBuiltPuiJs', '_buildPuiReactJs'], function() {
  return src('build/pivotal-ui-react.js')
    .pipe(gulp.dest('test/css/build/'));
});



gulp.task('_otherAssets', [
  '_copyPrism',
  '_copyImages',
  '_copyFontAwesome',
  '_copySourceSansPro',
  '_copyStyleguideAssets',
  '_copyStaticfile',
  '_copyZeroClipboard',
  '_copyNginxConf',
]);

gulp.task('_cleanOtherAssets', function(done) {
  del([
    'build/syntax-highlighting',
    'build/images/',
    'build/fonts',
    'build/styleguide/*.js',
    'build/styleguide/github.css',
    'build/Staticfile',
    'build/zeroclipboard',
  ], {force: true}, done);
});

gulp.task('_copyPrism', ['_cleanOtherAssets'], function() {
  return src(['src/syntax-highlighting/*.css'])
    .pipe(gulp.dest('./build/syntax-highlighting/'));
});

gulp.task('_copyImages', ['_cleanOtherAssets'], function() {
  return src('src/images/**/*')
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('_copyFontAwesome', ['_cleanOtherAssets'], function() {
  return src([
    'node_modules/font-awesome/fonts/*',
  ])
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('_copySourceSansPro', ['_cleanOtherAssets'], function() {
  return src([
    'src/source-sans-pro/**/*',
    '!src/source-sans-pro/source-sans-pro.css.scss'
  ])
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('_copyStyleguideAssets', ['_cleanOtherAssets'], function() {
  return src(['src/styleguide/*.js', 'src/styleguide/github.css'])
    .pipe(gulp.dest('./build/styleguide'));
});

gulp.task('_copyStaticfile', ['_cleanOtherAssets'], function() {
  return src(['src/Staticfile'])
    .pipe(gulp.dest('./build/'));
});

gulp.task('_copyZeroClipboard', ['_cleanOtherAssets'], function() {
  return src([
    'node_modules/zeroclipboard/dist/ZeroClipboard.js',
    'node_modules/zeroclipboard/dist/ZeroClipboard.swf',
  ])
    .pipe(gulp.dest('./build/zeroclipboard/'));
});

gulp.task('_copyNginxConf', ['_cleanOtherAssets'], function() {
  return src(['config/nginx.conf'])
    .pipe(gulp.dest('./build/'));
});



gulp.task('_testAssets', [
  '_copyTestFonts',
  '_copyTestImages',
  '_copyTestPrism',
  '_copyTestStyleguideAssets',
]);

gulp.task('_cleanTestAssets', function(done) {
  del([
    'test/css/build/fonts/**/*',
    'test/css/build/images/**/*',
    'test/css/build/syntax-highlighting/**/*',
  ], {force: true}, done);
});

gulp.task('_copyTestFonts', ['_cleanTestAssets', '_otherAssets'], function() {
  return src('build/fonts/**/*')
    .pipe(gulp.dest('./test/css/build/fonts'));
});

gulp.task('_copyTestImages', ['_cleanTestAssets', '_otherAssets'], function() {
  return src('build/images/**/*')
    .pipe(gulp.dest('./test/css/build/images'));
});

gulp.task('_copyTestPrism', ['_cleanTestAssets', '_otherAssets'], function() {
  return src('build/syntax-highlighting/**/*')
    .pipe(gulp.dest('./test/css/build/syntax-highlighting'));
});

gulp.task('_copyTestStyleguideAssets', ['_cleanTestAssets', '_otherAssets'], function() {
  return src('build/styleguide/github.css')
    .pipe(gulp.dest('./test/css/build/styleguide'));
});

