import React from 'react';
import ReactDOM from 'react-dom';

import * as Alignment from 'pivotal-ui/css/alignment';
import * as Colors from 'pivotal-ui/css/colors';
import * as Border from 'pivotal-ui/css/border';
import * as BoxShadows from 'pivotal-ui/css/box-shadows';
import * as ButtonGroup from 'pivotal-ui/css/button-group';
import * as Code from 'pivotal-ui/css/code';
import * as Ellipsis from 'pivotal-ui/css/ellipsis';
import * as Links from 'pivotal-ui/css/links';
import * as Positioning from 'pivotal-ui/css/positioning'
import * as ProgressBars from 'pivotal-ui/css/progress-bars';
import * as Typography from 'pivotal-ui/css/typography';
import * as VerticalAlignment from 'pivotal-ui/css/vertical-alignment';
import * as Whitespace from 'pivotal-ui/css/whitespace';

import * as Alerts from 'pivotal-ui/react/alerts';
import * as Autocomplete from 'pivotal-ui/react/autocomplete';
import * as Top from 'pivotal-ui/react/back-to-top';
import * as Buttons from 'pivotal-ui/react/buttons';
import * as Checkbox from 'pivotal-ui/react/checkbox';
import * as CheckboxDropdown from 'pivotal-ui/react/checkbox-dropdown';
import * as Collapse from 'pivotal-ui/react/collapse';
import * as Clipboard from 'pivotal-ui/react/copy-to-clipboard';
import * as Dividers from 'pivotal-ui/react/dividers';
import * as DraggableList from 'pivotal-ui/react/draggable-list';
import * as Dropdowns from 'pivotal-ui/react/dropdowns';
import * as Expander from 'pivotal-ui/react/expander';
import * as Flyout from 'pivotal-ui/react/flyout';
import * as Grids from 'pivotal-ui/react/grids';
import * as Iconography from 'pivotal-ui/react/iconography';
import * as Images from 'pivotal-ui/react/images';
import * as Inputs from 'pivotal-ui/react/inputs';
import * as Lists from 'pivotal-ui/react/lists';
import * as Media from 'pivotal-ui/react/media';
import * as Modals from 'pivotal-ui/react/modals';
import * as Notifications from 'pivotal-ui/react/notifications';
import * as Pagination from 'pivotal-ui/react/pagination';
import * as Panels from 'pivotal-ui/react/panels';
import * as Panes from 'pivotal-ui/react/panes';
import * as Portals from 'pivotal-ui/react/portals';
import * as Radio from 'pivotal-ui/react/radio';
import * as Table from 'pivotal-ui/react/table';
import * as Trigger from 'pivotal-ui/react/overlay-trigger';
import * as Select from 'pivotal-ui/react/select';
import * as StreamList from 'pivotal-ui/react/stream-list';
import * as Svg from 'pivotal-ui/react/svg';
import * as Tabs from 'pivotal-ui/react/tabs';
import * as TileLayout from 'pivotal-ui/react/tile-layout';
import * as Toggle from 'pivotal-ui/react/toggle';
import * as TextFilter from 'pivotal-ui/react/text-filter';
import * as Tooltip from 'pivotal-ui/react/tooltip';
import * as Wizard from 'pivotal-ui/react/wizard';

import Contribute from '../../docs/Contribute.md';
import GetStarted from '../../docs/GetStarted.md';
import Faq from '../../docs/Faq.md';
import UpgradeGuide from '../../docs/UpgradeGuide.md';
import Versions from '../../docs/Versions.md';
import NotFound from '../../docs/404.md';

import AlertsJson from '../../docs/components/Alerts.md';
import AlignmentJson from '../../docs/components/Alignment.md';
import AutocompleteJson from '../../docs/components/Autocomplete.md';
import BackToTopJson from '../../docs/components/BackToTop.md';
import BorderJson from '../../docs/components/Border.md';
import BoxShadowsJson from '../../docs/components/BoxShadows.md';
import ButtonGroupJson from '../../docs/components/ButtonGroup.md';
import ButtonsJson from '../../docs/components/Buttons.md';
import CheckboxDropdownJson from '../../docs/components/CheckboxDropdowns.md';
import CodeJson from '../../docs/components/Code.md';
import CollapseJson from '../../docs/components/Collapse.md';
import ColorsJson from '../../docs/components/Colors.md';
import CopyToClipboardJson from '../../docs/components/CopyToClipboard.md';
import DividersJson from '../../docs/components/Dividers.md';
import DropdownsJson from '../../docs/components/Dropdowns.md';
import EllipsisJson from '../../docs/components/Ellipsis.md';
import ExpanderJson from '../../docs/components/Expander.md';
import FormsJson from '../../docs/components/Forms.md';
import FlyoutJson from '../../docs/components/Flyout.md';
import GridsJson from '../../docs/components/Grids.md';
import IconsJson from '../../docs/components/Icons.md';
import ImagesJson from '../../docs/components/Images.md';
import LinksJson from '../../docs/components/Links.md';
import ListsJson from '../../docs/components/Lists.md';
import MediaJson from '../../docs/components/Media.md';
import ModalsJson from '../../docs/components/Modals.md';
import NotificationsJson from '../../docs/components/Notifications.md';
import PaginationJson from '../../docs/components/Pagination.md';
import PanesJson from '../../docs/components/Panes.md';
import PanelsJson from '../../docs/components/Panels.md';
import PortalsJson from '../../docs/components/Portals.md';
import PositioningJson from '../../docs/components/Positioning.md';
import ProgressBarsJson from '../../docs/components/ProgressBars.md';
import SelectJson from '../../docs/components/Select.md';
import SvgJson from '../../docs/components/Svg.md';
import TablesJson from '../../docs/components/Tables.md';
import TabsJson from '../../docs/components/Tabs.md';
import TextFilterJson from '../../docs/components/TextFilter.md';
import TileLayoutJson from '../../docs/components/TileLayout.md';
import TooltipsJson from '../../docs/components/Tooltips.md';
import TypographyJson from '../../docs/components/Typography.md';
import VerticalAlignmentJson from '../../docs/components/VerticalAlignment.md';
import WhitespaceJson from '../../docs/components/Whitespace.md';
import WizardJson from '../../docs/components/Wizard.md';

const getStartedRoute = {json: GetStarted, file: 'GetStarted.md', name: 'Get Started', category: 'Base', packages: []};

const routes = {
  '': getStartedRoute,
  getstarted: getStartedRoute,
  'index.html': getStartedRoute,
  faq: {json: Faq, file: 'Faq.md', name: 'FAQ', category: 'Base', packages: [Panels]},
  upgradeguide: {json: UpgradeGuide, file: 'UpgradeGuide.md', name: 'Upgrade Guide', category: 'Base', packages: []},
  versions: {json: Versions, file: 'Versions.md', name: 'Versions', category: 'Base', packages: []},
  contribute: {json: Contribute, file: 'Contribute.md', name: 'Contribute', category: 'Base', packages: []},
  404: {json: NotFound, file: '404.md', name: '404 Not Found', category: 'Ignored', packages: []},

  alerts: {json: AlertsJson, file: 'components/Alerts.md', name: 'Alerts', category: 'Components', packages: [Alerts]},
  alignment: {json: AlignmentJson, file: 'components/Alignment.md', name: 'Alignment', category: 'Components', packages: [Alignment]},
  autocomplete: {json: AutocompleteJson, file: 'components/Autocomplete.md', name: 'Autocomplete', category: 'Components', packages: [Autocomplete]},
  backtotop: {json: BackToTopJson, file: 'components/Backtotop.md', name: 'Back To Top', category: 'Components', packages: [Top]},
  border: {json: BorderJson, file: 'components/Border.md', name: 'Border', category: 'Components', packages: [Border]},
  box_shadows: {json: BoxShadowsJson, file: 'components/BoxShadows.md', name: 'Box Shadows', category: 'Components', packages: [BoxShadows]},
  button_group: {json: ButtonGroupJson, file: 'components/ButtonGroup.md', name: 'Button Group', category: 'Components', packages: [ButtonGroup]},
  buttons: {json: ButtonsJson, file: 'components/Buttons.md', name: 'Buttons', category: 'Components', packages: [Buttons]},
  checkbox_dropdown: {json: CheckboxDropdownJson, file: 'components/CheckboxDropdown.md', name: 'Checkbox Dropdown', category: 'Components', packages: [CheckboxDropdown]},
  code: {json: CodeJson, file: 'components/Code.md', name: 'Code', category: 'Components', packages: [Code]},
  collapse: {json: CollapseJson, file: 'components/Collapse.md', name: 'Collapse', category: 'Components', packages: [Collapse]},
  colors: {json: ColorsJson, file: 'components/Colors.md', name: 'Colors', category: 'Components', packages: [Colors]},
  copy_to_clipboard: {json: CopyToClipboardJson, file: 'components/CopyToClipboard.md', name: 'CopyToClipboard', category: 'Components', packages: [Clipboard]},
  dividers: {json: DividersJson, file: 'components/Dividers.md', name: 'Dividers', category: 'Components', packages: [Dividers]},
  dropdowns: {json: DropdownsJson, file: 'components/Dropdowns.md', name: 'Dropdowns', category: 'Components', packages: [Dropdowns]},
  ellipsis: {json: EllipsisJson, file: 'components/Ellipsis.md', name: 'Ellipsis', category: 'Components', packages: [Ellipsis]},
  expander: {json: ExpanderJson, file: 'components/Expander.md', name: 'Expander', category: 'Components', packages: [Expander]},
  forms: {json: FormsJson, file: 'components/Forms.md', name: 'Forms', category: 'Components', packages: [Checkbox, Inputs, Radio, Toggle]},
  flyout: {json: FlyoutJson, file: 'components/Flyout.md', name: 'Flyout', category: 'Components', packages: [Alerts, Buttons, Flyout, Inputs]},
  grids: {json: GridsJson, file: 'components/Grids.md', name: 'Grids', category: 'Components', packages: [Grids]},
  icons: {json: IconsJson, file: 'components/Icons.md', name: 'Icons', category: 'Components', packages: [Iconography]},
  images: {json: ImagesJson, file: 'components/Images.md', name: 'Images', category: 'Components', packages: [Images]},
  links: {json: LinksJson, file: 'components/Links.md', name: 'Links', category: 'Components', packages: [Links]},
  lists: {json: ListsJson, file: 'components/Lists.md', name: 'Lists', category: 'Components', packages: [Lists, DraggableList, StreamList]},
  media: {json: MediaJson, file: 'components/Media.md', name: 'Media', category: 'Components', packages: [Media]},
  modals: {json: ModalsJson, file: 'components/Modals.md', name: 'Modals', category: 'Components', packages: [Modals]},
  notifications: {json: NotificationsJson, file: 'components/Notifications.md', name: 'Notifications', category: 'Components', packages: [Notifications]},
  pagination: {json: PaginationJson, file: 'components/Pagination.md', name: 'Pagination', category: 'Components', packages: [Pagination]},
  panels: {json: PanelsJson, file: 'components/Panels.md', name: 'Panels', category: 'Components', packages: [Panels]},
  panes: {json: PanesJson, file: 'components/Panes.md', name: 'Panes', category: 'Components', packages: [Panes]},
  portals: {json: PortalsJson, file: 'components/Portals.md', name: 'Portals', category: 'Components', packages: [Portals]},
  positioning: {json: PositioningJson, file: 'components/Positioning.md', name: 'Positioning', category: 'Components', packages: [Positioning]},
  progress_bars: {json: ProgressBarsJson, file: 'components/ProgressBars.md', name: 'Progress Bars', category: 'Components', packages: [ProgressBars]},
  select: {json: SelectJson, file: 'components/Select.md', name: 'Select', category: 'Components', packages: [Select]},
  svg: {json: SvgJson, file: 'components/Svg.md', name: 'Svg', category: 'Components', packages: [Svg]},
  tables: {json: TablesJson, file: 'components/Tables.md', name: 'Tables', category: 'Components', packages: [Table]},
  tabs: {json: TabsJson, file: 'components/Tabs.md', name: 'Tabs', category: 'Components', packages: [Tabs]},
  textfilter: {json: TextFilterJson, file: 'components/TextFilter.md', name: 'TextFilter', category: 'Components', packages: [TextFilter]},
  tile_layout: {json: TileLayoutJson, file: 'components/TileLayout.md', name: 'Tile Layout', category: 'Components', packages: [TileLayout, Trigger]},
  tooltips: {json: TooltipsJson, file: 'components/Tooltips.md', name: 'Tooltips', category: 'Components', packages: [Tooltip]},
  typography: {json: TypographyJson, file: 'components/Typography.md', name: 'Typography', category: 'Components', packages: [Typography]},
  vertical_alignment: {json: VerticalAlignmentJson, file: 'components/VerticalAlignment.md', name: 'Vertical Align', category: 'Components', packages: [VerticalAlignment]},
  whitespace: {json: WhitespaceJson, file: 'components/Whitespace.md', name: 'Whitespace', category: 'Components', packages: [Whitespace]},
  wizard: {json: WizardJson, file: 'components/Wizard.md', name: 'Wizard', category: 'Components', packages: [Wizard]}
};

const attachToWindow = pkg => {
  Object.keys(pkg).forEach(key => {
    window[key] = pkg[key];
  });
};

const routeKeyToObject = k => {
  const obj = routes[k];
  obj.href = k;
  return obj;
};

export const componentItems = Object.keys(routes)
  .map(routeKeyToObject)
  .filter(i => i.category === 'Components');

export const attachPackagesToWindow = () => {
  window.React = React;
  window.ReactDOM = ReactDOM;

  Object.keys(routes)
    .map(k => routes[k])
    .map(r => r.packages)
    .forEach(packages => packages.forEach(attachToWindow));
};

export default routes;