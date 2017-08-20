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