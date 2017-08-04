import path from 'path';
module.exports = function(options = {}) {
  const {nodeEnv = process.env.NODE_ENV || 'development'} = options;
  return Object.assign({}, require(path.join('..', 'config', 'webpack', nodeEnv)), options);
};
