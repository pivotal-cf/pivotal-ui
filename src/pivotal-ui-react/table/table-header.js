import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';

export class TableHeader extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    onSortableTableHeaderClick: PropTypes.func,
    sortable: PropTypes.bool
  };

  emit({event, opts = {}, initial}) {
    return this.props.plugins.reduce((memo, plugin) => plugin[event]
      ? plugin[event]({...opts, memo, subject: this})
      : memo, initial);
  }

  render() {

  }
}