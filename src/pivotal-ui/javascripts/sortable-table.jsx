'use strict';

var React = require('react');
var _ = require('lodash');

var TableHeader = React.createClass({
  handleClick: function handleClick() {
    if (this.props.sortable) {
      this.props.onSortableTableHeaderClick(this);
    }
  },

  render: function render() {
    var sortClass;

    if (this.props.sortable) {
      if (this.props.sortState.column !== this.props.name) {
        sortClass = 'sortable sorted-none';
      } else if (this.props.sortState.order === 'asc') {
        sortClass = 'sortable sorted-asc';
      } else {
        sortClass = 'sortable sorted-desc';
      }
    }

    return (
      <th className={sortClass} onClick={this.handleClick}>
        {this.props.children}
      </th>
    );
  }
});

var TableRow = React.createClass({
  render: function render() {
    var alignment = {
      left: 'txt-l',
      center: 'txt-c',
      right: 'txt-r'
    };

    var tableCells = _.map(this.props.columnNames, function(columnName, columnIndex) {
      var columnAlignment = this.props.alignment[columnIndex],
        alignClass;

      alignClass = (columnAlignment) ? alignment[columnAlignment] : '';

      return (
        <td key={columnName} className={alignClass}>{this.props.data[columnName]}</td>
      );
    }, this);

    return (
      <tr>
        {tableCells}
      </tr>
    );
  }
});

var SortableTable = React.createClass({
  getInitialState: function getInitialState() {
    return {
      sort: {
        column: this.props.columns[0].name,
        order: 'asc'
      },

      data: _.sortBy(this.props.data, this.props.columns[0].name)
    };
  },

  sortData: function sortData(header) {
    var oldSortColumn = this.state.sort.column;
    var oldSortOrder = this.state.sort.order;
    var oldData = this.state.data;
    var newSortColumn = header.props.name;
    var newData;
    var newSortOrder;

    if (oldSortColumn !== newSortColumn) {
      newSortOrder = 'asc';
      newData = _.sortBy(oldData, newSortColumn);
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

  render: function render() {
    var headings = _.map(this.props.columns, function(column) {
      return (
        <TableHeader key={column.name} name={column.name} sortable={column.sortable} sortState={this.state.sort} onSortableTableHeaderClick={this.sortData}>
          {column.title}
        </TableHeader>
      );
    }, this);

    var rows = _.map(this.state.data, function(datum, datumIndex) {
      return (
        <TableRow data={datum} key={datumIndex} columnNames={_.map(this.props.columns, 'name')} alignment={_.map(this.props.columns, 'align')} />
      );
    }, this);

    var defaultClasses = ['table', 'table-sortable'];
    var allClasses = defaultClasses.concat(this.props.classes).join(' ');

    return (
      <table className={allClasses}>
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

module.exports = SortableTable;
