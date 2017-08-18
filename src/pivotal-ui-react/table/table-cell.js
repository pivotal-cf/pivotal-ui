import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';
import flow from 'lodash.flow'
import Pluggable from './pluggable';

export function TableCell(...plugins) {
  const reversedPlugins = [...plugins].reverse();

  return class extends React.Component {
    static propTypes = {
      defaultCell: PropTypes.node,
      rowDatum: PropTypes.object,
      rowKey: PropTypes.number,
      column: PropTypes.object,
      colIndex: PropTypes.number,
      plugins: PropTypes.array
    };

    render() {
      const {className, rowDatum, column} = this.props;

      const {attribute} = column;
      const Td = reversedPlugins.find(plugin => plugin.TableCellElement).TableCellElement;
      return (
        <Pluggable type="tableCell" {...{plugins}}>
          <Td {...{className, column}}>{rowDatum[attribute]}</Td>
        </Pluggable>
      );
    }
  }
}