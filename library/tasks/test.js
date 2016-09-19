import gulp from 'gulp';
import runSequence from 'run-sequence';
import webpack from 'webpack-stream';
import {merge} from 'event-stream';
import webpackConfig from '../config/webpack';

const plugins = require('gulp-load-plugins')();

gulp.task('ci', callback => runSequence(
  'lint',
  'jasmine-task-helpers',
  'jasmine-react-ci',
  callback
));

gulp.task('lint', function() {
  return gulp.src([
      'src/pivotal-ui-react/**/*.js',
      'tasks/**/*.js',
      'spec/pivotal-ui-react/**/*.js',
      'spec/task-helpers/**/*.js',
      'phantomjs/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format('stylish'))
    .pipe(plugins.eslint.failOnError());
});

gulp.task('jasmine-task-helpers', function() {
  return gulp.src(['spec/task-helpers/**/*-spec.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.jasmine({includeStackTrace: true}));
});

function reactTestAssets(options = {}) {
  const config = Object.assign(require('../config/webpack.config')('test'), options);

  return gulp.src(['spec/pivotal-ui-react/**/*_spec.js', 'spec/styleguide/**/*spec.js'])
    .pipe(plugins.plumber())
    .pipe(webpack(config));
}

gulp.task('jasmine-react-ci', function() {
  return reactTestAssets({watch: false})
    .pipe(plugins.jasmineBrowser.specRunner({console: true}))
    .pipe(plugins.jasmineBrowser.phantomjs());
});

gulp.task('jasmine-react', function() {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return reactTestAssets({plugins: [plugin]})
    .pipe(plugins.jasmineBrowser.specRunner())
    .pipe(plugins.jasmineBrowser.server({sourcemappedStacktrace: true, whenReady: plugin.whenReady}));
});
