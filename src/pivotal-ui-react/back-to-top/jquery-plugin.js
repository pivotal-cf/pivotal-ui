var $ = global.jQuery || require('jquery');
var throttle = require('lodash.throttle');

/**
 * @component BackToTopJquery
 *
 * @description
 * A component for scrolling to the top of a page using jQuery
 * Included in your JavaScript with `require('pui-react-back-to-top/jquery-plugin')`
 *
 * @example ```html
 * <a class="back-to-top" data-position="back-to-top" href="#" target="_blank" style="display: inline;"></a>
 * ```
 *
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#back_to_top)
 */


var backToTop = throttle(function() {
  if (document.body.scrollTop > 400) {
    $('[data-position="back-to-top"]').fadeIn();
  } else {
    $('[data-position="back-to-top"]').fadeOut();
  }
}, 200);

$(function() {
  $(window).scroll(backToTop);
  $(document).on('click.pui.back-to-top.data-api', '[data-position="back-to-top"]', function(e) {
    e.preventDefault();
    $(document.body).animate({scrollTop: 0}, 800);
  });
});