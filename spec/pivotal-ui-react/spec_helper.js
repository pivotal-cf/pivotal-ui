require('jasmine_dom_matchers');
require('phantomjs-polyfill');

global.React = require('react/addons');
var jQuery = require('jquery');
var MockNow = require('performance-now');
var MockRaf = require('raf');

Object.assign(global, {
  jQuery,
  MockNow,
  MockRaf,
  $: jQuery
});

$.fn.simulate = function(eventName, ...args) {
  if (!this.length) {
    throw new Error(`jQuery Simulate has an empty selection for '${this.selector}'`);
  }
  $.each(this, function() {
    if (['mouseOver', 'mouseOut', 'click'].indexOf(eventName) !== -1) {
      React.addons.TestUtils.SimulateNative[eventName](this, ...args);
    } else {
      React.addons.TestUtils.Simulate[eventName](this, ...args);
    }
  });
  return this;
};

const RegularCSSTransitionGroup = global.React.addons.CSSTransitionGroup;

class TransitionGroupMock extends global.React.Component {
  render() {
    const {children, ...others} = this.props;
    return <div {...others}>{children}</div>;
  };
}

global.shallowRender = function shallowRender(jsx) {
  const shallowRenderer = React.addons.TestUtils.createRenderer();
  shallowRenderer.render(jsx);
  return shallowRenderer.getRenderOutput();
};

beforeEach(function() {
  jasmine.clock().install();
  $('body').find('#root').remove().end().append('<main id="root"/>');
  global.React.addons.CSSTransitionGroup = TransitionGroupMock;
});

afterEach(function() {
  MockNow.reset();
  MockRaf.reset();
  jasmine.clock().uninstall();
  global.React.addons.CSSTransitionGroup = RegularCSSTransitionGroup;
});
