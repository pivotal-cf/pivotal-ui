'use strict';

var React = require('react');

var DividerMixin = require('./mixins/divider-mixin');

var Divider = React.createClass({
  mixins: [DividerMixin],

  render: function () {
    var {inverse, size, className, ...others} = this.props;
    var classes = [];
    var typeName = "divider";

    if (!inverse) {
      typeName += "-alternate";
    }

    if (size === "large") {
      typeName += "-2";
    } else {
      typeName += "-1";
    }

    classes.push(typeName);

    if (className) {
      classes.push(className);
    }

    classes = classes.join(" ");

    return (
      <hr {...others} className={classes} />
    );
  }
});


var InverseDivider = React.createClass({
  mixins: [DividerMixin],
  render: function () {
    return <Divider {...this.props} inverse={true} />;
  }
});

module.exports = {
  Divider: Divider,
  InverseDivider: InverseDivider
};
