// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table_plugin';

export function withCellOnClick(Table) {
  return class TableWithCellOnClick extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        td: (props, {column: {onClick}, rowDatum}) => onClick && {onClick: e => onClick(e, rowDatum)}
      });
    }
  };
}