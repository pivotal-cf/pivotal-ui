import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';

import Pluggable from './pluggable';
import {newTableCell} from './table-cell';

export function newTableRow(...plugins) {
  const reversedPlugins = [...plugins].reverse();
  const TableCell = newTableCell(...plugins);

  return class extends React.Component {
    static propTypes = {
      columns: PropTypes.array,
      rowDatum: PropTypes.object
    };

    render() {
      const {columns, rowDatum} = this.props;

      const Tr = reversedPlugins.find(plugin => plugin.TableRowElement).TableRowElement;

      return (
        <Pluggable {...{type: 'tableRow', plugins}}>
          <Tr>
            {columns.map((column, key) => (
              <TableCell {...{
                rowDatum,
                column,
                key,
                colIndex: key,
              }}/>))}
          </Tr>
        </Pluggable>
      );
    }
  }
}