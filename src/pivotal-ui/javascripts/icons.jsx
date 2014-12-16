'use strict';

var React = require('react');

var Icon = React.createClass({
  render: function () {
    var classes = ["fa"];

    if(this.props.style) {
      classes.push("fa-" + this.props.style);
    } 

    if(this.props.className) {
      classes.push(this.props.className);
    }

    classes = classes.join(" ");

    return(
      <i className={classes} />
    );
  }
});

module.exports = {
  Icon: Icon
};
