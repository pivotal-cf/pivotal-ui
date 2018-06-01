import 'babel-polyfill';
import {Jasmine} from 'pui-react-tools';
import devWebpack from './webpack.config.babel';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

Jasmine.install({
  headlessServerOptions: {
    includeStackTrace: true,
    random: false,
    isVerbose: false,
    port: 8888,
    driver: 'chrome'
  },
  appGlobs: ['./spec/index.js'],
  headlessSpecRunnerOptions: {profile: true},
  webpack: {
    test: () => {
      return {
        ...devWebpack,
        entry: './spec/index.js'
      }
    }
  }
});