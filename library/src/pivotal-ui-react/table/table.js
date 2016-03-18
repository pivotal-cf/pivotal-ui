const classnames = require('classnames');
const React = require('react');
const sortBy = require('lodash.sortby');
const types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';
import findindex from 'lodash.findindex';
require('pui-css-tables');

export class TableHeader extends React.Component {
  static propTypes = {
    onClick: types.func,
    onSortableTableHeaderClick: types.func,
    sortable: types.bool
  };

  handleActivate = (event) => {
    var {sortable, onClick, onSortableTableHeaderClick} = this.props;
    if (sortable) onSortableTableHeaderClick(event);
    if (onClick) onClick(event);
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleActivate(event);
    }
  };

  render() {
    const {sortable, ...others} = this.props;
    const props = mergeProps(others, {className: {'sortable': sortable}});

    return <th {...props} onClick={this.handleActivate} onKeyDown={this.handleKeyDown} tabIndex="0" role="button" disabled={ !sortable }/>;
  }
}

export const TableCell = (props) => <td {...props}/>;

export const TableRow = (props) => <tr {...props}/>;

export class Table extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {columns, defaultSort} = this.props;

    const sortCol = findindex(columns, ({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });

    this.state = {sortColumn: sortCol, sortAscending: true};
  }

  static propTypes = {
    columns: types.array.isRequired,
    CustomRow: types.func,
    data: types.array.isRequired,
    defaultSort: types.string
  };

  setSortedColumn = (sortColumn, sortAscending) => {
    this.setState({sortColumn, sortAscending});
  };

  sortedRows() {
    const {sortColumn, sortAscending} = this.state;
    const {columns, data} = this.props;

    const sortedData = sortBy(data, (datum) => {
      const column = columns[sortColumn];
      const rankFunction = column.sortBy || (i => i);
      return rankFunction(datum[column.attribute]);
    });

    if(!sortAscending) sortedData.reverse();

    return this.rows(sortedData);
  }

  rows(data) {
    const {columns, CustomRow} = this.props;

    return data.map((datum, rowKey) => {
      const cells = columns.map(({attribute, CustomCell}, key) => {
        const Cell = CustomCell || TableCell;
        return <Cell key={key} index={rowKey} value={datum[attribute]} rowDatum={datum}>{datum[attribute]}</Cell>;
      });

      const Row = CustomRow || TableRow;
      return <Row key={rowKey} index={rowKey}>{cells}</Row>;
    });
  }

  renderHeaders() {
    const {sortColumn, sortAscending} = this.state;

    return this.props.columns.map(({attribute, sortable, displayName, headerProps}, index) => {
      headerProps = headerProps || {};

      const isSortColumn = (sortColumn === index);
      let className;
      if ( isSortColumn ) {
        className = sortAscending ? 'sorted-asc' : 'sorted-desc';
      }
      className = classnames(className, headerProps.className);

      headerProps = {...headerProps,
        className,
        sortable,
        key: index,
        onSortableTableHeaderClick: () => this.setSortedColumn(index, isSortColumn ? !sortAscending : true)
      };

      return <TableHeader {...headerProps}>{displayName || attribute}</TableHeader>;
    });
  }

  render() {
    const {sortColumn} = this.state;
    const {data} = this.props;
    const props = mergeProps(this.props, {className: ['table', 'table-sortable', 'table-data']});

    const rows = (sortColumn === -1) ? this.rows(data) : this.sortedRows();

    return (
      <table {...props} >
        <thead>
          <tr>{this.renderHeaders()}</tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
