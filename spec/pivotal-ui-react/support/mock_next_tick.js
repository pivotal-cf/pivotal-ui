const {nextTick: defaultNextTick} = require('process');
const {setImmediate: nativeSetImmediate} = global;

let callbacks = [];

const nextTick = jasmine.createSpy('nextTick').and.callFake(callback => {
  callbacks.push(callback);
});

function cleanup(cb) {
  cb();
  callbacks.splice(callbacks.indexOf(cb), 1);
}

module.exports = {
  install() {
    require('process').nextTick = nextTick;
    global.setImmediate = nextTick;
  },

  nextTick,

  next(maxRecursion = 10) {
    for (let i = 0; i < maxRecursion && callbacks.length; i++) {
      callbacks.forEach(cleanup);
    }
  },

  reset() {
    callbacks = [];
  },

  uninstall() {
    this.next();
    require('process').nextTick = defaultNextTick;
    global.setImmediate = nativeSetImmediate;
  }
};