import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';
import Pluggable from './pluggable';

import {TableCell} from './table-cell';

export function TableRow(...plugins) {
  const reversedPlugins = [...plugins].reverse();
  const FooTableCell = TableCell(...plugins);

  return class extends React.Component {
    static propTypes = {
      bodyRowClassName: PropTypes.node,
      columns: PropTypes.array,
      rowDatum: PropTypes.object,
      rowIndex: PropTypes.number,
    };

    cell = (rowDatum, rowKey) => (column, key) => {
      return <FooTableCell {...{
        rowDatum,
        rowKey,
        column,
        key,
        colIndex: key,
      }}/>;
    };

    render() {
      const {defaultRow, bodyRowClassName, columns, CustomRow, rowDatum, rowIndex} = this.props;

      const Tr = reversedPlugins.find(plugin => plugin.TableRowElement).TableRowElement;
      return (
        <Pluggable type="tableRow" {...{plugins}}>
          <Tr>{columns.map(this.cell(rowDatum, rowIndex))}</Tr>
        </Pluggable>
      );
    }
  }
}