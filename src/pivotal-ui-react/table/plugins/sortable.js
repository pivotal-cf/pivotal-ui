import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import React from 'react';
import sortBy from 'lodash.sortby';

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

function updateSort(column, subject) {
  const {sortColumn} = subject.state;
  const isSortColumn = column === sortColumn;
  if (isSortColumn) {
    return subject.setState({sortOrder: ++subject.state.sortOrder % Object.keys(SORT_ORDER).length});
  }

  subject.setState({sortColumn: column, sortOrder: SORT_ORDER.asc});
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
  tableConstructor({props: {columns, defaultSort}, subject: {state}}) {
    state.sortColumn = columns.find(({sortable, attribute}) =>
      defaultSort ? attribute === defaultSort : sortable
    );
    state.sortOrder = SORT_ORDER.asc;
  },

  tableWillReceiveProps({props: {columns, defaultSort}, subject}) {
    if (!columns) return;
    const sortColumn = columns.find(({sortable, attribute}) =>
      defaultSort ? attribute === defaultSort : sortable
    );
    subject.setState({sortColumn, sortOrder: SORT_ORDER.asc});
  },

  beforeRenderTable({memo: {defaultSort, ...props}}) {
    return {...props, className: classnames(props.className, 'table-sortable')};
  },

  beforeRenderTableHeader({column, memo, subject}) {
    const {sortColumn, sortOrder} = subject.state;
    const {sortable} = column;
    const isSortColumn = column === sortColumn;
    let className, icon;
    if (isSortColumn) {
      className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
      icon = [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
        <Icon verticalAlign="baseline"
              src="arrow_drop_down"/>, null][sortOrder];
    }
    const onSortableTableHeaderClick = () => updateSort(column, subject);
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

  headerIcon({column, subject: {state: {sortColumn, sortOrder}}}) {
    const isSortColumn = column === sortColumn;
    if (!isSortColumn) return;
    return [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
      <Icon verticalAlign="baseline"
            src="arrow_drop_down"/>, null][sortOrder];
  },

  beforeRenderRows({memo, subject: {state: {sortColumn, sortOrder}}}) {
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