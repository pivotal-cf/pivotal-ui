import {TablePlugin} from '../table-plugin';

export function withCellOnClick(Table) {
  return class TableWithCellOnClick extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        td: (props, {column: {onClick}, rowDatum}) => onClick && {onClick: e => onClick(e, rowDatum)}
      });
    }
  };
}