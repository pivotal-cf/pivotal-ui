import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';
import Pluggable from './pluggable';

import {TableRow} from './table-row';
import {TableHeader} from './table-header';
import {FixedWidthColumns} from './plugins/fixed-width-columns';
import {Flexible} from './plugins/flexible';
import {Sortable} from './plugins/sortable';

function composeTable(...plugins) {
  const reversedPlugins = [...plugins].reverse();
  const FooTableHeader = TableHeader(...plugins);
  const FooTableRow = TableRow(...plugins);

  return class extends React.Component {
    static propTypes = {
      bodyRowClassName: PropTypes.string,
      columns: PropTypes.array.isRequired,
      CustomRow: PropTypes.func,
      data: PropTypes.array.isRequired,
      defaultSort: PropTypes.string,
      rowProps: PropTypes.object
    };

    constructor(props, context) {
      super(props, context);

      this.state = {};
    }

    rows = data => data.map((rowDatum, key) => {
      const {bodyRowClassName, columns} = this.props;
      return <FooTableRow {...{bodyRowClassName, columns, rowDatum, key, rowIndex: key}}/>;
    });

    render() {
      const {data} = this.props;

      const Thead = reversedPlugins.find(plugin => plugin.TableHeadElement).TableHeadElement;

      const Tr = reversedPlugins.find(plugin => plugin.TableRowElement).TableRowElement;
      const Tbody = reversedPlugins.find(plugin => plugin.TableBodyElement).TableBodyElement;
      const Table = reversedPlugins.find(plugin => plugin.TableElement).TableElement;
      return (
        <Pluggable type="table" {...{plugins}}>
          <Table>
            <Thead>
              <Pluggable type="tableRow" {...{plugins}}>
                <Tr>{this.props.columns.map((column, key) => (<FooTableHeader {...{column, key}}/>))}</Tr>
              </Pluggable>
            </Thead>
            <Pluggable type="tableBody" {...{plugins}}>
              <Tbody>{this.rows(data)}</Tbody>
            </Pluggable>
          </Table>
        </Pluggable>
      );
    }
  };
}

const FlexTable = composeTable(Flexible, FixedWidthColumns /*, Sortable*/);
export {FlexTable};

// export class FlexTable extends React.Component {
//   render() {
//     const plugins = [...Table.defaultProps.plugins, Flexible];
//     return <Table {...this.props} {...{plugins}}/>
//   }
// }