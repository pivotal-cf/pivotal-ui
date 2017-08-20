import React from 'react';
import 'pui-css-tables';

import {TablePlugin} from './table-plugin';
import {withFixedWithColumns} from './plugins/fixed-width-columns';
import {withFlex} from './plugins/flex';
import {withSorting} from './plugins/sorting';

export {TablePlugin, withFixedWithColumns, withFlex, withSorting};

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

    const headers = columns.map((column, key) => {
      const thProps = this.th({}, {column});
      const {icon, ...rest} = thProps;
      return (
        <Th {...{key, ...rest}}>
          <div>{column.displayName || column.attribute}{icon}</div>
        </Th>
      )
    });

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