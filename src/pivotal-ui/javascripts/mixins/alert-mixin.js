'use strict';

var React = require('react');

var AlertMixin = {
  propTypes: {
    dismissable: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.func
    ]),
    withIcon: React.PropTypes.bool
  }
};

module.exports = AlertMixin;
