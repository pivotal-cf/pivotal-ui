import React, {cloneElement} from 'react';
import types from 'prop-types';
import {mergeProps} from 'pui-react-helpers';

export default class Plugin extends React.Component {
  static propTypes = {
    child: types.node.isRequired,
    target: types.node.isRequired,
    type: types.string.isRequired
  };

  render() {
    const {child, type, ...rest} = this.props;
    return cloneElement(child, mergeProps(rest, this[type]()));
  }
}