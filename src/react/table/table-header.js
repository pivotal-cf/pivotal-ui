import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import React from 'react';

export class TableHeader extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    onSortableTableHeaderClick: PropTypes.func,
    sortable: PropTypes.bool
  };

  handleActivate = event => {
    const {sortable, onClick, onSortableTableHeaderClick} = this.props;
    if (sortable) onSortableTableHeaderClick(event);
    if (onClick) onClick(event);
  };

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleActivate(event);
    }
  };

  render() {
    const {onSortableTableHeaderClick, sortable, ...others} = this.props;
    const props = mergeProps(others, {className: {'sortable': sortable}});

    const thProps = {...props, tabIndex: 0, disabled: !sortable};
    if (sortable) {
      return <th {...thProps} onClick={this.handleActivate} onKeyDown={this.handleKeyDown} role="button"/>;
    } else {
      return <th {...thProps}/>;
    }
  }
}