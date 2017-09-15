// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellRenderer(Table) {
  return class TableWithCellRenderer extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        td: (props, {column: {CellRenderer}, rowDatum}) => {
          if (!CellRenderer) return;
          const cellRendererProps = {};
          if (CellRenderer.propTypes) {
            Object.keys(CellRenderer.propTypes).forEach(key => cellRendererProps[key] = rowDatum[key]);
          } else {
            Object.assign(cellRendererProps, rowDatum);
          }
          const children = <CellRenderer {...cellRendererProps}/>;
          return {children};
        }
      });
    }
  };
}