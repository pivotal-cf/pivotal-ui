'use strict';

var React = require('react');
var _ = require('lodash');

var Divider = React.createClass({
  render: function () {
    var typeName = "divider";
    var classes = [];

    if (!this.props.inverse) {
      typeName += "-alternate"
    }

    if (this.props.size == "large") {
      typeName += "-2"
    } else {
      typeName += "-1"
    }

    classes.push(typeName);

    if (this.props.className) {
      classes.push(this.props.className);
    }

    classes = classes.join(" ");

    return (
      <hr {...this.props} className={classes} />
    );
  }
});


var DividerInverse = React.createClass({
  render: function () {
    return (
      <Divider {...this.props} inverse="true" />
    );
  }
});

module.exports = {
  Divider: Divider,
  DividerInverse: DividerInverse
};
