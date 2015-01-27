'use strict';

var React = require('react');

var BasePane = React.createClass({
  propTypes: {
    outerClass: React.PropTypes.string,
    innerClass: React.PropTypes.string
  },

  render: function () {
    var {outerClass, innerClass, children, ...other} = this.props;

    outerClass = ("pane " + outerClass).trimRight();
    innerClass = ("container " + innerClass).trimRight();

    return (
      <div {...other} className={outerClass}>
        <div className={innerClass}>{children}</div>
      </div>
    );
  }
});

var Pane = React.createClass({
  render: function () {
    var {className, ...other} = this.props;

    return <BasePane {...other} outerClass={className} />;
  }
});

module.exports = {
  BasePane: BasePane,
  Pane: Pane
};
