import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import Pluggable from './pluggable';

export function newTableCell(...plugins) {
  const reversedPlugins = [...plugins].reverse();

  return class extends React.Component {
    static propTypes = {
      column: PropTypes.object,
      rowDatum: PropTypes.object
    };

    render() {
      const {className, rowDatum, column} = this.props;
      const {attribute} = column;

      const Td = reversedPlugins.find(plugin => plugin.TableCellElement).TableCellElement;

      return (
        <Pluggable {...{type: 'tableCell', plugins}}>
          <Td {...{className, column}}>{rowDatum[attribute]}</Td>
        </Pluggable>
      );
    }
  }
}