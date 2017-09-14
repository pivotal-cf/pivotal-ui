// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withFixedWidthColumns(Table) {
  function colFixed(method, props, cellContext) {
    const {column: {width}} = cellContext;
    if (!width) return this.plugProps(props, cellContext, method);
    return this.plugProps(this.mergeProps(props, {className: 'col-fixed', style: {width}}), cellContext, method);
  }

  return class TableWithFixedWidthColumns extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return (<Table {...this.props} {...{
        th: colFixed.bind(this, 'th'),
        td: colFixed.bind(this, 'td')
      }}/>);
    }
  };
}