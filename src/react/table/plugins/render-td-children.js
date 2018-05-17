// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withRenderTdChildren(Table) {
  return class TableWithRenderTdChildren extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        td: (props, {column: {renderTdChildren}, rowDatum}) => {
          if (!renderTdChildren) return;
          return {children: renderTdChildren(rowDatum)};
        }
      });
    }
  };
}