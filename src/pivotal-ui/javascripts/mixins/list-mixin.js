'use strict';

var React = require('react');

var ListMixin = {
  propTypes: {
    spacing: React.PropTypes.oneOf(['n', 's', 'm', 'l', 'xl'])
  }
};

module.exports = ListMixin;
