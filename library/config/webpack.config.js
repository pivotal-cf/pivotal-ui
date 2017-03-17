module.exports = function(env = null) {
  const webpackConfig = require(`./webpack/${env}`);
  const config = {
    bail: false,
    module: {
      loaders: [
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
        {test: /\.svg$/, loader: 'babel-loader!svg-react-loader'}
        ]
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[id].js',
      pathinfo: true
    }
  };
  return {...config, ...webpackConfig};
};
