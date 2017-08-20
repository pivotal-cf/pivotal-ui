import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withFlex(Table) {
  return class TableWithFlex extends TablePlugin {
    static defaultProps = {
      ...TablePlugin.defaultProps,
      Table: 'div',
      Thead: 'div',
      Tbody: 'div',
      Tr: 'div',
      Th: 'div',
      Td: 'div'
    };

    render() {
      return <Table {...this.props} {...{
        thead: this.thead.bind(this, {className: 'thead'}),
        tbody: this.tbody.bind(this, {className: 'tbody'}),
        tr: this.tr.bind(this, {className: 'tr grid'}),
        th: this.th.bind(this, {className: 'th col'}),
        td: this.td.bind(this, {className: 'td col'})
      }}/>;
    }
  }
}