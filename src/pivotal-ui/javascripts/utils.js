'use strict';
var $ = require('jquery');

module.exports = {
  isDesktop: function isDesktop() {
    return $('body').css('content') === 'desktop';
  }
}
