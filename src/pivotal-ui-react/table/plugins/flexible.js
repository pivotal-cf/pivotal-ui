import classnames from 'classnames';

export const Flexible = {
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

  tableCellElement() {
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

  beforeRenderTableCell({memo}) {
    return {...memo, className: classnames(memo.className, 'td', 'col')};
  }
};