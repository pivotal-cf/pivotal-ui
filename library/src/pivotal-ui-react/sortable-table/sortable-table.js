const classnames = require('classnames');
const React = require('react');
const sortBy = require('lodash.sortby');
const types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';
import findindex from 'lodash.findindex';

/**
 * @component TableHeader
 * @description Wrapper for a th
 *
 * @property `sortable` {boolean} (defaults to false) indicates whether the table can be sorted by this column;
 *
 */
export const TableHeader = React.createClass({
  propTypes: {
    onClick: types.func,
    onSortableTableHeaderClick: types.func,
    sortable: types.bool
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
export const TableCell = (props) => <td {...props}/>;

/**
 * @component TableRow
 * @description Wrapper for a tr
 *
 */
export const TableRow = (props) => <tr {...props}/>;

/**
 * @component SortableTable
 * @description A table that can be sorted by column
 *
 * @property `columns` {Array<Object>} A list of column metadata
 * @property `CustomRow` {Component} The component to use when rendering table rows
 * @property `data` {Array<Object>} A list of data to populate rows
 * @property `defaultSort` {String} The name of the column to sort on first
 *
 *
 * @example ```js
 * var {SortableTable} = require('pui-react-sortable-table');
 * var MyComponent = React.createClass({
 *   render() {
 *     const columns = [
 *        {
 *          attribute: 'c1',
 *          displayName: 'C One',
 *          sortable: true
 *        },
 *        {
 *          attribute: 'c2',
 *          displayName: 'C Two',
 *          sortable: true
 *        }
 *     ];
 *     var data = [
 *       {c1: 'yes', c2: 'foo'},
 *       {c1: 'no', c2: 'bar'}
 *     ];
 *     return <SortableTable columns={columns} data={data}/>
 *   }
 * });
 * ```
 *
 */
export const SortableTable = React.createClass({
  propTypes: {
    columns: types.array.isRequired,
    CustomRow: types.func,
    data: types.array.isRequired,
    defaultSort: types.string
  },

  getInitialState() {
    const {columns, defaultSort} = this.props;

    const sortCol = findindex(columns, ({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });

    // If none of the columns are sortable we default to the 0th column
    return {sortColumn: sortCol === -1 ? 0 : sortCol, sortAscending: true};
  },

  setSortedColumn(sortColumn, sortAscending) {
    this.setState({sortColumn, sortAscending});
  },

  sortedRows() {
    const {sortColumn, sortAscending} = this.state;
    const {columns, data, CustomRow} = this.props;
    const sortedData = sortBy(data, (datum) => {
      return datum[columns[sortColumn].attribute];
    });
    if(!sortAscending) sortedData.reverse();
    return sortedData.map((datum, rowKey) => {
      if(CustomRow) return <CustomRow {...{datum, key: rowKey, index: rowKey}}/>;

      const cells = columns.map(({attribute}, key) => {
        return <TableCell key={key}>{datum[attribute]}</TableCell>;
      });
      return <TableRow key={rowKey}>{cells}</TableRow>;
    });
  },

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
  },

  render() {
    const props = mergeProps(this.props, {className: ['table', 'table-sortable', 'table-data']});

    return (
      <table {...props} >
        <thead>
          <tr>{this.renderHeaders()}</tr>
        </thead>
        <tbody>
          {this.sortedRows()}
        </tbody>
      </table>
    );
  }
});
