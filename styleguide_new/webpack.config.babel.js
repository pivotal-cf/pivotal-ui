import path from 'path'

export default {
  entry: './src/app.jsx',
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
    ]
  },
  node: {
    fs: 'empty', // so that babel doesn't blow up with weird error messages occasionally
  },
  devtool: 'inline-source-map'
}