// eslint-disable-next-line no-unused-vars
import React from 'react';
import classnames from 'classnames';
import {Icon} from '../../iconography';
import sortBy from 'lodash.sortby';
import {find} from '../../helpers';

import {TablePlugin} from '../table-plugin';

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

export function withSorting(Table) {
  return class TableWithSorting extends TablePlugin {
    constructor(props) {
      super(props);

      const {columns = [], defaultSort} = props;

      this.state = {
        sortColumn: find(columns, ({sortable, attribute}) =>
          defaultSort ? attribute === defaultSort : sortable
        ),
        sortOrder: SORT_ORDER.asc
      };
    }

    updateSort(column) {
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

    sort() {
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

    render() {
      return this.renderTable(Table, {
        table: () => ({className: 'table-sortable'}),
        th: (props, {column, column: {sortable}}) => {
          if (!sortable) return props;

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

          const onClick = () => this.updateSort(column);
          const children = <div>{oldChildren}{icon}</div>;

          return {
            className: classnames({sortable}, className),
            disabled: !sortable,
            children,
            onClick,
            onKeyDown: ({key}) => key === 'Enter' && onClick(),
            role: 'button',
            tabIndex: 0
          };
        },
        data: this.sort()
      });
    }
  };
}