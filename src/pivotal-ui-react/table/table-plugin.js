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

  mergeProps(props = {}, rest = {}, method) {
    return mergeProps(this.props[method](rest), props);
  }

  table(props = {}, rest = {}) {
    return this.mergeProps(props, rest, 'table');
  }

  thead(props = {}, rest = {}) {
    return this.mergeProps(props, rest, 'thead');
  }

  tbody(props = {}, rest = {}) {
    return this.mergeProps(props, rest, 'tbody');
  }

  tr(props = {}, rest = {}) {
    return this.mergeProps(props, rest, 'tr');
  }

  th(props = {}, rest = {}) {
    return this.mergeProps(props, rest, 'th');
  }

  td(props = {}, rest = {}) {
    return this.mergeProps(props, rest, 'td');
  }
}