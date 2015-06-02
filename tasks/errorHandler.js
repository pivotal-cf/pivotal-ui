var argv = require('yargs').argv;

module.exports = {
  handleError: function handleError(err, opts) {
    opts = opts || {};

    console.error(err);
    if (!!argv.fatal || opts.isFatal) {
      process.exit(1);
    } else if (opts.callback) {
      opts.callback();
    }
  }
};
