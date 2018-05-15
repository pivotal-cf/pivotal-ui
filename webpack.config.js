const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require("glob");

module.exports = {
  entry: glob.sync("./dist/css/**/*.css"),
  output: {
    path: __dirname + '/dist',
    filename: 'pivotal-ui.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(eot|ttf|woff)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: 'file-loader!image-webpack-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("components.css")
  ]
};