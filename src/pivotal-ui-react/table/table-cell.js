import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import {emit} from './event-emitter';

export class TableCell extends React.Component {
  static propTypes = {
    defaultCell: PropTypes.node,
    rowDatum: PropTypes.object,
    rowKey: PropTypes.number,
    column: PropTypes.object,
    colIndex: PropTypes.number,
    plugins: PropTypes.array
  };

  render() {
    const {defaultCell, rowDatum, rowKey, column, colIndex} = this.props;

    const {attribute, CustomCell} = column;
    const Cell = CustomCell || emit(this, {
      event: 'tableCellElement',
      initial: defaultCell
    });

    const cellProps = emit(this, {
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