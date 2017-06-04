import path from 'path'

export default {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'compiled-server.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        loader: 'json-loader!./src/helpers/markdown-loader.js',
      },
      {
        test: /\.s?css$/,
        loader: 'css-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader!image-webpack-loader'
      },
      {
        test: /\.(eot|ttf|woff)$/,
        loader: 'url-loader',
      }
    ],
  },
  target: 'node'
}