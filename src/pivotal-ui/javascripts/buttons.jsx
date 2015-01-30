'use strict';

var React = require('react/addons');
var classSet = React.addons.classSet;

var ButtonMixin = require('./mixins/button-mixin');

var UIButton = React.createClass({
  mixins: [ButtonMixin],

  render: function () {
    var {block, href, large, type, children, ...others} = this.props;

    var classes = classSet({
      btn: true,
      'btn-block': block,
      'btn-lg': large
    });

    if (type) {
      classes += ' btn-' + type;
    } else {
      classes += ' btn-default';
    }

    if (href) {
      return (
        <a {...others} className={classes} href={href}>{children}</a>
      );
    } else {
      return (
        <button {...others} className={classes}>{children}</button>
      );
    }
  }
});

var DefaultButton = React.createClass({
  mixins: [ButtonMixin],
  render: function render() {
    return <UIButton {...this.props} type='default' />;
  }
});

var DefaultAltButton = React.createClass({
  mixins: [ButtonMixin],
  render: function render() {
    return <UIButton {...this.props} type='default-alt' />;
  }
});

var PrimaryButton = React.createClass({
  mixins: [ButtonMixin],
  render: function render() {
    return <UIButton {...this.props} type='primary' />;
  }
});

var LowlightButton = React.createClass({
  mixins: [ButtonMixin],
  render: function render() {
    return <UIButton {...this.props} type='lowlight' />;
  }
});

var DangerButton = React.createClass({
  mixins: [ButtonMixin],
  render: function render() {
    return <UIButton {...this.props} type='danger' />;
  }
});

var HighlightButton = React.createClass({
  mixins: [ButtonMixin],
  render: function render() {
    return <UIButton {...this.props} type='highlight' />;
  }
});

var HighlightAltButton = React.createClass({
  mixins: [ButtonMixin],
  render: function render() {
    return <UIButton {...this.props} type='highlight-alt' />;
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
