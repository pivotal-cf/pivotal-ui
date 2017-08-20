import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withFixedWithColumns(Table) {
  function colFixed(method, {column: {width}}) {
    if (!width) return this[method]();
    return this[method]({
      className: 'col-fixed',
      style: {width}
    });
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