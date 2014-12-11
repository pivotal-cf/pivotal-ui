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

var DefaultButton = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'default'
    }
  },

  render: function render() {
    return (
      <UIButton {...this.props}>{this.props.children}</UIButton>
      );
  }
});
var DefaultAltButton = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'default-alt'
    }
  },

  render: function render() {
    return (
      <UIButton {...this.props}>{this.props.children}</UIButton>
      );
  }
});
var PrimaryButton = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'primary'
    }
  },

  render: function render() {
    return (
      <UIButton {...this.props}>{this.props.children}</UIButton>
      );
  }
});
var LowlightButton = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'lowlight'
    }
  },

  render: function render() {
    return (
      <UIButton {...this.props}>{this.props.children}</UIButton>
      );
  }
});
var DangerButton = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'danger'
    }
  },

  render: function render() {
    return (
      <UIButton {...this.props}>{this.props.children}</UIButton>
      );
  }
});
var HighlightButton = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'highlight'
    }
  },

  render: function render() {
    return (
      <UIButton {...this.props}>{this.props.children}</UIButton>
      );
  }
});
var HighlightAltButton = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'highlight-alt'
    }
  },

  render: function render() {
    return (
      <UIButton {...this.props}>{this.props.children}</UIButton>
      );
  }
});

module.exports = {
  UIButton: UIButton,
  DefaultButton: DefaultButton,
  DefaultAltButton: DefaultAltButton,
  PrimaryButton: PrimaryButton,
  LowlightButton: LowlightButton,
  DangerButton: DangerButton,
  HighlightButton: HighlightButton,
  HighlightAltButton: HighlightAltButton
};
