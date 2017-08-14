import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import {emit} from './event-emitter';
import {TableRow} from './table-row';
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

  static defaultProps = {plugins: [FixedWidthColumns, Sortable]};

  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.defaultCell = 'td';
    this.defaultRow = 'tr';

    emit(this, {event: 'tableConstructor', opts: {props}});
  }

  componentWillReceiveProps(props) {
    emit(this, {event: 'tableWillReceiveProps', opts: {props}});
  }

  rows = data => data.map((rowDatum, key) => {
    const {defaultRow, defaultCell} = this;
    const {bodyRowClassName, columns, CustomRow, rowProps, plugins} = this.props;
    return <TableRow {...{defaultRow, defaultCell, bodyRowClassName, columns,
      CustomRow, rowDatum, key, rowIndex: key, rowProps, plugins
    }}/>;
  });

  renderHeaders = () => this.props.columns.map((column, index) => {
    const {attribute, displayName, className} = column;

    const baseHeaderProps = column.headerProps || {};
    const headerProps = emit(this, {
      event: 'beforeRenderTableHeader',
      opts: {column, index},
      initial: {
        ...baseHeaderProps,
        className: classnames(baseHeaderProps.className, className),
        key: index
      }
    });

    const icon = emit(this, {event: 'headerIcon', opts: {column}});

    const Header = emit(this, {event: 'tableHeaderElement', initial: 'th'});
    return (<Header {...headerProps}>
      <div>{displayName || attribute}{icon}</div>
    </Header>);
  });

  render() {
    const {bodyRowClassName, columns, CustomRow, data: initialData, headerRowClassName, hideHeaderRow, rowProps, plugins, ...baseProps} = this.props;

    const data = emit(this, {event: 'beforeRenderRows', initial: initialData});
    const rows = this.rows(data);

    const TableElement = emit(this, {event: 'tableElement', initial: 'table'});
    const TableHeadElement = emit(this, {event: 'tableHeadElement', initial: 'thead'});
    const TableBodyElement = emit(this, {event: 'tableBodyElement', initial: 'tbody'});
    const TableRowElement = emit(this, {event: 'tableRowElement', initial: 'tr'});

    const props = emit(this, {event: 'beforeRenderTable', initial: mergeProps(baseProps, {className: ['table', 'table-data']})});
    const theadProps = emit(this, {event: 'beforeRenderTableHead', initial: {}});
    const trProps = emit(this, {event: 'beforeRenderTableRow', initial: {className: headerRowClassName}});
    const tbodyProps = emit(this, {event: 'beforeRenderTableBody', initial: {}});

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