import React from 'react';
import 'pui-css-tables';

import {TablePlugin} from './table-plugin';
import {withFixedWithColumns} from './plugins/fixed-width-columns';
import {withFlex} from './plugins/flex';
import {Sortable} from './plugins/sortable';

export {TablePlugin, withFixedWithColumns, withFlex, Sortable};

export class Table extends TablePlugin {
  static defaultProps = {
    ...TablePlugin.defaultProps,
    Table: 'table',
    Thead: 'thead',
    Tbody: 'tbody',
    Tr: 'tr',
    Th: 'th',
    Td: 'td'
  };

  render() {
    const {columns, data, Table, Thead, Tbody, Tr, Th, Td} = this.props;

    const headers = columns.map((column, key) => (
      <Th {...{key, ...this.th({}, {column})}}>
        {column.displayName || column.attribute}
      </Th>
    ));

    const headerRow = <Tr {...this.tr()}>{headers}</Tr>;

    const bodyCols = rowDatum => columns.map((column, key) =>
      <Td {...{key, ...this.td({}, {column})}}>{rowDatum[column.attribute]}</Td>);

    const bodyRows = data.map((rowDatum, key) =>
      <Tr {...{key, ...this.tr()}}>{bodyCols(rowDatum)}</Tr>);

    return (
      <Table {...this.table({className: 'table'})}>
        <Thead {...this.thead()}>{headerRow}</Thead>
        <Tbody {...this.tbody()}>{bodyRows}</Tbody>
      </Table>
    );
  }
}