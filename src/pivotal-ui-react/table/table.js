import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import Plugins, {useLast} from './plugins';
import {newTableRow} from './table-row';
import {newTableHeader} from './table-header';
import {FixedWidthColumns} from './plugins/fixed-width-columns';
import {Flexible} from './plugins/flexible';
import {Sortable} from './plugins/sortable';

export {FixedWidthColumns, Flexible, Sortable};

export function newTable(...plugins) {
  const reversedPlugins = [{
    Table: function ({id, style, children, className}) {
      return <table {...{id, style, children, className}}/>;
    },
    Thead: 'thead',
    Tbody: 'tbody',
    Tr: 'tr'
  }, ...plugins].reverse();
  const TableHeader = newTableHeader(...plugins);
  const TableRow = newTableRow(...plugins);

  return class Table extends React.Component {
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
        <Plugins {...{type: 'table', reversedPlugins}}>
          <Table {...{className: 'table', columns}}>
            <Plugins {...{type: 'thead', reversedPlugins}}>
              <Thead>
              <Plugins {...{type: 'tr', reversedPlugins}}>
                <Tr>{headers}</Tr>
              </Plugins>
              </Thead>
            </Plugins>
            <Plugins {...{type: 'tbody', reversedPlugins}}>
              <Tbody>{rows}</Tbody>
            </Plugins>
          </Table>
        </Plugins>
      );
    }
  };
}

export const Table = newTable();