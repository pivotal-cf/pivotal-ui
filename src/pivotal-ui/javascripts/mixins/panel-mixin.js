'use strict';

var _ = require('lodash');
var React = require('react');

var paddingTypes = _.flatten(_.map(['p', 'm'], function(type) {
  return _.map(['l', 'r', 't', 'b', 'h', 'v', 'a'], function(loc) {
    return _.map(['s', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'], function(size) {
      return '' + type + loc + size;
    });
  });
}));

var PanelMixin = {
  propTypes: {
    type: React.PropTypes.string,
    padding: function(props, propName, componentName) {
      if (props.padding) {
        _.each(props.padding.split(' '), function(pad) {
          if (!_.contains(paddingTypes, pad)) {
            return new Error('Invalid padding type used in ' + componentName);
          }
        });
      }
    },
    scrollable: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number
    ])
  }
};

module.exports = PanelMixin;
