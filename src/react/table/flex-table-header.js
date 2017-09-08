import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import {TableHeader} from './table-header';

export class FlexTableHeader extends TableHeader {
  static propTypes = {
    onClick: PropTypes.func,
    onSortableTableHeaderClick: PropTypes.func,
    sortable: PropTypes.bool
  };

  render() {
    const {onSortableTableHeaderClick, sortable, className, ...others} = this.props;
    const classes = classnames('th', 'col', className, {'sortable': sortable});
    const props = mergeProps(others, {className: classes});

    const thProps = {...props, tabIndex: 0, disabled: !sortable};
    if (sortable) {
      return <div {...thProps} onClick={this.handleActivate} onKeyDown={this.handleKeyDown} role="button"/>;
    } else {
      return <div {...thProps}/>;
    }
  }
}