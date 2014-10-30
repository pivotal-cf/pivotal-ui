'use strict';
var $ = require('jquery');
var _ = require('lodash');
var utils = require('./utils');

module.exports = function() {
  $(document).ready(function() {
    if ($('.back-to-top').length && utils.isMinWidthXs()) {
      $(window).scroll(_.debounce(updateBackToTopState, 200));

      $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop : 0},800);
        return false;
      });
    }
  });
};

function updateBackToTopState() {
  if ($(window).scrollTop() > 400) {
    $('.back-to-top').fadeIn();
  } else {
    $('.back-to-top').fadeOut();
  }
}
