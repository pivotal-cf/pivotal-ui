const gulp = require('gulp');
const {Jasmine} = require('pui-react-tools');
const runSequence = require('run-sequence');

Jasmine.install({
  browserSpecRunnerOptions: {sourcemappedStacktrace: true, profile: false},
  headlessSpecRunnerOptions: {},
  headlessServerOptions: {driver: 'phantomjs', random: false, profile: true},
  appGlobs: ['spec/**/*spec.js'],
  serverOptions: {config: {random: false}}
});

gulp.task('default', cb => runSequence('spec-app', cb));