import classnames from 'classnames';

export const Flexible = {
  tableElement: () => 'div',
  tableHeadElement: () => 'div',
  tableHeaderElement: () => 'div',
  tableBodyElement: () => 'div',
  tableRowElement: () => 'div',
  tableCellElement: () => 'div',
  beforeRenderTableHead: ({memo}) => ({...memo, className: classnames(memo.className, 'thead')}),
  beforeRenderTableBody: ({memo}) => ({...memo, className: classnames(memo.className, 'tbody')}),
  beforeRenderTableRow: ({memo}) => ({...memo, className: classnames(memo.className, 'tr', 'grid')}),
  beforeRenderTableHeader: ({memo}) => ({...memo, className: classnames(memo.className, 'th', 'col')}),
  beforeRenderTableCell: ({memo}) => ({...memo, className: classnames(memo.className, 'td', 'col')})
};