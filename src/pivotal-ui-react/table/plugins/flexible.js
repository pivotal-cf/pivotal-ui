import classnames from 'classnames';

import {FlexTableCell} from '../flex-table-cell';
import {FlexTableRow} from '../flex-table-row';

export const Flexible = {
  constructor({subject}) {
    subject.defaultCell = FlexTableCell;
    subject.defaultRow = FlexTableRow;
  },

  tableElement() {
    return 'div';
  },

  tableHeadElement() {
    return 'div';
  },

  tableHeaderElement() {
    return 'div';
  },

  tableBodyElement() {
    return 'div';
  },

  tableRowElement() {
    return 'div';
  },

  beforeRenderTableHead({memo}) {
    return {...memo, className: classnames(memo.className, 'thead')};
  },

  beforeRenderTableBody({memo}) {
    return {...memo, className: classnames(memo.className, 'tbody')};
  },

  beforeRenderTableRow({memo}) {
    return {...memo, className: classnames(memo.className, 'tr', 'grid')};
  },

  beforeRenderTableHeader({memo}) {
    return {...memo, className: classnames(memo.className, 'th', 'col')};
  },

  beforeRenderTableData({memo}) {
    return {...memo, className: classnames(memo.className, 'td', 'col')};
  }
};