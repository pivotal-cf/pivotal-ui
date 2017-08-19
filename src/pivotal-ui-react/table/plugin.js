import React, {cloneElement} from 'react';
import types from 'prop-types';
import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';

export default class Plugin extends React.Component {
  static propTypes = {
    child: types.node.isRequired,
    target: types.node.isRequired,
    type: types.string.isRequired
  };

  mergeProps(other) {
    const {child} = this.props;
    return cloneElement(child, mergeProps(child.props, other));
  }

  mergeClasses(...classes) {
    const {child, className} = this.props;
    return cloneElement(child, {...child.props, style: this.props.style, className: classnames(className, ...classes)});
  }

  render = this[this.props.type].bind(this);
}