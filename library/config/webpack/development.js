import puiAliases from '../../helpers/pui-aliases';

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /bootstrap/,
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  resolve: {
    alias: {
      bootstrap: `${__dirname}/../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js`,
      ...puiAliases
    }
  }
};
