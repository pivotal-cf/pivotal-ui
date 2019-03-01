const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

module.exports = {
  mode: 'production',
  entry: glob.sync('./dist/css/**/*.css'),
  output: {
    path: __dirname + '/dist',
    filename: 'pivotal-ui.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(eot|ttf|woff)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'components.css'})
  ],
  node: {
    fs: 'empty',
    module: 'empty'
  }
};