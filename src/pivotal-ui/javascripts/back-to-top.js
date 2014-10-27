'use strict';
var $ = require('jquery');

module.exports = function() {
  $(document).ready(function(){
    $(window).scroll(function(){
      if ($(this).scrollTop() > 400) {
        $('.back-to-top').fadeIn();
      } else {
        $('.back-to-top').fadeOut();
      }
    });

    $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
    });
  });
};
