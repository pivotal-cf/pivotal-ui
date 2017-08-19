import classnames from 'classnames';
import React, {cloneElement} from 'react';
import types from 'prop-types';

function colFixed() {
  const {props: {column: {width}, className, style}} = this.props.target;
  return cloneElement(this.props.child, {
    className: classnames(this.props.className, {'col-fixed': width}),
    style: {...style, ...this.props.child.props.style, width}
  });
}

export class FixedWidthColumns extends React.Component {
  static propTypes = {child: types.node.isRequired, target: types.node.isRequired, type: types.string.isRequired};

  tableHeader = colFixed;
  tableCell = colFixed;

  render = () => {
    const {child, type} = this.props;
    if (!this[type]) return child;
    return this[type]();
  }
}