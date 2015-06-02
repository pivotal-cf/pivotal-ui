module.exports = function(func) {
  return function() {
    func();
  };
};