// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellEllipsis(Table) {
  return class TableWithCellEllipsis extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        td: (props, {column: {ellipsis}}) => {
          const {children: oldChildren} = props;
          if (!ellipsis) return;
          const children = <span className="type-ellipsis">{oldChildren}</span>;
          return {children};
        }
      });
    }
  };
}