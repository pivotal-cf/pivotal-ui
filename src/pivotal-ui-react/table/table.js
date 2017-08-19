import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import Pluggable, {useLast} from './pluggable';
import {newTableRow} from './table-row';
import {newTableHeader} from './table-header';
import {FixedWidthColumns} from './plugins/fixed-width-columns';
import {Flexible} from './plugins/flexible';
import {Sortable} from './plugins/sortable';

export {FixedWidthColumns, Flexible, Sortable};

export function newTable(...plugins) {
  const reversedPlugins = [{
    Table: 'table',
    Thead: 'thead',
    Tbody: 'tbody',
    Tr: 'tr'
  }, ...plugins].reverse();
  const TableHeader = newTableHeader(...plugins);
  const TableRow = newTableRow(...plugins);

  return class extends React.Component {
    static propTypes = {
      columns: PropTypes.array.isRequired,
      data: PropTypes.array.isRequired
    };

    render() {
      const {columns, data} = this.props;

      const Table = useLast({reversedPlugins, type: 'Table'});
      const Thead = useLast({reversedPlugins, type: 'Thead'});
      const Tbody = useLast({reversedPlugins, type: 'Tbody'});
      const Tr = useLast({reversedPlugins, type: 'Tr'});

      const headers = columns.map((column, key) =>
        <TableHeader {...{column, key}}/>);

      const rows = data.map((rowDatum, key) =>
        <TableRow {...{columns, rowDatum, key}}/>);

      return (
        <Pluggable {...{type: 'table', plugins}}>
          <Table {...{className: 'table'}}>
            <Pluggable {...{type: 'thead', plugins}}>
              <Thead>
              <Pluggable {...{type: 'tr', plugins}}>
                <Tr>{headers}</Tr>
              </Pluggable>
              </Thead>
            </Pluggable>
            <Pluggable {...{type: 'tbody', plugins}}>
              <Tbody>{rows}</Tbody>
            </Pluggable>
          </Table>
        </Pluggable>
      );
    }
  };
}

export const Table = newTable();