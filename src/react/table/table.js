// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from './table-plugin';
import classnames from 'classnames';

const defaultProps = {
  ...TablePlugin.defaultProps,
  tableTag: () => 'table',
  theadTag: () => 'thead',
  tbodyTag: () => 'tbody',
  trTag: () => 'tr',
  thTag: () => 'th',
  tdTag: () => 'td'
};

export class Table extends TablePlugin {
  static defaultProps = defaultProps;

  componentDidMount() {
    require('../../css/tables');
  }

  render() {
    const {className, columns, data} = this.props;

    const headers = columns.map((column, key) => {
      const Th = this.plugThTag(defaultProps.thTag);
      const children = column.displayName || column.attribute;
      const thContext = {column};
      return <Th {...{key, ...this.plugThProps({children}, thContext)}}/>;
    });

    const HeaderTr = this.plugTrTag(defaultProps.trTag);
    const headerTrContext = {isHeader: true, rowIndex: -1};
    const headerRow = <HeaderTr {...this.plugTrProps({children: headers}, headerTrContext)}/>;

    const bodyCols = rowDatum => columns.map((column, key) => {
      const keys = column.attribute.split('.');
      let children = rowDatum;
      keys.forEach(key => children = children[key]);
      const tdContext = {column, rowDatum};
      const Td = this.plugTdTag(defaultProps.tdTag, tdContext);
      return <Td {...{key, ...this.plugTdProps({children}, tdContext)}}/>;
    });

    const bodyRows = data.map((rowDatum, key) => {
      const trContext = {rowDatum, isHeader: false, rowIndex: key};
      const Tr = this.plugTrTag(defaultProps.trTag, trContext);
      return <Tr {...{key, ...this.plugTrProps({children: bodyCols(rowDatum)}, trContext)}}/>;
    });

    const Table = this.plugTableTag(defaultProps.tableTag);
    const Thead = this.plugTheadTag(defaultProps.theadTag);
    const Tbody = this.plugTbodyTag(defaultProps.tbodyTag);

    return (
      <Table {...this.plugTableProps({
        className: classnames('table', className),
        children: [
          <Thead key={0} {...this.plugTheadProps({children: headerRow})}/>,
          <Tbody key={1} {...this.plugTbodyProps({children: bodyRows})}/>
        ]
      })}/>
    );
  }
}