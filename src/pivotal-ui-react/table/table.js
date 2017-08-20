import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import {FixedWidthColumns} from './plugins/fixed-width-columns';
import {Flexible} from './plugins/flexible';
import {Sortable} from './plugins/sortable';
import {mergeProps} from 'pui-react-helpers';

export {FixedWidthColumns, Flexible, Sortable};

export class TablePlugin extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    Table: PropTypes.string.isRequired,
    Thead: PropTypes.string.isRequired,
    Tbody: PropTypes.string.isRequired,
    Tr: PropTypes.string.isRequired,
    Th: PropTypes.string.isRequired,
    Td: PropTypes.string.isRequired,
    table: PropTypes.func.isRequired,
    thead: PropTypes.func.isRequired,
    tbody: PropTypes.func.isRequired,
    tr: PropTypes.func.isRequired,
    th: PropTypes.func.isRequired,
    td: PropTypes.func.isRequired
  };

  static defaultProps = {
    table: () => ({}),
    thead: () => ({}),
    tbody: () => ({}),
    tr: () => ({}),
    th: () => ({}),
    td: () => ({})
  };

  table(props) {
    return mergeProps(this.props.table(), props);
  }

  thead(props) {
    return mergeProps(this.props.thead(), props);
  }

  tbody(props) {
    return mergeProps(this.props.tbody(), props);
  }

  tr(props) {
    return mergeProps(this.props.tr(), props);
  }

  th(props) {
    return mergeProps(this.props.th(), props);
  }

  td(props) {
    return mergeProps(this.props.td(), props);
  }
}

export class Table extends TablePlugin {
  static defaultProps = {
    ...TablePlugin.defaultProps,
    Table: 'table',
    Thead: 'thead',
    Tbody: 'tbody',
    Tr: 'tr',
    Th: 'th',
    Td: 'td'
  };

  render() {
    const {columns, data, Table, Thead, Tbody, Tr, Th, Td, thead, tbody, tr, th, td} = this.props;

    const headers = columns.map(({attribute, displayName}, key) =>
      <Th {...{key, ...th()}}>{displayName || attribute}</Th>);

    const headerRow = <Tr {...tr()}>{headers}</Tr>;

    const cols = rowDatum => columns.map(({attribute}, key) =>
      <Td {...{key, ...td()}}>{rowDatum[attribute]}</Td>);

    const bodyRows = data.map((rowDatum, key) =>
      <Tr {...{key, ...tr()}}>{cols(rowDatum)}</Tr>);

    return (
      <Table {...this.table({className: 'table'})}>
        <Thead {...thead()}>{headerRow}</Thead>
        <Tbody {...tbody()}>{bodyRows}</Tbody>
      </Table>
    );
  }
}

export function withFlex(Table) {
  return class TableWithFlex extends TablePlugin {
    static defaultProps = {
      ...TablePlugin.defaultProps,
      Table: 'div',
      Thead: 'div',
      Tbody: 'div',
      Tr: 'div',
      Th: 'div',
      Td: 'div'
    };

    render() {
      return (
        <Table {...this.props} {...{
          thead: () => this.thead({className: 'thead'}),
          tbody: () => this.tbody({className: 'tbody'}),
          tr: () => this.tr({className: 'tr grid'}),
          th: () => this.th({className: 'th col'}),
          td: () => this.td({className: 'td col'})
        }}/>
      );
    }
  }
}

export function withFixedWithColumns(Table) {
  return class TableWithFixedWidthColumns extends React.Component {
    render() {
      return null;
    }
  }
}