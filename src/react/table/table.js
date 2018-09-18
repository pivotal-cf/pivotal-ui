// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from './table-plugin';
import classnames from 'classnames';

export class Table extends TablePlugin {
  static defaultProps = {...TablePlugin.defaultProps};

  componentDidMount() {
    require('../../css/tables');
  }

  render() {
    const {className, columns, data} = this.props;

    let dataColumns;

    if (!columns && data.length > 0) {
      dataColumns = Object.keys(data[0]).map(attribute => ({attribute}));
    }

    const renderedColumns = (columns || dataColumns || [])
      .map(column => typeof column === 'string' ? {attribute: column} : column);

    const headers = renderedColumns.map((column, key) => {
      const Th = this.plugTag('th', 'th');
      const children = column.displayName || column.attribute;
      const thContext = {column};
      return <Th {...{key, ...this.plugProps('th', {children}, thContext)}}/>;
    });

    const HeaderTr = this.plugTag('tr', 'tr');
    const headerTrContext = {isHeader: true, rowIndex: -1};
    const headerRow = <HeaderTr {...this.plugProps('tr', {children: headers}, headerTrContext)}/>;

    const bodyCols = rowDatum => renderedColumns.map((column, key) => {
      const keys = (column.attribute || '').split('.');
      let children = rowDatum;
      keys.forEach(key => children = (children || {})[key]);
      const tdContext = {column, rowDatum};
      const Td = this.plugTag('td', 'td', tdContext);
      return <Td {...{key, ...this.plugProps('td', {children}, tdContext)}}/>;
    });

    const bodyRows = data.map((rowDatum, key) => {
      const trContext = {rowDatum, isHeader: false, rowIndex: key};
      const Tr = this.plugTag('tr', 'tr', trContext);
      return <Tr {...{key, ...this.plugProps('tr', {children: bodyCols(rowDatum)}, trContext)}}/>;
    });

    const Table = this.plugTag('table', 'table');
    const tableChildren = [{
      method: 'thead', children: headerRow
    }, {
      method: 'tbody', children: bodyRows
    }, {
      method: 'tfoot', children: []
    }].map(({method, children}, key) => {
        const Tag = this.plugTag(method, method);
        return <Tag {...{...this.plugProps(method, {children}), key}}/>;
      }
    );

    return (
      <Table {...this.plugProps('table', {
        className: classnames('table', className),
        children: tableChildren
      })}/>
    );
  }
}