import NoEmitOnErrorsPlugin from 'webpack/lib/NoEmitOnErrorsPlugin';

module.exports = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  cache: true,
  module: {
    rules: [
      {
        test: [/\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.png(\?|$)/, /\.gif(\?|$)/, /\.jpe?g(\?|$)/],
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  entry: null,
  output: {filename: 'spec.js'},
  plugins: [new NoEmitOnErrorsPlugin()],
  stats: 'minimal',
  resolve: {
    alias: Object.assign({
      'raf': `${__dirname}/../../spec/pivotal-ui-react/support/mock_raf.js`,
      'performance-now': `${__dirname}/../../spec/pivotal-ui-react/support/mock_performance_now.js`,
      'lodash.throttle': `${__dirname}/../../spec/pivotal-ui-react/support/mock_throttle.js`,
      'fbjs/lib/warning': `${__dirname}/../../spec/pivotal-ui-react/support/mock_warning.js`
    })
  },
  watch: true
};