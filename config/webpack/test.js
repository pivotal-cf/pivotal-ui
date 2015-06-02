module.exports = {
  devtool: 'eval',
  entry: null,
  output: {filename: 'spec.js' },
  quiet: true,
  resolve: {
    alias: {
      'raf': `${__dirname}/../../spec/pivotal-ui-react/support/mock_raf.js`,
      'performance-now': `${__dirname}/../../spec/pivotal-ui-react/support/mock_performance_now.js`,
      'lodash.throttle': `${__dirname}/../../spec/pivotal-ui-react/support/mock_throttle.js`
    }
  },
  watch: true,
  externals: null
};