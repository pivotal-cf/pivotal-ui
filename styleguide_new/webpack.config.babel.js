import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const prod = process.argv.indexOf('-p') !== -1

export default {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.md$/,
        loader: 'html-loader!markdown-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!sass-loader",
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
  ],
  node: {
    fs: 'empty', // so that babel doesn't blow up with weird error messages occasionally
  },
  devtool: prod ? false : 'inline-source-map'
}