require('babel-polyfill');
require('phantomjs-polyfill');

require('jasmine_dom_matchers');
global.React = require('react');
global.ReactDOM = require('react-dom');

const jQuery = require('jquery');
global.jQuery = jQuery;
global.$ = jQuery;

beforeEach(function() {
  $('body').find('#root').remove().end().append('<main id="root"/>');
});
