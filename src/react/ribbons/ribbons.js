import React from 'react';
import {mergeProps} from '../helpers';

export class Ribbon extends React.PureComponent {
  componentDidMount() {
    require('../../css/ribbons');
  }

  render() {
    const {children, ...others} = this.props;
    const props = mergeProps(others, {className: 'ribbon'});
    return <div {...props}>{children}</div>;
  }
}

export class PrimaryRibbon extends React.PureComponent {
  componentDidMount() {
    require('../../css/ribbons');
  }

  render() {
    const {children, ...others} = this.props;
    const props = mergeProps(others, {className: ['ribbon', 'ribbon-primary']});
    return <div {...props}>{children}</div>;
  }
}

export class Banner extends React.PureComponent {
  componentDidMount() {
    require('../../css/ribbons');
  }

  render() {
    const {children, ...others} = this.props;
    const props = mergeProps(others, {className: 'ribbon-banner'});
    return <div {...props}>{children}</div>;
  }
}
