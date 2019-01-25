// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import {TablePlugin} from '../table_plugin';

export function withRowClassName(Table) {
  return class TableWithRowClassName extends TablePlugin {
    static propTypes = {rowClassName: PropTypes.func};

    render() {
      const {rowClassName, ...props} = this.props;
      return this.renderTable(Table, {
        tr: (props, trContext) => rowClassName && {className: rowClassName(trContext)}
      }, props);
    }
  };
}