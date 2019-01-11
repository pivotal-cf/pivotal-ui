import flow from 'lodash.flow';

import {Table} from './table';
import {withCellClassName} from './plugins/cell_class_name';
import {withCellEllipsis} from './plugins/cell_ellipsis';
import {withCellLink} from './plugins/cell_link';
import {withCellOnClick} from './plugins/cell_on_click';
import {withCellRenderer} from './plugins/cell_renderer';
import {withCellTooltip} from './plugins/cell_tooltip';
import {withCellWidth} from './plugins/cell_width';
import {withFlex} from './plugins/flex';
import {withFooterRow} from './plugins/footer_row';
import {withRenderTdChildren} from './plugins/render_td_children';
import {withRenderThChildren} from './plugins/render_th_children';
import {withRowClassName} from './plugins/row_class_name';
import {withRowDrawer} from './plugins/row_drawer';
import {withRowLink} from './plugins/row_link';
import {withScrollableTbody} from './plugins/scrollable_tbody';
import {withSorting} from './plugins/sorting';

export {Table} from './table';
export {TablePlugin} from './table_plugin';

export {withCellClassName} from './plugins/cell_class_name';
export {withCellEllipsis} from './plugins/cell_ellipsis';
export {withCellLink} from './plugins/cell_link';
export {withCellOnClick} from './plugins/cell_on_click';
export {withCellRenderer} from './plugins/cell_renderer';
export {withCellTooltip} from './plugins/cell_tooltip';
export {withCellWidth} from './plugins/cell_width';
export {withFlex} from './plugins/flex';
export {withFooterRow} from './plugins/footer_row';
export {withRenderTdChildren} from './plugins/render_td_children';
export {withRenderThChildren} from './plugins/render_th_children';
export {withRowClassName} from './plugins/row_class_name';
export {withRowDrawer} from './plugins/row_drawer';
export {withRowLink} from './plugins/row_link';
export {withScrollableTbody} from './plugins/scrollable_tbody';
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
  withRenderTdChildren,
  withRenderThChildren,
  withCellTooltip,
  withCellWidth,
  withFooterRow,
  withRowClassName,
  withRowDrawer,
  withRowLink,
  withSorting,
  withScrollableTbody
)(Table);