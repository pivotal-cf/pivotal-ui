import {TablePlugin} from '../table-plugin';

export function withCellWidth(Table) {
  const cellWidth = width => width && {className: 'col-fixed', style: {width}};

  return class TableWithCellWidth extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        th: (props, {column: {width}}) => cellWidth(width),
        td: (props, {column: {width}}) => cellWidth(width),
      });
    }
  };
}