// stylesheet swappin'

$(document).ready(
  function(){
    $('input.alternate-css').change(function() {
      if($(this).get(0).checked) {
        $("link[href*='prism-okaida.css']").attr('disabled', 'disabled');
        $("link[href*='prism-default.css']").removeAttr('disabled');
      } else {
        $("link[href*='prism-okaida.css']").removeAttr('disabled');
        $("link[href*='prism-default.css']").attr('disabled', 'disabled');
      }
    });
  }
);

$(document).ready(
  function() {
    var headerHeight = 50;
    $('a.styleguide-subsection').on('click', function(e){
      e.preventDefault();
      var target = $(this).attr('href');
      var desiredScrollPosition = $(target).offset().top - headerHeight;
      $('body, html').animate({
        scrollTop: desiredScrollPosition
      }, 500, function () {
        $(target).focus();
        window.location.hash = target;
      });
      return false;
    });
  }
);

