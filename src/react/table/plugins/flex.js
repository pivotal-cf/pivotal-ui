// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withFlex(Table) {
  return class TableWithFlex extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        tableTag: () => 'div',
        theadTag: () => 'div',
        tbodyTag: () => 'div',
        tfootTag: () => 'div',
        trTag: () => 'div',
        thTag: () => 'div',
        tdTag: () => 'div',
        thead: () => ({className: 'thead'}),
        tbody: () => ({className: 'tbody'}),
        tfoot: () => ({className: 'tfoot'}),
        tr: () => ({className: 'tr grid'}),
        th: () => ({className: 'th col'}),
        td: () => ({className: 'td col'})
      });
    }
  };
}