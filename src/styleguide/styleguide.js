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

/* Navbar hamburger functionality */

$(document).ready(function() {
  $('#navbar-hamburger').click(function() {
    $('ul#styleguide-first-level-nav').slideToggle(300);
  });

  $('.styleguide-second-level-nav-link').click(function(e) {
    e.preventDefault();

    var $targetCategory = $('#' + $(e.currentTarget).data('target'));
    var targetCategoryClosed = !$targetCategory.hasClass('active');

    $('li.styleguide-category').removeClass('active');
    $('ul.styleguide-second-level-nav').slideUp();
    if (targetCategoryClosed) {
      $targetCategory.addClass('active');
      $targetCategory.find('ul.styleguide-second-level-nav').slideDown();
    } else {
      setTimeout(function() {
        $('ul.styleguide-second-level-nav').removeAttr('style');
      }, 500);
    }
  });
});

/* Copy button */

$(document).ready(function() {
  ZeroClipboard.config({ swfPath: "zeroclipboard/ZeroClipboard.swf" });
  var zc = new ZeroClipboard( $('[data-btn-copy]') );

  $('[data-btn-copy]')
    .attr('title', 'Copy to clipboard');

  $('[data-btn-copy]').tooltip();

  zc.on('ready', function() {
    zc.on('copy', function(e) {
      var copyText = $(e.target).parent().find('[data-code-to-copy] pre').text();
      e.clipboardData.setData('text/plain', copyText);
    });

    zc.on('aftercopy', function(e) {
      $(e.target).attr('title', 'Copied!')
        .tooltip('fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('fixTitle');
    });
  });

  zc.on('error', function(err) {
    console.error('Zero clipboard error', err);
    ZeroClipboard.destroy();
  });
});
