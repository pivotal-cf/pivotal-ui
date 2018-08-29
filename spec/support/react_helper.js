import TestUtils from 'react-dom/test-utils';
import jQuery from 'jquery';

TestUtils.Simulate.check = function(node) {
  TestUtils.Simulate.change(node, {target: {checked: true}});
};

TestUtils.Simulate.uncheck = function(node) {
  TestUtils.Simulate.change(node, {target: {checked: false}});
};

(function($) {
  $.fn.simulate = function(eventName, ...args) {
    if (!this.length) {
      throw new Error(`jQuery Simulate has an empty selection for '${this.selector}'`);
    }
    $.each(this, function() {
      if (['mouseOver', 'mouseOut'].includes(eventName)) {
        TestUtils.SimulateNative[eventName](this, ...args);
      } else {
        TestUtils.Simulate[eventName](this, ...args);
      }
    });
    return this;
  };
})(jQuery);