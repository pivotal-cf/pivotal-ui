const classnames = require('classnames');
const React = require('react');
const sortBy = require('lodash.sortby');
import {mergeProps} from 'pui-react-helpers';
import findindex from 'lodash.findindex';
import arrayify from 'array-ify';

/**
 * @component TableHeader
 * @description Wrapper for a th
 *
 * @property `sortable` {boolean} (defaults to false) indicates whether the table can be sorted by this column;
 *
 */
export const TableHeader = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    onSortableTableHeaderClick: React.PropTypes.func,
    sortable: React.PropTypes.bool
  },

  handleActivate(event) {
    var {sortable, onClick, onSortableTableHeaderClick} = this.props;
    if (sortable) onSortableTableHeaderClick(event);
    if (onClick) onClick(event);
  },

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleActivate(event);
    }
  },

  render() {
    const {sortable, ...others} = this.props;
    const props = mergeProps(others, {className: {'sortable': sortable}});

    return <th {...props} onClick={this.handleActivate} onKeyDown={this.handleKeyDown} tabIndex="0" role="button" disabled={ !sortable }/>;
  }
});

/**
 * @component TableCell
 * @description Wrapper for a td
 *
 */
export const TableCell = React.createClass({
  render() {
    return <td {...this.props}/>;
  }
});

/**
 * @component TableRow
 * @description Wrapper for a tr
 *
 */
export const TableRow = React.createClass({
  render() {
    return <tr {...this.props} />;
  }
});

/**
 * @component SortableTable
 * @description A table that can be sorted by column
 *
 * @property `headers` {Array<Object>} A list of `TableHeader` components
 *
 * @example ```js
 * var {SortableTable, TableHeader, TableRow, TableCell} = require('pui-react-sortable-table');
 * var MyComponent = React.createClass({
 *   render() {
 *     var headers = [
 *       <TableHeader sortable={true}>c1</TableHeader>,
 *       <TableHeader sortable={true}>c2</TableHeader>,
 *      ];
 *     var data = [
 *       {c1: 'yes', c2: 'foo'},
 *       {c1: 'no', c2: 'bar'}
 *     ];
 *     return <SortableTable headers={headers}>
 *       {sortTableData.map(function(datum, key) {
 *         return (
 *           <TableRow key={key}>
 *             <TableCell>{datum.c1}</TableCell>
 *             <TableCell>{datum.c2}</TableCell>
 *           </TableRow>
 *         );
 *       })}
 *     </SortableTable>;
 *   }
 * });
 * ```
 *
 */
export const SortableTable = React.createClass({
  propTypes: {
    headers: React.PropTypes.arrayOf(React.PropTypes.element)
  },

  getInitialState() {
    const sortCol = findindex(this.props.headers, (header) => {
      return header.props.sortable;
    });

    // If none of the columns are sortable we default to the 0th column
    return {sortColumn: sortCol === -1 ? 0 : sortCol, sortAscending: true};
  },

  setSortedColumn(sortColumn, sortAscending) {
    this.setState({sortColumn, sortAscending});
  },

  headerClassesWithSortDirection({headerClassName, isSortColumn}) {
    return classnames(headerClassName, {
      'sorted-asc': isSortColumn && this.state.sortAscending,
      'sorted-desc': isSortColumn && !this.state.sortAscending
    });
  },

  sortedRows() {
    const {sortColumn, sortAscending} = this.state;
    const sortedRows = sortBy(this.props.children, (row) => {
      const cells = arrayify(row.props.children);
      const cellForSorting = cells[sortColumn];
      return cellForSorting.props.children;
    });
    return sortAscending ? sortedRows : sortedRows.reverse();
  },

  renderHeaders() {
    var {headers} = this.props;
    const {sortColumn, sortAscending} = this.state;
    return headers.map((header, index) => {
      const isSortColumn = (sortColumn === index);
      return React.cloneElement(header, {
        key: index,
        className: this.headerClassesWithSortDirection(
          {
            headerClassName: header.props.className,
            isSortColumn
          }
        ),
        onSortableTableHeaderClick: () => this.setSortedColumn(index, isSortColumn ? !sortAscending : true)
      });
    });
  },

  render() {
    const props = mergeProps(this.props, {className: ['table', 'table-sortable']});
    let rows = this.sortedRows();

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
});
