var path = require('path');

module.exports = function(env = null) {
  return Object.assign({}, {
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=0'}
      ]
    },
    externals: {
      react: true
    }
  }, env && require(`./${env}`));
};
