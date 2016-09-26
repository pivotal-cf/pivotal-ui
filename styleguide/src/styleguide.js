'use strict';
var $ = require('jquery');


/* Stylesheet swappin */
$(document).ready(function(){
  $('input.alternate-css').change(function() {
    if($(this).get(0).checked) {
      $("link[href*='prism-okaida.css']").attr('disabled', 'disabled');
      $("link[href*='prism-default.css']").removeAttr('disabled');
    } else {
      $("link[href*='prism-okaida.css']").removeAttr('disabled');
      $("link[href*='prism-default.css']").attr('disabled', 'disabled');
    }
  });
});

/* Adjust scrollTop when navigating to a subsection on the current page */

$(document).ready(function() {
  $('a.styleguide-subsection, .section-nav a').click(function(e) {
    var $target = $(e.target.hash);
    var desiredScrollPosition = $target.offset().top;
    window.history.pushState('', '', e.target.hash);
    $('body, html').animate({
      scrollTop: desiredScrollPosition
    }, 500, function () {
      $target.focus();
    });
    return false;
  });
});

/* Make all links inside codeExamples open in a new window */

$(document).ready(function() {
  $('.codeExample a').attr('target', '_blank');
});

/* Copy button */

$(document).ready(function() {
  $('#instances-1, #instances-4, #instances-6, #instances-8').hover(function() {
    $('.scale-code span:last-of-type').text($(this).children('path').length / 3);
    $('#instances-1').get(0).classList.remove('selected-group');
    $('#instances-4').get(0).classList.remove('selected-group');
    $('#instances-6').get(0).classList.remove('selected-group');
    $('#instances-8').get(0).classList.remove('selected-group');
    $(this).get(0).classList.add('selected-group');
  });
});
