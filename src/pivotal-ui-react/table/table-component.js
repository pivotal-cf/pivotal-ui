import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';

import {FixedWidthColumns} from './plugins/fixed-width-columns';
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

  rows = data => {
    const {bodyRowClassName, columns, CustomRow} = this.props;

    return data.map((rowDatum, rowKey) => {
      const cells = columns.map((opts, key) => {
        const {attribute, CustomCell} = opts;
        const Cell = CustomCell || this.emit({event: 'tableCellElement', initial: this.defaultCell});

        const cellProps = this.emit({
          event: 'beforeRenderTableCell',
          initial: {
            ...opts,
            key,
            index: rowKey,
            colIndex: key,
            value: rowDatum[attribute],
            rowDatum,
            className: classnames(opts.className, opts.cellClass),
          }
        });

        ['attribute', 'cellClass', 'colIndex', 'displayName', 'index', 'headerProps', 'rowDatum', 'sortable', 'sortBy']
          .forEach(prop => delete cellProps[prop]);

        return (<Cell {...cellProps}>{rowDatum[attribute]}</Cell>);
      });

      const Row = CustomRow || this.emit({event: 'tableRowElement', initial: this.defaultRow});

      const baseRowProps = this.props.rowProps || {};
      const rowProps = this.emit({
        event: 'beforeRenderTableRow',
        opts: {rowDatum},
        initial: {
          ...baseRowProps,
          key: rowKey,
          className: classnames(baseRowProps.className, bodyRowClassName)
        }
      });

      ['cellClass'].forEach(prop => delete rowProps[prop]);

      return (<Row {...rowProps}>{cells}</Row>);
    });
  };

  renderHeaders = () => {
    return this.props.columns.map((column, index) => {
      let {attribute, displayName, cellClass, headerProps = {}} = column;

      const className = classnames(headerProps.className, cellClass);

      headerProps = this.emit({
        event: 'beforeRenderTableHeader',
        opts: {column, headerProps, index},
        initial: {className, ...headerProps, key: index}
      });

      const icon = this.emit({event: 'headerIcon', opts: {column}});

      const Header = this.emit({event: 'tableHeaderElement', initial: 'th'});
      return (<Header {...headerProps}>
        <div>{displayName || attribute}{icon}</div>
      </Header>);
    });
  };

  render() {
    let {bodyRowClassName, columns, CustomRow, data, headerRowClassName, hideHeaderRow, rowProps, plugins, ...props} = this.props;
    props = mergeProps(props, {className: ['table', 'table-data']});

    data = this.emit({event: 'beforeRenderRows', initial: data});
    const rows = this.rows(data);

    const TableElement = this.emit({event: 'tableElement', initial: 'table'});
    const TableHeadElement = this.emit({event: 'tableHeadElement', initial: 'thead'});
    const TableBodyElement = this.emit({event: 'tableBodyElement', initial: 'tbody'});
    const TableRowElement = this.emit({event: 'tableRowElement', initial: 'tr'});

    props = this.emit({event: 'beforeRenderTable', initial: props});
    const theadProps = this.emit({event: 'beforeRenderTableHead', initial: {}});
    const trProps = this.emit({event: 'beforeRenderTableRow', initial: {className: headerRowClassName}});
    const tbodyProps = this.emit({event: 'beforeRenderTableBody', initial: {}});

    let header;
    if (!hideHeaderRow) {
      header = (
        <TableHeadElement {...theadProps}>
          <TableRowElement {...trProps}>
            {this.renderHeaders()}
          </TableRowElement>
        </TableHeadElement>
      );
    }

    return (<TableElement {...props}>
      {header}
      <TableBodyElement {...tbodyProps}>
      {rows}
      </TableBodyElement>
    </TableElement>);
  }
}