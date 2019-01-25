// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import {TablePlugin} from '../table_plugin';

export function withRowLink(Table) {
  return class TableWithRowLink extends TablePlugin {
    static propTypes = {rowLink: PropTypes.object};

    render() {
      const {rowLink: {link, onClick} = {}, ...props} = this.props;
      return this.renderTable(Table, {
        trTag: ({rowDatum}) => rowDatum && link && link(rowDatum) && 'a',
        tr: (props, {rowDatum}) => {
          if (!rowDatum || !link) return;

          const href = link(rowDatum);
          if (!href) return;

          return {href, onClick: e => onClick(e, rowDatum)};
        }
      }, props);
    }
  };
}