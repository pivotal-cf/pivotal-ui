import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import sortBy from 'lodash.sortby';

export class FlexTableCell extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    rowDatum: PropTypes.any,
    cellClass: PropTypes.string
  };

  render() {
    const {cellClass, children, className, ...others} = this.props;

    ['attribute', 'colIndex', 'displayName', 'index', 'headerProps', 'rowDatum', 'sortable', 'sortBy']
      .forEach(prop => delete others[prop]);

    const classes = classnames(className, 'td', 'col', cellClass);
    const props = mergeProps(others, {className: classes});

    return (<div {...props}>
      {children}
    </div>);
  }
}