import React from 'react';
import {TablePlugin} from './table-plugin';
import classnames from 'classnames';

export class Table extends TablePlugin {
  static defaultProps = {...TablePlugin.defaultProps};

  componentDidMount() {
    require('../../css/flex-grids');
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
      const children = column.displayName || column.attribute;
      const thContext = {column};
      return <th {...{key, ...this.plugProps('th', {children, className: 'col'}, thContext)}}/>;
    });

    const headerTrContext = {isHeader: true, rowIndex: -1};
    const headerRow = <tr {...this.plugProps('tr', {children: headers, className: 'grid'}, headerTrContext)}/>;

    const bodyCols = rowDatum => renderedColumns.map((column, key) => {
      const keys = (column.attribute || '').split('.');
      let children = rowDatum;
      keys.forEach(key => children = (children || {})[key]);
      const tdContext = {column, rowDatum};
      return <td {...{key, ...this.plugProps('td', {children, className: 'col'}, tdContext)}}/>;
    });

    const bodyRows = data.map((rowDatum, key) => {
      const trContext = {rowDatum, isHeader: false, rowIndex: key};
      const children = bodyCols(rowDatum);
      return <tr {...{key, ...this.plugProps('tr', {children, className: 'grid'}, trContext) }}/>;
    });

    const tableChildren = [
      <thead {...{key: 'thead', ...this.plugProps('thead', {children: headerRow})}}/>,
      <tbody {...{key: 'tbody', ...this.plugProps('tbody', {children: bodyRows})}}/>,
      <tfoot {...{key: 'tfoot', ...this.plugProps('tfoot', {children: []})}}/>,
    ];

    return (
      <table {...this.plugProps('table', {
        className: classnames('table', className),
        children: tableChildren
      })}/>
    );
  }
}