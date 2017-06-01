import React from 'react';
import sortBy from 'lodash.sortby';

export class TableCell extends React.Component {
  render() {
    const {children, ...others} = this.props;

    ['attribute', 'colIndex', 'displayName', 'index', 'headerProps', 'rowDatum', 'sortable', 'sortBy']
      .forEach(prop => delete others[prop]);

    return (<td {...others}>
      {children}
    </td>);
  }
}