const test = require('pui-react-tools/webpack/test');

module.exports = {
  webpack: {
    test: {
      ...test,
      devtool: 'cheap-module-source-map',
      module: {
        loaders: [
          ...test.module.loaders,
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ]
      }
    }
  }
};