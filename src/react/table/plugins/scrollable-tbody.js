// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import {TablePlugin} from '../table-plugin';

export function withScrollableTbody(Table) {
  return class TableWithScrollableTbody extends TablePlugin {
    static propTypes = {
      scrollable: PropTypes.bool,
      tbodyHeight: PropTypes.string
    };

    render() {
      const {scrollable, tbodyHeight, ...props} = this.props;

      return this.renderTable(Table, {
        tbody: () => {
          if (!scrollable) return;

          return {
            className: 'scrollable-body',
            style: {height: tbodyHeight}
          };
        }
      }, props);
    }
  };
}