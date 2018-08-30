module.exports = jest.fn().mockName('setImmediate').mockImplementation(function(cb) {
  setTimeout(cb, 0);
});