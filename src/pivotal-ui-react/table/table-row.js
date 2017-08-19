import PropTypes from 'prop-types';
import React from 'react';

import Pluggable, {useLast} from './pluggable';
import {newTableCell} from './table-cell';

export function newTableRow(...plugins) {
  const reversedPlugins = [{Tr: 'tr'}, ...plugins].reverse();
  const TableCell = newTableCell(...plugins);

  return class TableRow extends React.Component {
    static propTypes = {
      columns: PropTypes.array,
      rowDatum: PropTypes.object
    };

    render() {
      const {columns, rowDatum} = this.props;

      const Tr = useLast({reversedPlugins, type: 'Tr'});

      return (
        <Pluggable {...{type: 'tr', plugins}}>
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
  };
}