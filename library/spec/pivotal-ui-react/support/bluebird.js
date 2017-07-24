const {Promise} = global;
const Bluebird = require('bluebird');
const {catch: oldCatch} = Bluebird.prototype;
const {default: defaultPromise} = require('babel-runtime/core-js/promise');
beforeAll(() => {
  Bluebird.prototype.catch = function(...args) {
    return Bluebird.prototype.then.call(this, i => i, ...args);
  };
  global.Promise = Bluebird;
  require('babel-runtime/core-js/promise').default = Bluebird;
});

afterAll(() => {
  Bluebird.prototype.catch = oldCatch;
  global.Promise = Promise;
  require('babel-runtime/core-js/promise').default = defaultPromise;
});