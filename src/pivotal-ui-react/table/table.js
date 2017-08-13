import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import {FixedWidthColumns} from './plugins/fixed-width-columns';
import {Flexible} from './plugins/flexible';
import {Sortable} from './plugins/sortable';

export class Table extends React.Component {
  static propTypes = {
    bodyRowClassName: PropTypes.string,
    columns: PropTypes.array.isRequired,
    CustomRow: PropTypes.func,
    data: PropTypes.array.isRequired,
    defaultSort: PropTypes.string,
    rowProps: PropTypes.object,
    plugins: PropTypes.array
  };

  static defaultProps = {
    plugins: [FixedWidthColumns, Sortable]
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.defaultCell = 'td';
    this.defaultRow = 'tr';

    this.emit({event: 'constructor', opts: {props}});
  }

  componentWillReceiveProps(props) {
    this.emit({event: 'componentWillReceiveProps', opts: {props}});
  }

  emit({event, opts = {}, initial}) {
    return this.props.plugins.reduce((memo, plugin) => plugin[event]
      ? plugin[event]({...opts, memo, subject: this})
      : memo, initial);
  }

  cell = (rowDatum, rowKey) => (column, key) => {
    const {attribute, CustomCell} = column;
    const Cell = CustomCell || this.emit({event: 'tableCellElement', initial: this.defaultCell});

    const cellProps = this.emit({
      event: 'beforeRenderTableCell',
      initial: {
        ...column,
        key,
        rowKey,
        value: rowDatum[attribute],
        rowDatum
      }
    });

    ['attribute', 'displayName', 'rowKey', 'headerProps', 'rowDatum']
      .forEach(prop => delete cellProps[prop]);

    return (<Cell {...cellProps}>{rowDatum[attribute]}</Cell>);
  };

  row = (rowDatum, key) => {
    const {bodyRowClassName, columns, CustomRow} = this.props;

    const Row = CustomRow || this.emit({event: 'tableRowElement', initial: this.defaultRow});

    const baseRowProps = this.props.rowProps || {};
    const rowProps = this.emit({
      event: 'beforeRenderTableRow',
      opts: {rowDatum},
      initial: {
        ...baseRowProps,
        key: key,
        className: classnames(baseRowProps.className, bodyRowClassName)
      }
    });

    return (<Row {...rowProps}>{columns.map(this.cell(rowDatum, key))}</Row>);
  };

  rows = data => data.map(this.row);

  header = (column, index) => {
    const {attribute, displayName, className} = column;

    const baseHeaderProps = column.headerProps || {};
    const headerProps = this.emit({
      event: 'beforeRenderTableHeader',
      opts: {column, index},
      initial: {
        ...baseHeaderProps,
        className: classnames(baseHeaderProps.className, className),
        key: index
      }
    });

    const icon = this.emit({event: 'headerIcon', opts: {column}});

    const Header = this.emit({event: 'tableHeaderElement', initial: 'th'});
    return (<Header {...headerProps}>
      <div>{displayName || attribute}{icon}</div>
    </Header>);
  };

  renderHeaders = () => this.props.columns.map(this.header);

  render() {
    const {bodyRowClassName, columns, CustomRow, data: initialData, headerRowClassName, hideHeaderRow, rowProps, plugins, ...baseProps} = this.props;

    const data = this.emit({event: 'beforeRenderRows', initial: initialData});
    const rows = this.rows(data);

    const TableElement = this.emit({event: 'tableElement', initial: 'table'});
    const TableHeadElement = this.emit({event: 'tableHeadElement', initial: 'thead'});
    const TableBodyElement = this.emit({event: 'tableBodyElement', initial: 'tbody'});
    const TableRowElement = this.emit({event: 'tableRowElement', initial: 'tr'});

    const props = this.emit({event: 'beforeRenderTable', initial: mergeProps(baseProps, {className: ['table', 'table-data']})});
    const theadProps = this.emit({event: 'beforeRenderTableHead', initial: {}});
    const trProps = this.emit({event: 'beforeRenderTableRow', initial: {className: headerRowClassName}});
    const tbodyProps = this.emit({event: 'beforeRenderTableBody', initial: {}});

    const header = hideHeaderRow || (
      <TableHeadElement {...theadProps}>
        <TableRowElement {...trProps}>
          {this.renderHeaders()}
        </TableRowElement>
      </TableHeadElement>
    );

    return (<TableElement {...props}>
      {header}
      <TableBodyElement {...tbodyProps}>
        {rows}
      </TableBodyElement>
    </TableElement>);
  }
}

export class FlexTable extends React.Component {
  render() {
    const plugins = [...Table.defaultProps.plugins, Flexible];
    return <Table {...this.props} {...{plugins}}/>
  }
}