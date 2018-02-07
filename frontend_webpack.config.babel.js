import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import {NamedModulesPlugin} from 'webpack';

const prod = process.argv.indexOf('-p') !== -1;

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'node_modules/pivotal-ui': path.resolve(__dirname, '../pivotal-ui/src'),
      'pivotal-ui': path.resolve(__dirname, '../pivotal-ui/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(eot|ttf|woff)$/,
        use: 'url-loader',
      },
      {
        test: /\.md$/,
        use: ['json-loader', './src/helpers/markdown_loader.js']
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader', 'image-webpack-loader']
      }
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new ExtractTextPlugin('app.css'),
    new CompressionPlugin()
  ],
  node: {
    fs: 'empty', // so that babel doesn't blow up with weird error messages occasionally
  },
  devtool: prod ? false : 'inline-source-map'
};