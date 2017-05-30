import PropTypes from 'prop-types';
import React from 'react';
import sortBy from 'lodash.sortby';

export class TableCell extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    rowDatum: PropTypes.any
  };

  render() {
    let {children, ...others} = this.props;

    ['attribute', 'displayName', 'index', 'headerProps', 'rowDatum', 'sortable', 'sortBy']
      .forEach(prop => delete others[prop]);

    return (<td {...others}>
      {children}
    </td>);
  }
}