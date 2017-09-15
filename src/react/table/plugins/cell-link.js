// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellLink(Table) {
  return class TableWithCellLink extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        tdTag: ({column: {link}, rowDatum}) => link && link(rowDatum) && 'a',
        td: (props, {column: {link, target}, rowDatum}) => {
          if (!link) return;

          const href = link(rowDatum);
          if (!href) return;

          const {children: oldChildren} = props;
          if (!oldChildren) return {href, target};

          return {children: <span className="hover-underline">{oldChildren}</span>, href, target};
        }
      });
    }
  };
}