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

    const headers = columns.map((column, key) =>
      <Th {...{key}} {...{
        ...this.th({children: column.displayName || column.attribute}, {column})
      }}/>);

    const headerRow = <Tr {...this.tr({children: headers})}/>;

    const bodyCols = rowDatum => columns.map((column, key) =>
      <Td {...{key}} {...{
        ...this.td({children: rowDatum[column.attribute]}, {column})
      }}/>);

    const bodyRows = data.map((rowDatum, key) =>
      <Tr {...{key}} {...{...this.tr({children: bodyCols(rowDatum)})}}/>);

    return (
      <Table {...this.table({
        className: 'table',
        children: [
          <Thead key={0} {...this.thead({children: headerRow})}/>,
          <Tbody key={1} {...this.tbody({children: bodyRows})}/>
        ]
      })}/>
    );
  }
}