import classnames from 'classnames';
import React, {cloneElement} from 'react';

function colFixed(element) {
  const {props: {column: {width}, className, style}} = element;
  if (!width) return element;
  return cloneElement(element, {
    className: classnames(className, 'col-fixed'),
    style: {...style, width}
  });
}

export const FixedWidthColumns = {
  tableHeader: colFixed,
  tableCell: colFixed
};