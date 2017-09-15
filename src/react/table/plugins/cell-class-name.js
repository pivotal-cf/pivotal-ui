// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellClassName(Table) {
  const cellClassName = (className, rowDatum, isHeader) => {
    switch (typeof className) {
      case 'string':
        return {className};
      case 'function':
        return {className: className(rowDatum, isHeader)};
      default:
        return;
    }
  };

  return class TableWithCellClassName extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        th: (props, {column: {className}, rowDatum = {}}) => cellClassName(className, rowDatum, true),
        td: (props, {column: {className}, rowDatum = {}}) => cellClassName(className, rowDatum, false)
      });
    }
  };
}