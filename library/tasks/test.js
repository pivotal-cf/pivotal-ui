import gulp from 'gulp';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack-stream';
import {map, merge} from 'event-stream';
import reduce from 'stream-reduce';
import File from 'vinyl';
import path from 'path';
import webpackConfig from '../config/webpack';

const plugins = loadPlugins();

gulp.task('ci', callback => runSequence(
  'lint',
  'jasmine-task-helpers',
  'jasmine-react-ci',
  callback
));

gulp.task('lint', function() {
  const srcLintStream = gulp.src(['src/pivotal-ui-react/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.eslint({
      rulePaths: ['config/eslint-rules/'],
      rules: {'no-object-assign': 2, 'no-relative-cross-package-imports': 2}
    }));

  const otherLintStream = gulp.src([
      'tasks/**/*.js',
      'spec/pivotal-ui-react/**/*.js',
      'spec/task-helpers/**/*.js',
      'phantomjs/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.eslint());

  return merge(srcLintStream, otherLintStream)
    .pipe(plugins.eslint.format('stylish'))
    .pipe(plugins.eslint.failOnError());
});

gulp.task('jasmine-task-helpers', function() {
  return gulp.src(['spec/task-helpers/**/*-spec.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.jasmine({includeStackTrace: true}));
});

function reactTestAssets(sourcePath, options = {}) {
  return gulp.src(sourcePath)
    .pipe(plugins.plumber())
    .pipe(webpack(webpackConfig({nodeEnv: 'test', ...options})));
}

gulp.task('jasmine-react-ci', function() {
  return reactTestAssets( ['spec/pivotal-ui-react/**/*_spec.js', 'spec/styleguide/**/*spec.js'], {watch: false})
    .pipe(plugins.jasmineBrowser.specRunner({console: true}))
    .pipe(plugins.jasmineBrowser.phantomjs());
});

gulp.task('jasmine-react', function() {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return reactTestAssets(['spec/pivotal-ui-react/**/*_spec.js', 'spec/styleguide/**/*spec.js'], {watch: true, plugins: [plugin]})
    .pipe(plugins.jasmineBrowser.specRunner())
    .pipe(plugins.jasmineBrowser.server({whenReady: plugin.whenReady}));
});
