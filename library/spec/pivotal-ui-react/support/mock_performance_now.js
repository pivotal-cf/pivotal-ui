var time = 0;
function now() {
  return time;
}

Object.assign(now, {
  tick(t) {
    time += t;
  },

  reset() {
    time = 0;
  }
});

module.exports = now;
