import React from 'react';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-ribbons';

export class Ribbon extends React.Component {
  render() {
    const {children, ...others} = this.props;
    const props = mergeProps(others, {className: 'ribbon'});
    return <div {...props}>{children}</div>;
  }
}

export class PrimaryRibbon extends React.Component {
  render() {
    const {children, ...others} = this.props;
    const props = mergeProps(others, {className: ['ribbon', 'ribbon-primary']});
    return <div {...props}>{children}</div>;
  }
}

export class Banner extends React.Component {
  render() {
    const {children, ...others} = this.props;
    const props = mergeProps(others, {className: 'ribbon-banner'});
    return <div {...props}>{children}</div>;
  }
}
