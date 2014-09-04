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
