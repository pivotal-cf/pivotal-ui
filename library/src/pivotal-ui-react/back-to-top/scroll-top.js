function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
}

module.exports = {
  getScrollTop: function() {
    return isFirefox() ? document.documentElement.scrollTop : document.body.scrollTop;
  },

  setScrollTop: function(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  }
};
