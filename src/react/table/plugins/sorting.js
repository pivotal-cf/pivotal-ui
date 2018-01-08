// eslint-disable-next-line no-unused-vars
import React from 'react';
import classnames from 'classnames';
import {Icon} from '../../iconography';
import sortBy from 'lodash.sortby';
import {find} from '../../helpers';
import PropTypes from 'prop-types';

import {TablePlugin} from '../table-plugin';

export function withSorting(Table) {
  class TableWithSorting extends TablePlugin {
    static sortTypes = ['asc', 'desc', null];

    static defaultProps = {...Table.defaultProps, sortOrder: TableWithSorting.sortTypes};

    static propTypes = {
      defaultSort: PropTypes.oneOf(TableWithSorting.sortTypes),
      sortOrder: PropTypes.arrayOf(PropTypes.oneOf(TableWithSorting.sortTypes))
    };

    constructor(props) {
      super(props);

      const {columns = [], defaultSort} = props;

      this.state = {
        sortColumn: find(columns, ({sortable, attribute}) =>
          defaultSort ? attribute === defaultSort : sortable
        ),
        sortIndex: 0,
      };
    }

    componentWillReceiveProps({columns, defaultSort}) {
      if (!columns) return;
      const sortColumn = find(columns, ({sortable, attribute}) =>
        defaultSort ? attribute === defaultSort : sortable
      );
      this.setState({sortColumn, sortIndex: 0});
    }

    updateSort(column) {
      const {state: {sortColumn, sortIndex}, props: {sortOrder}} = this;
      const isSortColumn = column === sortColumn;

      if (isSortColumn) {
        return this.setState({sortIndex: (sortIndex + 1) % sortOrder.length});
      }

      this.setState({
        sortColumn: column.sortable && column,
        sortIndex: 0
      });
    }

    sort() {
      const {props: {data, sortOrder}, state: {sortColumn, sortIndex}} = this;
      if (!sortColumn || !sortOrder[sortIndex]) return data;
      const sorted = sortBy(data, datum => {
        const rankFunction = sortColumn.sortBy || (i => i);
        return rankFunction(datum[sortColumn.attribute]);
      });

      if (sortOrder[sortIndex] === 'desc') sorted.reverse();

      return sorted;
    }

    render() {
      const {sortOrder} = this.props;
      return this.renderTable(Table, {
        table: () => ({className: 'table-sortable'}),
        th: (props, {column, column: {sortable}}) => {
          if (!sortable) return props;

          const {children: oldChildren} = props;
          const {sortColumn, sortIndex} = this.state;
          const isSortColumn = column === sortColumn;
          let className, icon;

          if (isSortColumn && sortOrder[sortIndex]) {
            className = `sorted-${sortOrder[sortIndex]}`;
            if (sortOrder[sortIndex] === 'asc') icon = <Icon verticalAlign="baseline" src="arrow_drop_up"/>;
            if (sortOrder[sortIndex] === 'desc') icon = <Icon verticalAlign="baseline" src="arrow_drop_down"/>;
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
  }
  return TableWithSorting;
}