// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table_plugin';

export function withCellWidth(Table) {
  const cellWidth = width => width && {className: 'col-fixed', style: {width}};

  return class TableWithCellWidth extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        th: (props, {column: {width}}) => cellWidth(width),
        td: (props, {column: {width}}) => cellWidth(width),
      });
    }
  };
}