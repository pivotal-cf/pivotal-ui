/** @jsx React.DOM */
'use strict';

var React = require('react');
var _ = require('lodash');

var TableHeader = React.createClass({
  handleClick: function handleClick(e) {
    this.props.onTableHeaderClick(this);
  },

  render: function render() {
    var sortClass;

    if (this.props.sortState.column !== this.props.key) {
      sortClass = 'sorted-none';
    } else if (this.props.sortState.order === 'asc') {
      sortClass = 'sorted-asc';
    } else {
      sortClass = 'sorted-desc';
    }

    return (
      <th className={'sortable ' + sortClass} onClick={this.handleClick}>
        {this.props.children}
      </th>
    );
  }
});

var TableRow = React.createClass({
  render: function render() {
    var tableCells = _.map(this.props.columnNames, function(columnName) {
      return (
        <td>{this.props.data[columnName]}</td>
      );
    }, this);

    return (
      <tr>
        {tableCells}
      </tr>
    );
  }
});

var TableSortable = module.exports = React.createClass({
  getInitialState: function getInitialState() {
    return {
      sort: {
        column: 'name',
        order: 'asc'
      },

      data: _.sortBy(this.props.data, 'name')
    };
  },

  sortData: function sortData(header) {
    var oldSortColumn = this.state.sort.column;
    var oldSortOrder = this.state.sort.order;
    var oldData = this.state.data;
    var newSortColumn = header.props.key;
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
        <TableHeader key={column.name} sortState={this.state.sort} onTableHeaderClick={this.sortData}>
          {column.title}
        </TableHeader>
      );
    }, this);

    var rows = _.map(this.state.data, function(datum) {
      return (
        <TableRow data={datum} key={datum.name} columnNames={_.map(this.props.columns, 'name')} />
      );
    }, this);

    return (
      <table className='table table-data table-sortable'>
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
