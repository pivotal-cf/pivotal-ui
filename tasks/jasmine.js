const gulp = require('gulp');
const {Jasmine} = require('pui-react-tools');
const runSequence = require('run-sequence');

import devWebpack from '../frontend_webpack.config.babel';

Jasmine.install({
  browserSpecRunnerOptions: {sourcemappedStacktrace: true, profile: false},
  headlessSpecRunnerOptions: {},
  headlessServerOptions: {driver: 'phantomjs', random: false, profile: false},
  serverOptions: {config: {random: false}},
  webpack: {
    test: () => {
      return {
        ...devWebpack,
        entry: './spec/index.js'
      }
    }
  }
});

gulp.task('default', cb => runSequence('spec-app', cb));