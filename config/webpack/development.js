import puiAliases from '../../helpers/pui-aliases';

export default {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0'
      },
      {
        test: /bootstrap/,
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  resolve: {
    alias: Object.assign({
      bootstrap: `${__dirname}/../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js`,
      modernizr: `${__dirname}/../../src/modernizr/modernizr.min.js`
    }, puiAliases)
  }
};
