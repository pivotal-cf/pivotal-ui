import React from 'react';
import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import sortBy from 'lodash.sortby';

import {TablePlugin} from '../table-plugin';

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

export function withSorting(Table) {
  function updateSort(column) {
    const {sortColumn} = this.state;
    const isSortColumn = column === sortColumn;

    if (isSortColumn) {
      const sortOrder = ++this.state.sortOrder % Object.keys(SORT_ORDER).length;
      return this.setState({sortOrder});
    }

    this.setState({
      sortColumn: column.sortable && column,
      sortOrder: SORT_ORDER.asc
    });
  }

  function th({column}) {
    const {sortColumn, sortOrder} = this.state;
    const {sortable} = column;
    const isSortColumn = column === sortColumn;
    let className;
    if (!column.displayName) column.displayName = column.attribute;
    if (isSortColumn) {
      className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
      if (!Array.isArray(column.displayName)) {
        column.displayName = [column.displayName];
      }
      column.displayName[1] = [
        <Icon verticalAlign="baseline" src="arrow_drop_up"/>,
        <Icon verticalAlign="baseline"
              src="arrow_drop_down"/>, null][sortOrder];
    } else if (Array.isArray(column.displayName)) {
      column.displayName = column.displayName[0];
    }
    const onClick = updateSort.bind(this, column);
    return {
      className: classnames({sortable}, className),
      disabled: !sortable,
      role: 'button',
      tabIndex: 0,
      onClick,
      onKeyDown: ({key}) => key == 'Enter' && onClick()
    }
  }

  function sort() {
    const {data} = this.props;
    const {sortColumn, sortOrder} = this.state;
    if (!sortColumn || sortOrder === SORT_ORDER.none) return data;
    const sorted = sortBy(data, datum => {
      const rankFunction = sortColumn.sortBy || (i => i);
      return rankFunction(datum[sortColumn.attribute]);
    });

    if (sortOrder === SORT_ORDER.desc) sorted.reverse();

    return sorted;
  }

  return class TableWithSorting extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    constructor(props) {
      super(props);

      const {columns, defaultSort} = props;

      this.state = {
        sortColumn: columns.find(({sortable, attribute}) =>
          defaultSort ? attribute === defaultSort : sortable
        ),
        sortOrder: SORT_ORDER.asc
      };
    }

    componentWillReceiveProps({columns, defaultSort}) {
      if (!columns) return;
      const sortColumn = columns.find(({sortable, attribute}) =>
        defaultSort ? attribute === defaultSort : sortable
      );
      this.setState({sortColumn, sortOrder: SORT_ORDER.asc});
    }

    render() {
      return <Table {...this.props} {...{
        table: this.table.bind(this, {className: 'table-sortable'}),
        th: th.bind(this),
        data: sort.apply(this)
      }}/>;
    }
  }
}