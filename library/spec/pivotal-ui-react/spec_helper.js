require('babel-polyfill');
require('phantomjs-polyfill');
require('./support/bluebird');
require('./support/set_immediate');
require('jasmine_dom_matchers');

global.React = require('react');
global.ReactDOM = require('react-dom');
global.TestUtils = require('react-addons-test-utils');

var jQuery = require('jquery');
var MockNow = require('performance-now');
var MockRaf = require('raf');
const MockPromises = require('mock-promises');

Object.assign(global, {
  jQuery,
  MockNow,
  MockPromises,
  $: jQuery,
  MockRaf
});

$.fn.simulate = function(eventName, ...args) {
  if (!this.length) {
    throw new Error(`jQuery Simulate has an empty selection for '${this.selector}'`);
  }
  $.each(this, function() {
    if (['mouseOver', 'mouseOut', 'click'].indexOf(eventName) !== -1) {
      TestUtils.SimulateNative[eventName](this, ...args);
    } else {
      TestUtils.Simulate[eventName](this, ...args);
    }
  });
  return this;
};

global.shallowRender = function shallowRender(jsx) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(jsx);
  return shallowRenderer.getRenderOutput();
};

beforeEach(function() {
  $('body').find('#root').remove().end().append('<main id="root"/>');
  jasmine.clock().install();
  MockPromises.install(Promise);
});

beforeEach(function() {
  const consoleWarn = console.warn;
  console.warn = function(message) {
    if(message.match(/Failed propType/)) {
      throw new Error(message);
    } else {
      consoleWarn.apply(console, arguments);
    }
  };


  jasmine.addMatchers({
    toPassADT: require('./accessibility-developer-tools-matcher')
  });
});

afterEach(function() {
  ReactDOM.unmountComponentAtNode(root);
  jasmine.clock().tick(1);
  jasmine.clock().uninstall();
  MockPromises.contracts.reset();
  MockPromises.uninstall();
  MockNow.reset();
  MockRaf.reset();
});
