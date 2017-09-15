// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import {TablePlugin} from '../table-plugin';

export function withFooterRow(Table) {
  return class TableWithFooterRow extends TablePlugin {
    static propTypes = {footerRow: PropTypes.node};

    render() {
      const {footerRow, ...props} = this.props;
      return this.renderTable(Table, {
        tfoot: props => ({children: [...props.children, footerRow]})
      }, props);
    }
  };
}