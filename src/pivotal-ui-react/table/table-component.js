import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import sortBy from 'lodash.sortby';

import {TableHeader} from './table-header';
import {TableCell} from './table-cell';
import {TableRow} from './table-row';

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

export class Table extends React.Component {
  static propTypes = {
    bodyRowClassName: PropTypes.string,
    columns: PropTypes.array.isRequired,
    CustomRow: PropTypes.func,
    data: PropTypes.array.isRequired,
    defaultSort: PropTypes.string,
    rowProps: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    const {columns, defaultSort} = props;

    const sortColumn = columns.find(({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });
    this.state = {sortColumn, sortOrder: SORT_ORDER.asc};
    this.defaultCell = TableCell;
    this.defaultRow = TableRow;
    this.defaultHeader = TableHeader;
  }

  componentWillReceiveProps({columns, defaultSort}) {
    if (columns) {
      const sortColumn = columns.find(({sortable, attribute}) => {
        return defaultSort ? attribute === defaultSort : sortable;
      });
      this.setState({sortColumn, sortOrder: SORT_ORDER.asc});
    }
  }

  updateSort = (sortColumn, isSortColumn) => {
    if (isSortColumn) {
      return this.setState({sortOrder: ++this.state.sortOrder % Object.keys(SORT_ORDER).length});
    }

    this.setState({sortColumn, sortOrder: SORT_ORDER.asc});
  };

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

  rows = data => {
    const {bodyRowClassName, columns, CustomRow, rowProps} = this.props;

    return data.map((rowDatum, rowKey) => {
      const cells = columns.map((opts, key) => {
        const {attribute, CustomCell, width} = opts;
        let style, {cellClass} = opts;
        if (width) {
          style = {width};
          opts.cellClass = classnames(cellClass, 'col-fixed');
        }
        const Cell = CustomCell || this.defaultCell;
        const cellProps = {
          key,
          index: rowKey,
          colIndex: key,
          value: rowDatum[attribute],
          rowDatum,
          style,
          ...opts
        };
        return (<Cell {...cellProps}>{rowDatum[attribute]}</Cell>);
      });

      const Row = CustomRow || this.defaultRow;
      return (<Row key={rowKey} index={rowKey} {...{
        key: rowKey,
        index: rowKey,
        className: bodyRowClassName,
        rowDatum,
        ...rowProps
      }}
      >{cells}</Row>);
    });
  };

  renderHeaders = () => {
    const {sortColumn, sortOrder} = this.state;
    return this.props.columns.map((column, index) => {
      let {attribute, sortable, displayName, cellClass, headerProps = {}, width} = column;
      const isSortColumn = column === sortColumn;
      let className, icon;
      if (isSortColumn) {
        className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
        icon = [<Icon verticalAlign="baseline" src="arrow_drop_up"/>,
          <Icon verticalAlign="baseline" src="arrow_drop_down"/>, null][sortOrder];
      }

      className = classnames(className, headerProps.className, cellClass);

      headerProps = {
        ...headerProps,
        className,
        sortable,
        key: index,
        onSortableTableHeaderClick: () => this.updateSort(column, isSortColumn)
      };

      if (width) {
        headerProps = {
          ...headerProps,
          className: classnames(className, 'col-fixed'),
          style: {width}
        };
      }

      const Header = this.defaultHeader;
      return (<Header {...headerProps}>
        <div>{displayName || attribute}{icon}</div>
      </Header>);
    });
  };

  render() {
    const {sortColumn} = this.state;
    let {columns, CustomRow, data, defaultSort, ...props} = this.props;
    props = mergeProps(props, {className: ['table', 'table-sortable', 'table-data']});

    const rows = sortColumn ? this.sortedRows(data) : this.rows(data);

    return (<table {...props}>
      <thead>
      <tr>{this.renderHeaders()}</tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>);
  }
}