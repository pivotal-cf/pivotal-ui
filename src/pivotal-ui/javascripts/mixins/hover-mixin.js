'use strict';

var HoverMixin = {
  getInitialState: function() {
    return {
      hover: false
    };
  },

  onMouseEnter: function() {
    this.setState({hover: true});
  },

  onMouseLeave: function() {
    this.setState({hover: false});
  }
};

module.exports = HoverMixin;
