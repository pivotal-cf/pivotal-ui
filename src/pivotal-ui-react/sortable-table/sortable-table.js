var classnames = require('classnames');
var React = require('react');
var sortBy = require('lodash.sortby');

var types = React.PropTypes;

var TableHeader = React.createClass({
  handleClick() {
    if (this.props.sortable) {
      this.props.onSortableTableHeaderClick(this);
    }
  },

  render() {
    var {children, sortable, sortState: {column, order}, name} = this.props;

    var sortClass = classnames({
      'sortable': sortable,
      'sorted-none': sortable && column !== name,
      'sorted-asc': sortable && column === name && order === 'asc',
      'sorted-desc': sortable && column === name && order === 'desc'
    });

    return <th className={sortClass} onClick={this.handleClick}>{children}</th>;
  }
});

const ALIGNMENT = {
  left: 'txt-l',
  center: 'txt-c',
  right: 'txt-r'
};
var TableRow = React.createClass({
  render() {
    var {data, alignment, columnNames} = this.props;
    var tableCells = columnNames.map(function(name, i) {
      return <td key={name} className={classnames(ALIGNMENT[alignment[i]])}>{data[name]}</td>;
    });
    return <tr>{tableCells}</tr>;
  }
});

/**
 * @component SortableTable
 * @description A table that can be sorted by column
 *
 * @property columns {Array<Object>} A list of column configuration parameters:
 *   `name` is the `data` key associated with the column;
 *   `title` is the header text for the column;
 *   `sortable` (defaults to false) indicates whether the table can be sorted by this column; and
 *   `align` (defaults to left) sets the text alignment for cells in this column
 * @property data {Array<Object>} The data to be displayed in the table
 * @property classes {Array<String>} Class names to add to the table
 *
 * @example ```js
 * var SortableTable = require('pui-react-sortable-table').SortableTable;
 * var MyComponent = React.createClass({
 *   render() {
 *     var columns = [
 *       {name: 'c1', title: 'Column 1', sortable: true},
 *       {name: 'c2', title: 'Column 2'}
 *     ];
 *     var data = [
 *       {c1: 'yes', c2: 'foo'},
 *       {c1: 'no', c2: 'bar'}
 *     ];
 *     return <SortableTable data={data} columns={columns} classes={['my-table']}/>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#table_sortable_react)
 */
var SortableTable = React.createClass({
  propTypes: {
    classes: types.arrayOf(types.string),
    columns: types.arrayOf(types.shape({
      name: types.string.isRequired,
      title: types.string.isRequired,
      align: types.oneOf(['left', 'center', 'right']),
      sortable: types.bool
    })),
    data: types.arrayOf(types.object)
  },

  getInitialState() {
    var {columns, data} = this.props;
    var column = columns[0].name;
    return {
      sort: {
        column,
        order: 'asc'
      },
      data: sortBy(data, column)
    };
  },

  sortData(header) {
    var {data: oldData, sort: {column: oldSortColumn, order: oldSortOrder}} = this.state;
    var newSortColumn = header.props.name;
    var newData, newSortOrder;

    if (oldSortColumn !== newSortColumn) {
      newSortOrder = 'asc';
      newData = sortBy(oldData, newSortColumn);
    } else {
      newSortOrder = oldSortOrder === 'asc' ? 'desc' : 'asc';
      newData = oldData.reverse();
    }

    this.setState({
      sort: {
        column: newSortColumn,
        order: newSortOrder
      },
      data: newData
    });
  },

  render() {
    var {columns, classes} = this.props;

    var headings = columns.map(function(column) {
      return (
        <TableHeader key={column.name} name={column.name} sortable={column.sortable} sortState={this.state.sort} onSortableTableHeaderClick={this.sortData}>
          {column.title}
        </TableHeader>
      );
    }, this);

    var rows = this.state.data.map(function(datum, i) {
      return (<TableRow data={datum} key={i} columnNames={columns.map(c => c.name)} alignment={columns.map(c => c.align)}/>);
    });

    return (
      <table className={classnames('table', 'table-sortable', classes)}>
        <thead>
          <tr>
            {headings}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

module.exports = {SortableTable};
