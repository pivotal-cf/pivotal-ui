'use strict';

var React = require('react');

var ButtonMixin = {
  propTypes: {
    block: React.PropTypes.bool,
    href: React.PropTypes.string,
    large: React.PropTypes.bool,
    type: React.PropTypes.oneOf([
      'default',
      'default-alt',
      'primary',
      'lowlight',
      'danger',
      'highlight',
      'highlight-alt'
    ])
  }
};

module.exports = ButtonMixin;
