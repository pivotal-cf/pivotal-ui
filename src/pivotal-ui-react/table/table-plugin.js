import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers';

export class TablePlugin extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    Table: PropTypes.string,
    Thead: PropTypes.string,
    Tbody: PropTypes.string,
    Tr: PropTypes.string,
    Th: PropTypes.string,
    Td: PropTypes.string,
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

  mergeProps(props = {}, context = {}, method) {
    return mergeProps(this.props[method](context), props);
  }

  table(props = {}, context = {}) {
    return this.mergeProps(props, context, 'table');
  }

  thead(props = {}, context = {}) {
    return this.mergeProps(props, context, 'thead');
  }

  tbody(props = {}, context = {}) {
    return this.mergeProps(props, context, 'tbody');
  }

  tr(props = {}, context = {}) {
    return this.mergeProps(props, context, 'tr');
  }

  th(props = {}, context = {}) {
    return this.mergeProps(props, context, 'th');
  }

  td(props = {}, context = {}) {
    return this.mergeProps(props, context, 'td');
  }

  render() {
    return null;
  }
}