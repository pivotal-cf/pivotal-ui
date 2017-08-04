const {nextTick: defaultNextTick} = require('process');
const {setImmediate: nativeSetImmediate} = global;
const {default: defaultSetImmediate} = require('babel-runtime/core-js/set-immediate');

let callbacks = [];

const nextTick = jasmine.createSpy('nextTick').and.callFake(function(callback) {
  callbacks.push(callback);
});

function cleanup(cb) {
  cb();
  callbacks.splice(callbacks.indexOf(cb), 1);
}

module.exports = {
  install() {
    require('process').nextTick = nextTick;
    require('babel-runtime/core-js/set-immediate').default = nextTick;
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
    require('babel-runtime/core-js/set-immediate').default = defaultSetImmediate;
    global.setImmediate = nativeSetImmediate;
  }
};