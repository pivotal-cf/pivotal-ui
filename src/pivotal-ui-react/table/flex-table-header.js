import {mergeProps} from 'pui-react-helpers';
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
    return null;
  }
}