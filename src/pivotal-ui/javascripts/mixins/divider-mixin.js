'use strict';

var React = require('react');

var DividerMixin = {
  propTypes: {
    className: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['large'])
  }
};

module.exports = DividerMixin;
