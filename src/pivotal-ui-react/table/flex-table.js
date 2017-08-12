import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import sortBy from 'lodash.sortby';

import {Table} from './table-component';
import {FlexTableHeader} from './flex-table-header';
import {FlexTableCell} from './flex-table-cell';
import {FlexTableRow} from './flex-table-row';

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

export class FlexTable extends Table {
  static propTypes = {
    bodyRowClassName: PropTypes.string,
    columns: PropTypes.array.isRequired,
    CustomRow: PropTypes.func,
    data: PropTypes.array.isRequired,
    defaultSort: PropTypes.string,
    headerRowClassName: PropTypes.string,
    hideHeaderRow: PropTypes.bool,
    rowProps: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    const {columns, defaultSort} = props;

    const sortColumn = columns.find(({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });

    this.state = {sortColumn, sortOrder: SORT_ORDER.asc};
    this.defaultCell = FlexTableCell;
    this.defaultRow = FlexTableRow;
    this.defaultHeader = FlexTableHeader;
  }

  sortedRows = data => {
    const {sortColumn, sortOrder} = this.state;
    if (sortOrder === SORT_ORDER.none) return this.rows(data);
    const sortedData = sortBy(data, datum => {
      const rankFunction = sortColumn.sortBy || (i => i);
      return rankFunction(datum[sortColumn.attribute]);
    });

    if (sortOrder === SORT_ORDER.desc) sortedData.reverse();

    return this.rows(sortedData);
  };

  render() {
    const {sortColumn} = this.state;
    let {bodyRowClassName, columns, CustomRow, data, defaultSort, headerRowClassName, hideHeaderRow, rowProps, plugins, ...props} = this.props;
    props = mergeProps(props, {className: ['table', 'table-sortable', 'table-data']});

    let header;
    if (!hideHeaderRow) {
      header = (
        <div className={classnames('tr', 'grid', headerRowClassName)}>
          {this.renderHeaders()}
        </div>
      );
    }

    const rows = sortColumn ? this.sortedRows(data) : this.rows(data);

    return (<div {...props}>
      {header}
      {rows}
    </div>);
  }
}