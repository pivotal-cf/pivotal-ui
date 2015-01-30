'use strict';

var React = require('react/addons');
var _ = require('lodash');

var BootstrapRow = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var setClass = React.addons.classSet;

var Row = React.createClass({

  propTypes: {
    gutter: React.PropTypes.oneOf(['sm', 'md', 'lg'])
  },

  render: function () {
    var {gutter, className, children, ...other} = this.props;

    var additionalClasses = setClass({
      'row-gutter-md': gutter === 'md',
      'row-gutter-sm': gutter === 'sm'
    });

    var classes = _.compact([className, additionalClasses]).join(' ');

    return (
      <BootstrapRow {...other} className={classes}>
        {children}
      </BootstrapRow>
    );
  }
});

module.exports = {
  Row: Row,
  Col: Col
};
