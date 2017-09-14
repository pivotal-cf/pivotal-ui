// eslint-disable-next-line no-unused-vars
import React from 'react';
import classnames from 'classnames';
import {Icon} from '../../iconography';
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

  function th(props, thContext) {
    const {column, column: {sortable}} = thContext;
    if (!sortable) return this.plugThProps(props, thContext);

    const {children: oldChildren} = props;
    const {sortColumn, sortOrder} = this.state;
    const isSortColumn = column === sortColumn;
    let className, icon;

    if (isSortColumn) {
      className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
      icon = [
        <Icon key={0} verticalAlign="baseline" src="arrow_drop_up"/>,
        <Icon key={0} verticalAlign="baseline" src="arrow_drop_down"/>,
        null
      ][sortOrder];
    }

    const baseProps = this.mergeProps(props, {
      className: classnames({sortable}, className),
      disabled: !sortable
    });

    const onClick = updateSort.bind(this, column);

    const children = <div>{oldChildren}{icon}</div>;

    return this.plugThProps({
      ...baseProps,
      children,
      onClick,
      onKeyDown: ({key}) => key === 'Enter' && onClick(),
      role: 'button',
      tabIndex: 0
    }, thContext);
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
      return (<Table {...this.props} {...{
        table: (props, tableContext) => this.plugTableProps(this.mergeProps(props, {className: 'table-sortable'}), tableContext),
        th: th.bind(this),
        data: sort.apply(this)
      }}/>);
    }
  };
}