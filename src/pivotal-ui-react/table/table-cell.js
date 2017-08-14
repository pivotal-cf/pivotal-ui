import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import emit from './event-emitter';

export class TableCell extends React.Component {
  static propTypes = {
    defaultCell: PropTypes.node,
    rowDatum: PropTypes.object,
    rowKey: PropTypes.number,
    column: PropTypes.object,
    colIndex: PropTypes.number,
    plugins: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.emit = emit.bind(this);
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