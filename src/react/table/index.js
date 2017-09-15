import flow from 'lodash.flow';

import {Table} from './table';
import {withCellClassName} from './plugins/cell-class-name';
import {withCellEllipsis} from './plugins/cell-ellipsis';
import {withCellLink} from './plugins/cell-link';
import {withCellOnClick} from './plugins/cell-on-click';
import {withCellRenderer} from './plugins/cell-renderer';
import {withCellTooltip} from './plugins/cell-tooltip';
import {withCellWidth} from './plugins/cell-width';
import {withFlex} from './plugins/flex';
import {withFooterRow} from './plugins/footer-row';
import {withRowClassName} from './plugins/row-class-name';
import {withRowDrawer} from './plugins/row-drawer';
import {withRowLink} from './plugins/row-link';
import {withSorting} from './plugins/sorting';

export {Table} from './table';
export {TablePlugin} from './table-plugin';

export {withCellClassName} from './plugins/cell-class-name';
export {withCellEllipsis} from './plugins/cell-ellipsis';
export {withCellLink} from './plugins/cell-link';
export {withCellOnClick} from './plugins/cell-on-click';
export {withCellRenderer} from './plugins/cell-renderer';
export {withCellTooltip} from './plugins/cell-tooltip';
export {withCellWidth} from './plugins/cell-width';
export {withFlex} from './plugins/flex';
export {withFooterRow} from './plugins/footer-row';
export {withRowClassName} from './plugins/row-class-name';
export {withRowDrawer} from './plugins/row-drawer';
export {withRowLink} from './plugins/row-link';
export {withSorting} from './plugins/sorting';

export const SortableTable = withSorting(Table);
export const FlexTable = withFlex(Table);
export const SortableFlexTable = withFlex(SortableTable);
export const AdvancedTable = flow(
  withFlex,
  withCellLink,
  withCellClassName,
  withCellEllipsis,
  withCellOnClick,
  withCellRenderer,
  withCellTooltip,
  withCellWidth,
  withFooterRow,
  withRowClassName,
  withRowDrawer,
  withRowLink,
  withSorting
)(Table);