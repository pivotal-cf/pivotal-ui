'use strict';
var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

$.fn.simulate = function(eventName) {
  var args = Array.prototype.slice.call(arguments, 1);
  $.each(this, function() {
    TestUtils.SimulateNative[eventName].apply(null, [this].concat(args));
  });
  return this;
};
