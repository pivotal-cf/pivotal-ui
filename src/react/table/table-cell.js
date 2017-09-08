import classnames from 'classnames';
import {mergeProps} from '../helpers';
import React from 'react';
import sortBy from 'lodash.sortby';
import PropTypes from 'prop-types';

export class TableCell extends React.PureComponent {
  static propTypes = {
    cellClass: PropTypes.string
  };

  render() {
    const {cellClass, children, className, ...others} = this.props;

    ['attribute', 'colIndex', 'displayName', 'index', 'headerProps', 'rowDatum', 'sortable', 'sortBy']
      .forEach(prop => delete others[prop]);

    const classes = classnames(className, cellClass);
    const props = mergeProps(others, {className: classes});

    return (<td {...props}>
      {children}
    </td>);
  }
}