var React = require('react');
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-ribbons';

var Ribbon = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: 'ribbon'});
    return <div {...props}>{children}</div>;
  }
});

var PrimaryRibbon = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: ['ribbon', 'ribbon-primary']});
    return <div {...props}>{children}</div>;
  }
});

var Banner = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: 'ribbon-banner'});
    return <div {...props}>{children}</div>;
  }
});

module.exports = {Ribbon, PrimaryRibbon, Banner};
