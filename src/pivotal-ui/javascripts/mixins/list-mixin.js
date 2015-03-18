'use strict';

var React = require('react');

var ListMixin = {
  propTypes: {
    spacing: React.PropTypes.oneOf(['n', 's', 'm', 'l', 'xl'])
  },

  listSpacing: function() {
    var {spacing} = this.props;
    return spacing && `l${this.listAlignment === 'vertical' ? 'v' : 'h'}${spacing}`;
  }
};

module.exports = ListMixin;
