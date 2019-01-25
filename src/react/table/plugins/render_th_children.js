import React from 'react';

import {TablePlugin} from '../table_plugin';

export function withRenderThChildren(Table) {
  return class TableWithRenderTdChildren extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        th: (props, {column: {renderThChildren}}) => {
          if (!renderThChildren) return;
          return {children: renderThChildren()};
        }
      });
    }
  };
}