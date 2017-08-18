import PropTypes from 'prop-types';
import React from 'react';

import Pluggable, {useLast} from './pluggable';
import {newTableCell} from './table-cell';

export function newTableRow(...plugins) {
  const reversedPlugins = [{TableRowElement: 'tr'}, ...plugins].reverse();
  const TableCell = newTableCell(...plugins);

  return class extends React.Component {
    static propTypes = {
      columns: PropTypes.array,
      rowDatum: PropTypes.object
    };

    render() {
      const {columns, rowDatum} = this.props;

      const Tr = useLast({reversedPlugins, type: 'TableRowElement'});

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