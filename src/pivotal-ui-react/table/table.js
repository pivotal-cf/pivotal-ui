import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import Pluggable from './pluggable';
import {newTableRow} from './table-row';
import {newTableHeader} from './table-header';
import {FixedWidthColumns} from './plugins/fixed-width-columns';
import {Flexible} from './plugins/flexible';
import {Sortable} from './plugins/sortable';

export {FixedWidthColumns, Flexible, Sortable};

export function newTable(...plugins) {
  const reversedPlugins = [...plugins].reverse();
  const TableHeader = newTableHeader(...plugins);
  const TableRow = newTableRow(...plugins);

  return class extends React.Component {
    static propTypes = {
      columns: PropTypes.array.isRequired,
      data: PropTypes.array.isRequired
    };

    render() {
      const {columns, data} = this.props;

      const Table = reversedPlugins.find(plugin => plugin.TableElement).TableElement;
      const Thead = reversedPlugins.find(plugin => plugin.TableHeadElement).TableHeadElement;
      const Tbody = reversedPlugins.find(plugin => plugin.TableBodyElement).TableBodyElement;
      const Tr = reversedPlugins.find(plugin => plugin.TableRowElement).TableRowElement;

      const headers = columns.map((column, key) =>
        <TableHeader {...{column, key}}/>);

      const rows = data.map((rowDatum, key) =>
        <TableRow {...{columns, rowDatum, key}}/>);

      return (
        <Pluggable {...{type: 'table', plugins}}>
          <Table>
            <Thead>
            <Pluggable {...{type: 'tableRow', plugins}}>
              <Tr>{headers}</Tr>
            </Pluggable>
            </Thead>
            <Pluggable {...{type: 'tableBody', plugins}}>
              <Tbody>{rows}</Tbody>
            </Pluggable>
          </Table>
        </Pluggable>
      );
    }
  };
}

export const Table = newTable();