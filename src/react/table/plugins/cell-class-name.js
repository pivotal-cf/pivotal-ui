import {TablePlugin} from '../table-plugin';

const cellClassName = (className, rowDatum, isHeader) => {
  switch (typeof className) {
    case 'string':
      return {className};
    case 'function':
      return {className: className(rowDatum, isHeader)};
    default:
      return;
  }
};

export function withCellClassName(Table) {
  return class TableWithCellClassName extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        th: (props, {column: {className}, rowDatum = {}}) => cellClassName(className, rowDatum, true),
        td: (props, {column: {className}, rowDatum = {}}) => cellClassName(className, rowDatum, false)
      });
    }
  };
}