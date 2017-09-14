// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellClassName(Table) {
  function className(method, isHeader, props, cellContext) {
    const {column: {className}, rowDatum = {}} = cellContext;
    if (!className) return this.plugProps(props, cellContext, method);
    return this.plugProps(this.mergeProps(props, {className: className(rowDatum, isHeader)}), cellContext, method);
  }

  return class TableWithCellClassName extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return (<Table {...this.props} {...{
        td: className.bind(this, 'td', false),
        th: className.bind(this, 'th', true)
      }}/>);
    }
  };
}