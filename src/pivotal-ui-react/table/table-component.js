import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';

import {TableHeader} from './table-header';
import {TableCell} from './table-cell';
import {TableRow} from './table-row';

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
    this.defaultCell = TableCell;
    this.defaultRow = TableRow;
    this.defaultHeader = TableHeader;

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
    const {bodyRowClassName, columns, CustomRow, rowProps} = this.props;

    return data.map((rowDatum, rowKey) => {
      const cells = columns.map((opts, key) => {
        const {attribute, CustomCell} = opts;
        const Cell = CustomCell || this.defaultCell;

        const cellProps = this.emit({
          event: 'beforeRenderCell',
          initial: {
            key,
            index: rowKey,
            colIndex: key,
            value: rowDatum[attribute],
            rowDatum,
            ...opts
          }
        });

        return (<Cell {...cellProps}>{rowDatum[attribute]}</Cell>);
      });

      const Row = CustomRow || this.defaultRow;
      return (<Row {...{
        key: rowKey,
        index: rowKey,
        className: bodyRowClassName,
        rowDatum,
        ...rowProps
      }}>{cells}</Row>);
    });
  };

  renderHeaders = () => {
    return this.props.columns.map((column, index) => {
      let {attribute, displayName, cellClass, headerProps = {}} = column;

      const className = classnames(headerProps.className, cellClass);

      headerProps = this.emit({
        event: 'beforeRenderHeaders',
        opts: {column, headerProps, index}, initial: {...headerProps, className}
      });

      const icon = this.emit({event: 'headerIcon', opts: {column}});

      const Header = this.defaultHeader;
      return (<Header {...headerProps}>
        <div>{displayName || attribute}{icon}</div>
      </Header>);
    });
  };

  render() {
    let {columns, CustomRow, data, defaultSort, plugins, ...props} = this.props;
    props = mergeProps(props, {className: ['table', 'table-sortable', 'table-data']});

    data = this.emit({event: 'beforeRenderRows', opts: {data}, initial: data});
    const rows = this.rows(data);

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