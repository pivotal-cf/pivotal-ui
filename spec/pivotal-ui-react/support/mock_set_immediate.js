module.exports = jest.fn().and.callFake(function(cb) {
  setTimeout(cb, 0);
});