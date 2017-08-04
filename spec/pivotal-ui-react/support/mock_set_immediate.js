module.exports = jasmine.createSpy('setImmediate').and.callFake(function(cb) {
  setTimeout(cb, 0);
});