import React from 'react';
import PropTypes from 'prop-types';
import {TablePlugin} from '../table-plugin';

export function withFooterRow(Table) {
  return class TableWithFooterRow extends TablePlugin {
    static propTypes = {footerRow: PropTypes.any};

    render() {
      const {footerRow, ...props} = this.props;

      const children = [...(props.children || []), footerRow]
        .filter(el => el)
        .map((el, key) => React.cloneElement(el, {key}));

      return this.renderTable(Table, {
        tfoot: props => ({children})
      }, props);
    }
  };
}