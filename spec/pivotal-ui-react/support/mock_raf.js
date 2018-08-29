var callbacks = [];

var raf = jest.fn().and.callFake(function(callback) {
  callbacks.push(callback);
});

Object.assign(raf, {
  next() {
    callbacks.forEach(function(cb) {
      cb();
      callbacks.splice(callbacks.indexOf(cb), 1);
    });
  },
  reset() {
    callbacks = [];
  }
});

module.exports = raf;