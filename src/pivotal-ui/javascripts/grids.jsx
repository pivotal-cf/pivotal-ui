'use strict';

var React = require('react/addons');
var _ = require('lodash');

var BootstrapRow = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var setClass = React.addons.classSet;

var Row = React.createClass({


  render: function () {
    var additionalClasses = setClass({
      'row-gutter-md': this.props.gutter === 'md',
      'row-gutter-sm': this.props.gutter === 'sm'
    });

    var classes = _.compact([this.props.className, additionalClasses]).join(' ');

    return (
      <BootstrapRow {...this.props} className={classes}>
        {this.props.children}
      </BootstrapRow>
    );
  }
});

module.exports = {
  Row: Row,
  Col: Col
};
