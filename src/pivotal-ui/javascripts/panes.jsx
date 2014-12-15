'use strict';

var React = require('react');
var _ = require('lodash');

var BasePane = React.createClass({
  render: function () {
    var outerClass = "pane";
    if (this.props.outerClass) {
      outerClass += " " + this.props.outerClass;
    }

    var innerClass = "container";
    if (this.props.innerClass) {
      innerClass += " " + this.props.innerClass;
    }

    return (
      <div {...this.props} className={outerClass}>
        <div className={innerClass}>{this.props.children}</div>
      </div>
    );
  }
});

var Pane = React.createClass({
  render: function () {
    return (
      <BasePane outerClass={this.props.className}>{this.props.children}</BasePane>
    );
  }
});

module.exports = {
  BasePane: BasePane,
  Pane: Pane
};
