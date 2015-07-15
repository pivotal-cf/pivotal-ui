require('babel/polyfill');
require('jasmine_dom_matchers');

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
    if (['mouseOver', 'mouseOut', 'click'].includes(eventName)) {
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

export function propagateAttributes(componentIdentifier, attributeHash) {
  describe('when className, id and style are given', () => {
    it('adds className to the correct component', () => {
      expect(componentIdentifier).toHaveClass(attributeHash.className);
    });
    it('adds id to the correct component', () => {
      expect(componentIdentifier).toHaveAttr('id', attributeHash.id);
    });
    it('adds style to the correct component', () => {
      expect(componentIdentifier).toHaveCss(attributeHash.style);
    });
  });
}

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
