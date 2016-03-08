var React = require('react');
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-ribbons';

class Ribbon extends React.Component {
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: 'ribbon'});
    return <div {...props}>{children}</div>;
  }
}

class PrimaryRibbon extends React.Component {
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: ['ribbon', 'ribbon-primary']});
    return <div {...props}>{children}</div>;
  }
}

class Banner extends React.Component {
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: 'ribbon-banner'});
    return <div {...props}>{children}</div>;
  }
}

module.exports = {Ribbon, PrimaryRibbon, Banner};
