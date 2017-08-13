import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

export class TableCell extends React.Component {
  static propTypes = {
    defaultCell: PropTypes.node,
    rowDatum: PropTypes.object,
    rowKey: PropTypes.number,
    column: PropTypes.object,
    colIndex: PropTypes.number,
    plugins: PropTypes.array
  };

  emit({event, opts = {}, initial}) {
    return this.props.plugins.reduce((memo, plugin) => plugin[event]
      ? plugin[event]({...opts, memo})
      : memo, initial);
  }

  render() {
    const {defaultCell, rowDatum, rowKey, column, colIndex} = this.props;

    const {attribute, CustomCell} = column;
    const Cell = CustomCell || this.emit({
      event: 'tableCellElement',
      initial: defaultCell
    });

    const cellProps = this.emit({
      event: 'beforeRenderTableCell',
      initial: {
        ...column,
        colIndex,
        rowKey,
        value: rowDatum[attribute],
        rowDatum
      }
    });

    ['attribute', 'colIndex', 'displayName', 'rowKey', 'headerProps', 'rowDatum']
      .forEach(prop => delete cellProps[prop]);

    return (<Cell {...cellProps}>{rowDatum[attribute]}</Cell>);
  }
}