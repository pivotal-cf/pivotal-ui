import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers';

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