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
    Table: 'table',
    Thead: 'thead',
    Tbody: 'tbody',
    Tr: 'tr',
    Th: 'th',
    Td: 'td',
    table: () => ({}),
    thead: () => ({}),
    tbody: () => ({}),
    tr: () => ({}),
    th: () => ({}),
    td: () => ({})
  };

  table(props = {}) {
    return mergeProps(this.props.table(), props);
  }

  thead(props = {}) {
    return mergeProps(this.props.thead(), props);
  }

  tbody(props = {}) {
    return mergeProps(this.props.tbody(), props);
  }

  tr(props = {}) {
    return mergeProps(this.props.tr(), props);
  }

  th(props = {}, rest = {}) {
    return mergeProps(this.props.th(rest), props);
  }

  td(props = {}, rest = {}) {
    return mergeProps(this.props.td(rest), props);
  }
}

export class Table extends TablePlugin {
  static defaultProps = {
    ...TablePlugin.defaultProps
  };

  render() {
    const {columns, data, Table, Thead, Tbody, Tr, Th, Td} = this.props;

    const headers = columns.map((column, key) => (
      <Th {...{key, ...this.th({}, {column})}}>
        {column.displayName || column.attribute}
      </Th>
    ));

    const headerRow = <Tr {...this.tr()}>{headers}</Tr>;

    const cols = rowDatum => columns.map((column, key) =>
      <Td {...{key, ...this.td({}, {column})}}>{rowDatum[column.attribute]}</Td>);

    const bodyRows = data.map((rowDatum, key) =>
      <Tr {...{key, ...this.tr()}}>{cols(rowDatum)}</Tr>);

    return (
      <Table {...this.table({className: 'table'})}>
        <Thead {...this.thead()}>{headerRow}</Thead>
        <Tbody {...this.tbody()}>{bodyRows}</Tbody>
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
      return <Table {...this.props} {...{
        thead: this.thead.bind(this, {className: 'thead'}),
        tbody: this.tbody.bind(this, {className: 'tbody'}),
        tr: this.tr.bind(this, {className: 'tr grid'}),
        th: this.th.bind(this, {className: 'th col'}),
        td: this.td.bind(this, {className: 'td col'})
      }}/>;
    }
  }
}

export function withFixedWithColumns(Table) {
  function colFixed(method, {column: {width}}) {
    if (!width) return this[method]();
    return this[method]({
      className: 'col-fixed',
      style: {width}
    });
  }

  return class TableWithFixedWidthColumns extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return <Table {...this.props} {...{
        th: colFixed.bind(this, 'th'),
        td: colFixed.bind(this, 'td')
      }}/>;
    }
  }
}