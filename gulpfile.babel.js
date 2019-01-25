import Jasmine from './jasmine';
import testWebpack from './config/webpack/test';
import gulp from 'gulp';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

Jasmine.install({
  headlessServerOptions: {
    includeStackTrace: true,
    random: undefined,
    isVerbose: false,
    port: 9999,
    driver: 'chrome'
  },
  appGlobs: ['./spec/pivotal-ui-react/**/*_spec.js'],
  headlessSpecRunnerOptions: {profile: true},
  webpack: {test: () => testWebpack}
});

require('./tasks/css_components');
require('./tasks/react_components');
require('./tasks/js_components');
require('./tasks/test');
require('./tasks/dev');
require('./tasks/release');

gulp.task('default', gulp.series('ci'));
