import React from 'react';

import Plugin from '../plugin';

function colFixed() {
  const {width} = this.props.target.props.column;
  return {className: {'col-fixed': width}, style: {width}};
}

export class FixedWidthColumns extends Plugin {
  th() {
    return colFixed.apply(this);
  }

  td() {
    return colFixed.apply(this);
  }
}