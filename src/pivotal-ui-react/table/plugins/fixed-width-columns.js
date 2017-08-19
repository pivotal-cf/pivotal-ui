import classnames from 'classnames';
import React from 'react';

import Plugin from '../plugin';

function colFixed() {
  const {target: {props: {column: {width}}}} = this.props;
  return this.mergeProps({
    className: classnames(this.props.className, {'col-fixed': width}),
    style: {width}
  });
}

export class FixedWidthColumns extends Plugin {
  th() {
    return colFixed.apply(this);
  }

  td() {
    return colFixed.apply(this);
  }
}