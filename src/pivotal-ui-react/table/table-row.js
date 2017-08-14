import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import {TableCell} from './table-cell';

export class TableRow extends React.Component {
  static propTypes = {
    defaultRow: PropTypes.node,
    defaultCell: PropTypes.node,
    bodyRowClassName: PropTypes.node,
    columns: PropTypes.array,
    CustomRow: PropTypes.func,
    rowDatum: PropTypes.object,
    rowIndex: PropTypes.number,
    rowProps: PropTypes.object,
    plugins: PropTypes.array
  };

  emit({event, opts = {}, initial}) {
    return this.props.plugins.reduce((memo, plugin) => plugin[event]
      ? plugin[event]({...opts, memo})
      : memo, initial);
  }

  cell = (rowDatum, rowKey) => (column, key) => {
    const {defaultCell, plugins} = this.props;
    return <TableCell {...{
      defaultCell,
      rowDatum,
      rowKey,
      column,
      key,
      colIndex: key,
      plugins
    }}/>;
  };

  render() {
    const {defaultRow, bodyRowClassName, columns, CustomRow, rowDatum, rowIndex} = this.props;

    const Row = CustomRow || this.emit({event: 'tableRowElement', initial: defaultRow});

    const baseRowProps = this.props.rowProps || {};
    const rowProps = this.emit({
      event: 'beforeRenderTableRow',
      opts: {rowDatum},
      initial: {
        ...baseRowProps,
        rowIndex,
        className: classnames(baseRowProps.className, bodyRowClassName)
      }
    });

    delete rowProps.rowIndex;

    return (<Row {...rowProps}>{columns.map(this.cell(rowDatum, rowIndex))}</Row>);
  }
}