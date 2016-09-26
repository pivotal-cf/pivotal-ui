require('babel-polyfill');

global.$ = global.jQuery = require('jquery');
global._ = require('lodash');

global.React = require('react');
global.ReactDOM = require('react-dom');

require('pui-react-back-to-top/jquery-plugin');

require('./styleguide');
require('./styleguide-react');
require('./pivotal-ui-components');

$(function() {
  $('[data-code-to-copy]').each(function() {
    var $el = $(this);
    var copyText = $el.find('pre').text();
    ReactDOM.render(<CopyToClipboardButton {...{text: copyText}}/>, $el.parent().find('.btn-copy')[0]);
  });
});