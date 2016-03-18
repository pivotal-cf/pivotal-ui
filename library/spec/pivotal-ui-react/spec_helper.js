require('babel-polyfill');
require('phantomjs-polyfill');
require('./support/bluebird');
require('./support/set_immediate');
require('pivotal-js-jasmine-matchers');

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
  MockRaf,
  ...require('pivotal-js-react-test-helpers')
});

global.shallowRender = function shallowRender(jsx) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(jsx);
  return shallowRenderer.getRenderOutput();
};

global.setProps = function setProps(props, node = root) {
  const Component = this.constructor;
  ReactDOM.render(<Component {...this.props} {...props}/>, node);
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
