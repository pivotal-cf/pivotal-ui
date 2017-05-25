const gulp = require('gulp');
const {Jasmine} = require('pui-react-tools');

Jasmine.install({
  browserSpecRunnerOptions: {sourcemappedStacktrace: true, profile: false},
  headlessSpecRunnerOptions: {},
  headlessServerOptions: {driver: 'phantomjs', random: true, profile: true},
  appGlobs: ['spec/**/*spec.js'],
  serverOptions: {config: {random: true}}
});