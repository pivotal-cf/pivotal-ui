'use strict';

var React = require('react');
var _ = require('lodash');

var UIButton = React.createClass({
  acceptedTypes: ['default', 'default-alt', 'primary', 'lowlight', 'danger', 'highlight', 'highlight-alt'],
  render: function () {
    var classes = ['btn'];

    if (_.contains(this.acceptedTypes, this.props.type)) {
      classes.push('btn-' + this.props.type);
    } else {
      classes.push('btn-default');
    }

    if (this.props.block) {
      classes.push('btn-block');
    }

    if (this.props.large) {
      classes.push('btn-lg');
    }

    classes = classes.join(" ");

    if (this.props.href) {
      return (
        <a {...this.props} className={classes} href={this.props.href}>{this.props.children}</a>
      );
    } else {
      return (
        <button {...this.props} className={classes}>{this.props.children}</button>
      );
    }
  }
});

module.exports = {
  UIButton: UIButton
};
