import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withFixedWithColumns(Table) {
  function colFixed(method, context) {
    const {column: {width}} = context;
    if (!width) return this[method]({}, context);
    return this[method]({
      className: 'col-fixed',
      style: {width}
    }, context);
  }

  return class TableWithFixedWidthColumns extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return <Table {...this.props} {...{
        th: colFixed.bind(this, 'th'),
        td: colFixed.bind(this, 'td')
      }}/>;
    }
  }
}