// jquery plugin from: http://css-tricks.com/snippets/jquery/get-query-params-object/
jQuery.extend({
  getQueryParameters : function(str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }
});

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
  var headerHeight = 50;
  $('a.styleguide-subsection').on('click', function(e) {
    var queryString = e.target.href.slice(e.target.href.indexOf('?'));
    window.history.pushState('', '', queryString);
    e.preventDefault();

    var $target = $('#' + $.getQueryParameters(queryString).target);
    var desiredScrollPosition = $target.offset().top - headerHeight;
    $('body, html').animate({
      scrollTop: desiredScrollPosition
    }, 500, function () {
      $target.focus();
    });
    return false;
  });
});

/* Adjust scrollTop when navigating to a subsection on a different page */
$(document).ready (function() {
  if ($.getQueryParameters().target) {
    $target = $('#' + $.getQueryParameters().target);
    var newScrollTop = $target.offset().top - 50;
    $(window).scrollTop(newScrollTop);
  }
});

