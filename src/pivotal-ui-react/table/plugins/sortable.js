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
};

export const Sortable = {
  constructor({props: {columns, defaultSort}, subject: {state}}) {
    state.sortColumn = columns.find(({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });
    state.sortOrder = SORT_ORDER.asc;
  },

  componentWillReceiveProps({props, subject}) {
    const {columns, defaultSort} = props;
    if (columns) {
      const sortColumn = columns.find(({sortable, attribute}) => {
        return defaultSort ? attribute === defaultSort : sortable;
      });
      subject.setState({sortColumn, sortOrder: SORT_ORDER.asc});
    }
  },

  beforeRenderHeaders({column, memo, index, subject}) {
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
    return {
      ...memo,
      className: classnames(memo.className, className),
      sortable,
      key: index,
      onSortableTableHeaderClick: () => updateSort(column, subject)
    };
  },

  headerIcon({column, subject}) {
    const {sortColumn, sortOrder} = subject.state;
    const isSortColumn = column === sortColumn;
    if (!isSortColumn) return;
    return [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
      <Icon verticalAlign="baseline"
            src="arrow_drop_down"/>, null][sortOrder];
  },

  beforeRenderRows({data, subject}) {
    const {sortColumn, sortOrder} = subject.state;
    if (!sortColumn || sortOrder === SORT_ORDER.none) return data;
    const sortedData = sortBy(data, datum => {
      const rankFunction = sortColumn.sortBy || (i => i);
      return rankFunction(datum[sortColumn.attribute]);
    });

    if (sortOrder === SORT_ORDER.desc) sortedData.reverse();

    return sortedData;
  }
};