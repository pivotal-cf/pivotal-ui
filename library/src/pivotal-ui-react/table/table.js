const classnames = require('classnames');
const {Icon} = require('pui-react-iconography');
const React = require('react');
const sortBy = require('lodash.sortby');
const {mergeProps} = require('pui-react-helpers');
require('pui-css-tables');

const types = React.PropTypes;

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

export class TableHeader extends React.Component {
  static propTypes = {
    onClick: types.func,
    onSortableTableHeaderClick: types.func,
    sortable: types.bool
  };

  handleActivate = (event) => {
    const {sortable, onClick, onSortableTableHeaderClick} = this.props;
    if (sortable) onSortableTableHeaderClick(event);
    if (onClick) onClick(event);
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleActivate(event);
    }
  };

  render() {
    const {onSortableTableHeaderClick, sortable, ...others} = this.props;
    const props = mergeProps(others, {className: {'sortable': sortable}});

    const thProps = {...props, tabIndex: 0, disabled: !sortable};
    if (sortable) {
      return <th {...thProps} onClick={this.handleActivate} onKeyDown={this.handleKeyDown} role="button"/>;
    } else {
      return <th {...thProps}/>;
    }
  }
}

export const TableCell = ({rowDatum, index, ...props}) => <td {...props}/>;

TableCell.propTypes = {
  index: types.number,
  rowDatum: types.any
};

export const TableRow = ({index, ...props}) => <tr {...props}/>;

TableRow.propTypes = {
  index: types.number
};

export class Table extends React.Component {
  static propTypes = {
    columns: types.array.isRequired,
    CustomRow: types.func,
    data: types.array.isRequired,
    defaultSort: types.string
  };

  constructor(props, context) {
    super(props, context);
    const {columns, defaultSort} = props;

    const sortColumn = columns.find(({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });
    this.state = {sortColumn, sortOrder: SORT_ORDER.asc};
  }

  componentWillReceiveProps({columns, defaultSort}) {
    if (columns) {
      const sortColumn = columns.find(({sortable, attribute}) => {
        return defaultSort ? attribute === defaultSort : sortable;
      });
      this.setState({sortColumn, sortOrder: SORT_ORDER.asc});
    }
  }

  updateSort(sortColumn, isSortColumn) {
    if (isSortColumn) {
      return this.setState({sortOrder: ++this.state.sortOrder % Object.keys(SORT_ORDER).length});
    }

    this.setState({sortColumn, sortOrder: SORT_ORDER.asc});
  }

  sortedRows(data) {
    const {sortColumn, sortOrder} = this.state;
    if (sortOrder === SORT_ORDER.none) return this.rows(data);
    const sortedData = sortBy(data, datum => {
      const rankFunction = sortColumn.sortBy || (i => i);
      return rankFunction(datum[sortColumn.attribute]);
    });

    if (sortOrder === SORT_ORDER.desc) sortedData.reverse();

    return this.rows(sortedData);
  }

  rows(data) {
    const {columns, CustomRow} = this.props;

    return data.map((datum, rowKey) => {
      const cells = columns.map(({attribute, CustomCell}, key) => {
        const Cell = CustomCell || TableCell;
        return <Cell key={key} index={rowKey} value={datum[attribute]} rowDatum={datum}>{datum[attribute]}</Cell>;
      });

      const Row = CustomRow || TableRow;
      return <Row key={rowKey} index={rowKey}>{cells}</Row>;
    });
  }

  renderHeaders() {
    const {sortColumn, sortOrder} = this.state;
    return this.props.columns.map((column, index) => {
      let {attribute, sortable, displayName, headerProps = {}} = column;
      const isSortColumn = column === sortColumn;
      let className, icon;
      if (isSortColumn) {
        className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
        icon = [<Icon src="arrow_drop_up"/>, <Icon src="arrow_drop_down"/>, null][sortOrder];
      }

      className = classnames(className, headerProps.className);

      headerProps = {
        ...headerProps,
        className,
        sortable,
        key: index,
        onSortableTableHeaderClick: () => this.updateSort(column, isSortColumn)
      };

      return <TableHeader {...headerProps}>{displayName || attribute}{icon}</TableHeader>;
    });
  }

  render() {
    const {sortColumn} = this.state;
    let {columns, CustomRow, data, defaultSort, ...props} = this.props;
    props = mergeProps(props, {className: ['table', 'table-sortable', 'table-data']});

    const rows = sortColumn ? this.sortedRows(data) : this.rows(data);

    return (
      <table {...props}>
        <thead>
        <tr>{this.renderHeaders()}</tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}
