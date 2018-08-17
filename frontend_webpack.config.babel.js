import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {NamedModulesPlugin, HotModuleReplacementPlugin} from 'webpack';

const prod = process.argv.indexOf('-p') !== -1;

const htmlPlugin = new HtmlWebpackPlugin({template: 'index.html'});

const prodConfig = {
  mode: 'production',
  entry: ['babel-polyfill', './src/index.js'],
  plugins: [
    new NamedModulesPlugin(),
    new ExtractTextPlugin('app.css'),
    new CompressionPlugin(),
    htmlPlugin
  ]
};

const devConfig = {
  mode: 'development',
  entry: ['react-hot-loader/patch', 'babel-polyfill', './src/index.js'],
  devServer: {
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    clientLogLevel: 'error',
    contentBase: path.resolve(__dirname, 'dist'),
    stats: {
      warningsFilter: /Module not found: Error: Can't resolve .*.css/
    }
  },
  plugins: [
    htmlPlugin,
    new HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-source-map'
};

export default {
  ...(prod ? prodConfig : devConfig),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
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
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|woff)$/,
        use: 'url-loader'
      },
      {
        test: /\.md$/,
        use: ['json-loader', './src/helpers/markdown_loader.js']
      },
      {
        test: /\.s?css$/,
        use: prod
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
          : ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader', 'image-webpack-loader']
      }
    ],
  },
  node: {
    fs: 'empty' // so that babel doesn't blow up with weird error messages occasionally
  }
};