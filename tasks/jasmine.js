import gulp from 'gulp';
import webpack from 'webpack-stream';
var plugins = require('gulp-load-plugins')();

function testAssets(options = {}) {
  return gulp.src('spec/pivotal-ui-react/**/*_spec.js')
    .pipe(plugins.plumber())
    .pipe(webpack(Object.assign(require('../config/webpack/test'), options)));
}

gulp.task('jasmine-ci', function() {
  return testAssets({watch: false})
    .pipe(plugins.jasmineBrowser.specRunner({console: true}))
    .pipe(plugins.jasmineBrowser.phantomjs());
});

gulp.task('jasmine', function() {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return testAssets({watch: true, plugins: [plugin]})
    .pipe(plugins.jasmineBrowser.specRunner())
    .pipe(plugins.jasmineBrowser.server({whenReady: plugin.whenReady}));
});
