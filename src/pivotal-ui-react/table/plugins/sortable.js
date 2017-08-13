import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import React from 'react';
import sortBy from 'lodash.sortby';

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

function updateSort(column, table) {
  const {sortColumn} = table.state;
  const isSortColumn = column === sortColumn;
  if (isSortColumn) {
    return table.setState({sortOrder: ++table.state.sortOrder % Object.keys(SORT_ORDER).length});
  }

  table.setState({sortColumn: column, sortOrder: SORT_ORDER.asc});
}

function onClickTableHeader(event, {sortable, onClick, onSortableTableHeaderClick}) {
  if (sortable) onSortableTableHeaderClick(event);
  if (onClick) onClick(event);
}

function onKeyDownTableHeader(event, props) {
  if (event.key !== 'Enter') return;
  onClickTableHeader(event, props);
}

export const Sortable = {
  constructor({props: {columns, defaultSort}, table: {state}}) {
    state.sortColumn = columns.find(({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });
    state.sortOrder = SORT_ORDER.asc;
  },

  componentWillReceiveProps({props, table}) {
    const {columns, defaultSort} = props;
    if (columns) {
      const sortColumn = columns.find(({sortable, attribute}) => {
        return defaultSort ? attribute === defaultSort : sortable;
      });
      table.setState({sortColumn, sortOrder: SORT_ORDER.asc});
    }
  },

  beforeRenderTable({memo: {defaultSort, ...props}}) {
    return {...props, className: classnames(props.className, 'table-sortable')};
  },

  beforeRenderTableHeader({column, memo, table}) {
    const {sortColumn, sortOrder} = table.state;
    const {sortable} = column;
    const isSortColumn = column === sortColumn;
    let className, icon;
    if (isSortColumn) {
      className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
      icon = [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
        <Icon verticalAlign="baseline"
              src="arrow_drop_down"/>, null][sortOrder];
    }
    const onSortableTableHeaderClick = () => updateSort(column, table);
    return {
      ...memo,
      tabIndex: 0,
      disabled: !sortable,
      onClick: e => onClickTableHeader(e, {sortable, onClick: memo.onClick, onSortableTableHeaderClick}),
      onKeyDown: e => onKeyDownTableHeader(e, {sortable, onClick: memo.onClick, onSortableTableHeaderClick}),
      role: 'button',
      className: classnames(memo.className, {sortable}, className)
    };
  },

  headerIcon({column, table}) {
    const {sortColumn, sortOrder} = table.state;
    const isSortColumn = column === sortColumn;
    if (!isSortColumn) return;
    return [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
      <Icon verticalAlign="baseline"
            src="arrow_drop_down"/>, null][sortOrder];
  },

  beforeRenderRows({memo, table}) {
    const {sortColumn, sortOrder} = table.state;
    if (!sortColumn || sortOrder === SORT_ORDER.none) return memo;
    memo = sortBy(memo, datum => {
      const rankFunction = sortColumn.sortBy || (i => i);
      return rankFunction(datum[sortColumn.attribute]);
    });

    if (sortOrder === SORT_ORDER.desc) memo.reverse();

    return memo;
  },

  beforeRenderTableCell: ({memo: {sortable, sortBy, ...props}}) => props
};