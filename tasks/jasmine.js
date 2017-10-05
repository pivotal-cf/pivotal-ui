const gulp = require('gulp');
const {Jasmine} = require('pui-react-tools');
const runSequence = require('run-sequence');

Jasmine.install({
  browserSpecRunnerOptions: {sourcemappedStacktrace: true, profile: false},
  headlessSpecRunnerOptions: {},
  headlessServerOptions: {driver: 'phantomjs', random: false, profile: false},
  serverOptions: {config: {random: false}},
  webpack: {
    test: () => {
      return {
        entry: {spec: './spec/index.js'},
        module: {
          rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader']},
          ]
        },
        output: {filename: '[name].js', chunkFilename: '[id].js'}
      }
    }
  }
});

gulp.task('default', cb => runSequence('spec-app', cb));