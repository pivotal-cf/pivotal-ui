import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import React from 'react';
import sortBy from 'lodash.sortby';

import Plugin from '../plugin';

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

function updateSort(column) {
  const {sortColumn} = this.state;
  const isSortColumn = column === sortColumn;
  if (isSortColumn) {
    const sortOrder = ++this.state.sortOrder % Object.keys(SORT_ORDER).length;
    return this.setState({sortOrder});
  }
  this.setState({sortColumn: column, sortOrder: SORT_ORDER.asc});
}

// function onKeyDownTableHeader(event, props) {
//   if (event.key !== 'Enter') return;
//   onClickTableHeader(event, props);
// }

export class Sortable extends Plugin {
  constructor(props) {
    super(props);
    const {columns = [], defaultSort} = props.target.props;
    this.state = {
      sortColumn: columns.find(({sortable, attribute}) =>
        defaultSort ? attribute === defaultSort : sortable),
      sortOrder: SORT_ORDER.asc
    };
  }

  // tableConstructor({props: {columns, defaultSort}, subject: {state}}) {
  //   state.sortColumn = columns.find(({sortable, attribute}) =>
  //     defaultSort ? attribute === defaultSort : sortable
  //   );
  //   state.sortOrder = SORT_ORDER.asc;
  // },
  //
  // tableWillReceiveProps({props: {columns, defaultSort}, subject}) {
  //   if (!columns) return;
  //   const sortColumn = columns.find(({sortable, attribute}) =>
  //     defaultSort ? attribute === defaultSort : sortable
  //   );
  //   subject.setState({sortColumn, sortOrder: SORT_ORDER.asc});
  // },

  table() {
    return {className: 'table-sortable'};
  }

  th() {
    const {sortColumn, sortOrder} = this.state;
    const {column} = this.props.target.props;
    const {sortable} = column;
    const isSortColumn = column === sortColumn;
    let className, icon;
    if (isSortColumn) {
      className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
      icon = [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
        <Icon verticalAlign="baseline"
              src="arrow_drop_down"/>, null][sortOrder];
    }
    const onSortableTableHeaderClick = updateSort.bind(this, column);
    return {
      tabIndex: 0,
      disabled: !sortable,
      onClick: () => sortable && onSortableTableHeaderClick(),
      role: 'button',
      className: classnames({sortable}, className),
      child: <span>hi</span>
    };
  }

  tbody() {
    console.log('tbody', this.state);
    return {};
  }

  // beforeRenderTableHeader({column, memo, subject}) {
  //   const {sortColumn, sortOrder} = subject.state;
  //   const {sortable} = column;
  //   const isSortColumn = column === sortColumn;
  //   let className, icon;
  //   if (isSortColumn) {
  //     className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
  //     icon = [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
  //       <Icon verticalAlign="baseline"
  //             src="arrow_drop_down"/>, null][sortOrder];
  //   }
  //   const onSortableTableHeaderClick = () => updateSort(column, subject);
  //   return {
  //     ...memo,
  //     tabIndex: 0,
  //     disabled: !sortable,
  //     onClick: e => onClickTableHeader(e, {sortable, onClick: memo.onClick, onSortableTableHeaderClick}),
  //     onKeyDown: e => onKeyDownTableHeader(e, {sortable, onClick: memo.onClick, onSortableTableHeaderClick}),
  //     role: 'button',
  //     className: classnames(memo.className, {sortable}, className)
  //   };
  // },
  //
  // headerIcon({column, subject: {state: {sortColumn, sortOrder}}}) {
  //   const isSortColumn = column === sortColumn;
  //   if (!isSortColumn) return;
  //   return [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
  //     <Icon verticalAlign="baseline"
  //           src="arrow_drop_down"/>, null][sortOrder];
  // },
  //
  // beforeRenderRows({memo, subject: {state: {sortColumn, sortOrder}}}) {
  //   if (!sortColumn || sortOrder === SORT_ORDER.none) return memo;
  //   memo = sortBy(memo, datum => {
  //     const rankFunction = sortColumn.sortBy || (i => i);
  //     return rankFunction(datum[sortColumn.attribute]);
  //   });
  //
  //   if (sortOrder === SORT_ORDER.desc) memo.reverse();
  //
  //   return memo;
  // },
  //
  // beforeRenderTableCell: ({memo: {sortable, sortBy, ...props}}) => props
}