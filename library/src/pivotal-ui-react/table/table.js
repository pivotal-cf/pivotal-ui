import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import React from 'react';
import sortBy from 'lodash.sortby';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-tables';

const types = React.PropTypes;

const SORT_ORDER = {
  asc: 0,
  desc: 1,
  none: 2
};

class TableHeader extends React.Component {
  static propTypes = {
    onClick: types.func,
    onSortableTableHeaderClick: types.func,
    sortable: types.bool
  }

  handleActivate = event => {
    const {sortable, onClick, onSortableTableHeaderClick} = this.props;
    if (sortable) onSortableTableHeaderClick(event);
    if (onClick) onClick(event);
  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleActivate(event);
    }
  }

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

export class TableCell extends React.Component {
	static propTypes = {
		index: types.number,
		rowDatum: types.any
	}

	render() {
		let {children, index, rowDatum, ...others} = this.props

		return (<td {...others}>
			{children}
		</td>)
	}
}

export class TableRow extends React.Component {
	static propTypes = {
		index: types.number
	}

	render() {
		let {children, index, ...others} = this.props

		return (<tr {...others}>
			{children}
		</tr>)
	}
}

export class Table extends React.Component {
  static propTypes = {
    columns: types.array.isRequired,
    CustomRow: types.func,
    data: types.array.isRequired,
    defaultSort: types.string
  }

  constructor(props, context) {
    super(props, context);
    const {columns, defaultSort} = props;

    const sortColumn = columns.find(({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });
    this.state = {sortColumn, sortOrder: SORT_ORDER.asc};
    this.defaultCell = TableCell
    this.defaultRow = TableRow
    this.defaultHeader = TableHeader
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
  }

  rows = data => {
    const {bodyRowClassName, columns, CustomRow, rowProps} = this.props;

    return data.map((datum, rowKey) => {
      const cells = columns.map(({attribute, CustomCell, cellClass, width}, key) => {
        let style;
        if (width) {
          cellClass = classnames(cellClass, 'col-fixed');
          style = {width};
        }
        const Cell = CustomCell || this.defaultCell;
        return <Cell key={key} index={rowKey} value={datum[attribute]} className={cellClass} rowDatum={datum} style={style}>{datum[attribute]}</Cell>;
      });

      const Row = CustomRow || this.defaultRow;
      return <Row {...{
        key: rowKey,
        index: rowKey,
        className: bodyRowClassName,
        ...rowProps
      }}>{cells}</Row>;
    });
  }

  renderHeaders = () => {
    const {sortColumn, sortOrder} = this.state;
    return this.props.columns.map((column, index) => {
      let {attribute, sortable, displayName, cellClass, width, headerProps = {}} = column;
      const isSortColumn = column === sortColumn;
      let className, icon;
      if (isSortColumn) {
        className = ['sorted-asc', 'sorted-desc', ''][sortOrder];
        icon = [<Icon verticalAlign='baseline' src="arrow_drop_up"/>, <Icon verticalAlign='baseline' src="arrow_drop_down"/>, null][sortOrder];
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
        }
      }

			const Header = this.defaultHeader
      return <Header {...headerProps}><div>{displayName || attribute}{icon}</div></Header>;
    });
  }

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

// FlexTable
class FlexTableHeader extends TableHeader {
  static propTypes = {
    onClick: types.func,
    onSortableTableHeaderClick: types.func,
    sortable: types.bool
  }

  render() {
    const {onSortableTableHeaderClick, sortable, className, ...others} = this.props;
    const classes = classnames('th', 'col', className, {'sortable': sortable})
    const props = mergeProps(others, { className: classes });

    const thProps = {...props, tabIndex: 0, disabled: !sortable};
    if (sortable) {
      return <div {...thProps} onClick={this.handleActivate} onKeyDown={this.handleKeyDown} role="button"/>;
    } else {
      return <div {...thProps}/>;
    }
  }
}


export class FlexTableCell extends React.Component {
	static propTypes = {
		index: types.number,
		rowDatum: types.any
	}

	render() {
		let {children, index, rowDatum, className, ...others} = this.props
		const classes = classnames(className, 'td', 'col')
		const props = mergeProps(others, {className: classes})

		return (<div {...props}>
			{children}
		</div>)
	}
}

export class FlexTableRow extends React.Component {
	static propTypes = {
		index: types.number
	}

	render() {
		let {children, index, className, ...others} = this.props
  	const classes = classnames(className, 'tr', 'grid')
  	const props = mergeProps(others, {className: classes})

		return (<div {...props}>
			{children}
		</div>)
	}
}

export class FlexTable extends Table {
  static propTypes = {
    bodyRowClassName: types.string,
    columns: types.array.isRequired,
    CustomRow: types.func,
    data: types.array.isRequired,
    defaultSort: types.string,
    cellClass: types.string,
    headerRowClassName: types.string,
    hideHeaderRow: types.bool,
    rowProps: types.object
  }

  constructor(props, context) {
    super(props, context);
    const {columns, defaultSort} = props;

    const sortColumn = columns.find(({sortable, attribute}) => {
      return defaultSort ? attribute === defaultSort : sortable;
    });

    this.state = {sortColumn, sortOrder: SORT_ORDER.asc};
    this.defaultCell = FlexTableCell
    this.defaultRow = FlexTableRow
    this.defaultHeader = FlexTableHeader
  }

  render() {
    const {sortColumn} = this.state;
    let {
      bodyRowClassName,
      columns,
      CustomRow,
      data,
      defaultSort,
      headerRowClassName,
      hideHeaderRow,
      rowProps,
      ...props
    } = this.props;
    props = mergeProps(props, {className: ['table', 'table-sortable', 'table-data']});

    const rows = sortColumn ? this.sortedRows(data) : this.rows(data);

    let header;
    if (!hideHeaderRow) {
      header = (
        <div className={classnames('tr', 'grid', headerRowClassName)}>
          {this.renderHeaders()}
        </div>
      );
    }

    return (<div {...props}>
      {header}
      {rows}
    </div>);
  }
}
