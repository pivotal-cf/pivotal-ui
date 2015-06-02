var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
//gulp.task('spec', callback => runSequence('lint', 'jasmine-ci', callback));
var through = require('through2');

function testAssets(options = {}) {
  var webpackConfig = Object.assign(require('../config/webpack/config')('test'), options);
  return gulp.src('spec/pivotal-ui-react/**/*_spec.js')
    .pipe(plugins.plumber())
    .pipe(plugins.webpack(webpackConfig));
}

gulp.task('jasmine-ci', function() {
  return testAssets({watch: false})
    .pipe(plugins.jasmineBrowser.specRunner({console: true}))
    .pipe(plugins.jasmineBrowser.phantomjs());
});

gulp.task('jasmine', function() {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return testAssets({plugins: [plugin]})
    .pipe(plugins.jasmineBrowser.specRunner())
    .pipe(plugins.jasmineBrowser.server({whenReady: plugin.whenReady}));
});
