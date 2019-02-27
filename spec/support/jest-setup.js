import $ from 'jquery';
import ReactDOM from 'react-dom';
import 'jasmine_dom_matchers';
import {matchers} from './jest_spy_on_render';
import TestUtils from 'react-dom/test-utils';

expect.extend(matchers);

expect.extend({
  toHaveStyle(actual, expected) {
    const {style} = $(actual)[0];
    const actualStyle = {};
    for (let i = 0; i < style.length; i++) {
      actualStyle[style[i]] = style[style[i]];
    }

    const expectedStyle = Object.entries(expected).reduce((memo, [key, value]) => {
      key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return {...memo, [key]: `${value}`};
    }, {});

    const pass = this.equals(actualStyle, expectedStyle);
    const message = pass
      ? () => 'Expected style not to match, but it did.'
      : () => `Element style did not match expectations: ${JSON.stringify(actualStyle, null, 2)}`;

    return {pass, message};
  }
});

(function ($) {
  $.fn.simulate = function (eventName, ...args) {
    if (!this.length) {
      throw new Error(`jQuery Simulate has an empty selection for '${this.selector}'`);
    }
    $.each(this, function () {
      if (['mouseOver', 'mouseOut'].includes(eventName)) {
        TestUtils.SimulateNative[eventName](this, ...args);
      } else {
        TestUtils.Simulate[eventName](this, ...args);
      }
    });
    return this;
  };
})($);

beforeEach(() => {
  $('body').find('#root').remove().end().append('<div id="root"/>');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
});