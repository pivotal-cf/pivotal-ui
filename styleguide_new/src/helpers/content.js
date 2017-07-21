import React from 'react';
import ReactDOM from 'react-dom';

import * as Alignment from 'pui-css-alignment';
import * as Bootstrap from 'pui-css-bootstrap';
import * as Border from 'pui-css-border';
import * as BoxShadows from 'pui-css-box-shadows';
import * as ButtonGroup from 'pui-css-button-group';
import * as Code from 'pui-css-code';
import * as Ellipsis from 'pui-css-ellipsis';
import * as Hoverable from 'pui-css-hoverable';
import * as Links from 'pui-css-links';
import * as Maps from 'pui-css-google-maps';
import * as ProgressBars from 'pui-css-progress-bars';
import * as Typography from 'pui-css-typography';
import * as VerticalAlignment from 'pui-css-vertical-alignment';
import * as Whitespace from 'pui-css-whitespace';

import * as Alerts from 'pui-react-alerts';
import * as Autocomplete from 'pui-react-autocomplete';
import * as Top from 'pui-react-back-to-top';
import * as Buttons from 'pui-react-buttons';
import * as Checkbox from 'pui-react-checkbox';
import * as Collapse from 'pui-react-collapse';
import * as Clipboard from 'pui-react-copy-to-clipboard';
import * as Dividers from 'pui-react-dividers';
import * as DraggableList from 'pui-react-draggable-list';
import * as Dropdowns from 'pui-react-dropdowns';
import * as Expander from 'pui-react-expander';
import * as Grids from 'pui-react-grids';
import * as Iconography from 'pui-react-iconography';
import * as Images from 'pui-react-images';
import * as Inputs from 'pui-react-inputs';
import * as Labels from 'pui-react-labels';
import * as Lists from 'pui-react-lists';
import * as Media from 'pui-react-media';
import * as Modals from 'pui-react-modals';
import * as Notifications from 'pui-react-notifications';
import * as Pagination from 'pui-react-pagination';
import * as Panels from 'pui-react-panels';
import * as Panes from 'pui-react-panes';
import * as Portals from 'pui-react-portals';
import * as Radio from 'pui-react-radio';
import * as Table from 'pui-react-table';
import * as Trigger from 'pui-react-overlay-trigger';
import * as Select from 'pui-react-select';
import * as StreamList from 'pui-react-stream-list';
import * as Svg from 'pui-react-svg';
import * as Tabs from 'pui-react-tabs';
import * as TileLayout from 'pui-react-tile-layout';
import * as Toggle from 'pui-react-toggle';
import * as Tooltip from 'pui-react-tooltip';

import Contribute from '../../docs/Contribute.md';
import Downloads from '../../docs/Downloads.md';
import GetStarted from '../../docs/GetStarted.md';
import Homepage from '../../docs/Homepage.md';
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
import CodeJson from '../../docs/components/Code.md';
import CollapseJson from '../../docs/components/Collapse.md';
import ColorsJson from '../../docs/components/Colors.md';
import CopyToClipboardJson from '../../docs/components/CopyToClipboard.md';
import DividersJson from '../../docs/components/Dividers.md';
import DropdownsJson from '../../docs/components/Dropdowns.md';
import EllipsisJson from '../../docs/components/Ellipsis.md';
import ExpanderJson from '../../docs/components/Expander.md';
import FormsJson from '../../docs/components/Forms.md';
import GridsJson from '../../docs/components/Grids.md';
import HoverableJson from '../../docs/components/Hoverable.md';
import IconsJson from '../../docs/components/Icons.md';
import ImagesJson from '../../docs/components/Images.md';
import LabelsJson from '../../docs/components/Labels.md';
import LinksJson from '../../docs/components/Links.md';
import ListsJson from '../../docs/components/Lists.md';
import MapsJson from '../../docs/components/Maps.md';
import MediaJson from '../../docs/components/Media.md';
import ModalsJson from '../../docs/components/Modals.md';
import NotificationsJson from '../../docs/components/Notifications.md';
import PaginationJson from '../../docs/components/Pagination.md';
import PanesJson from '../../docs/components/Panes.md';
import PanelsJson from '../../docs/components/Panels.md';
import PortalsJson from '../../docs/components/Portals.md';
import ProgressBarsJson from '../../docs/components/ProgressBars.md';
import SelectJson from '../../docs/components/Select.md';
import SvgJson from '../../docs/components/Svg.md';
import TablesJson from '../../docs/components/Tables.md';
import TabsJson from '../../docs/components/Tabs.md';
import TileLayoutJson from '../../docs/components/TileLayout.md';
import TooltipsJson from '../../docs/components/Tooltips.md';
import TypographyJson from '../../docs/components/Typography.md';
import VerticalAlignmentJson from '../../docs/components/VerticalAlignment.md';
import WhitespaceJson from '../../docs/components/Whitespace.md';

const routes = {
  '/': {json: Homepage, file: 'Homepage.md', name: 'Homepage', category: 'Base', packages: []},
  '/getstarted': {json: GetStarted, file: 'GetStarted.md', name: 'Get Started', category: 'Base', packages: []},
  '/upgradeguide': {json: UpgradeGuide, file: 'UpgradeGuide.md', name: 'Upgrade Guide', category: 'Base', packages: []},
  '/versions': {json: Versions, file: 'Versions.md', name: 'Versions', category: 'Base', packages: []},
  '/contribute': {json: Contribute, file: 'Contribute.md', name: 'Contribute', category: 'Base', packages: []},
  '/downloads': {json: Downloads, file: 'Downloads.md', name: 'Downloads', category: 'Base', packages: []},
  '/404': {json: NotFound, file: '404.md', name: '404 Not Found', category: 'Ignored', packages: []},

  '/alerts': {json: AlertsJson, file: 'components/Alerts.md', name: 'Alerts', category: 'Components', packages: [Alerts]},
  '/alignment': {json: AlignmentJson, file: 'components/Alignment.md', name: 'Alignment', category: 'Components', packages: [Alignment]},
  '/autocomplete': {json: AutocompleteJson, file: 'components/Autocomplete.md', name: 'Autocomplete', category: 'Components', packages: [Autocomplete]},
  '/backtotop': {json: BackToTopJson, file: 'components/Backtotop.md', name: 'Back To Top', category: 'Components', packages: [Top]},
  '/border': {json: BorderJson, file: 'components/Border.md', name: 'Border', category: 'Components', packages: [Border]},
  '/box_shadows': {json: BoxShadowsJson, file: 'components/BoxShadows.md', name: 'Box Shadows', category: 'Components', packages: [BoxShadows]},
  '/button_group': {json: ButtonGroupJson, file: 'components/ButtonGroup.md', name: 'Button Group', category: 'Components', packages: [ButtonGroup]},
  '/buttons': {json: ButtonsJson, file: 'components/Buttons.md', name: 'Buttons', category: 'Components', packages: [Buttons]},
  '/code': {json: CodeJson, file: 'components/Code.md', name: 'Code', category: 'Components', packages: [Code]},
  '/collapse': {json: CollapseJson, file: 'components/Collapse.md', name: 'Collapse', category: 'Components', packages: [Collapse]},
  '/colors': {json: ColorsJson, file: 'components/Colors.md', name: 'Colors', category: 'Components', packages: [Bootstrap]},
  '/copy_to_clipboard': {json: CopyToClipboardJson, file: 'components/CopyToClipboard.md', name: 'CopyToClipboard', category: 'Components', packages: [Clipboard]},
  '/dividers': {json: DividersJson, file: 'components/Dividers.md', name: 'Dividers', category: 'Components', packages: [Dividers]},
  '/dropdowns': {json: DropdownsJson, file: 'components/Dropdowns.md', name: 'Dropdowns', category: 'Components', packages: [Dropdowns]},
  '/ellipsis': {json: EllipsisJson, file: 'components/Ellipsis.md', name: 'Ellipsis', category: 'Components', packages: [Ellipsis]},
  '/expander': {json: ExpanderJson, file: 'components/Expander.md', name: 'Expander', category: 'Components', packages: [Expander]},
  '/forms': {json: FormsJson, file: 'components/Forms.md', name: 'Forms', category: 'Components', packages: [Checkbox, Inputs, Radio, Toggle]},
  '/grids': {json: GridsJson, file: 'components/Grids.md', name: 'Grids', category: 'Components', packages: [Grids]},
  '/hoverable': {json: HoverableJson, file: 'components/Hoverable.md', name: 'Hoverable', category: 'Components', packages: [Hoverable]},
  '/icons': {json: IconsJson, file: 'components/Icons.md', name: 'Icons', category: 'Components', packages: [Iconography]},
  '/images': {json: ImagesJson, file: 'components/Images.md', name: 'Images', category: 'Components', packages: [Images]},
  '/labels': {json: LabelsJson, file: 'components/Labels.md', name: 'Labels', category: 'Components', packages: [Labels]},
  '/links': {json: LinksJson, file: 'components/Links.md', name: 'Links', category: 'Components', packages: [Links]},
  '/lists': {json: ListsJson, file: 'components/Lists.md', name: 'Lists', category: 'Components', packages: [Lists, DraggableList, StreamList]},
  '/maps': {json: MapsJson, file: 'components/Maps.md', name: 'Maps', category: 'Components', packages: [Maps]},
  '/media': {json: MediaJson, file: 'components/Media.md', name: 'Media', category: 'Components', packages: [Media]},
  '/modals': {json: ModalsJson, file: 'components/Modals.md', name: 'Modals', category: 'Components', packages: [Modals]},
  '/notifications': {json: NotificationsJson, file: 'components/Notifications.md', name: 'Notifications', category: 'Components', packages: [Notifications]},
  '/pagination': {json: PaginationJson, file: 'components/Pagination.md', name: 'Pagination', category: 'Components', packages: [Pagination]},
  '/panels': {json: PanelsJson, file: 'components/Panels.md', name: 'Panels', category: 'Components', packages: [Panels]},
  '/panes': {json: PanesJson, file: 'components/Panes.md', name: 'Panes', category: 'Components', packages: [Panes]},
  '/portals': {json: PortalsJson, file: 'components/Portals.md', name: 'Portals', category: 'Components', packages: [Portals]},
  '/progress_bars': {json: ProgressBarsJson, file: 'components/ProgressBars.md', name: 'Progress Bars', category: 'Components', packages: [ProgressBars]},
  '/select': {json: SelectJson, file: 'components/Select.md', name: 'Select', category: 'Components', packages: [Select]},
  '/svg': {json: SvgJson, file: 'components/Svg.md', name: 'Svg', category: 'Components', packages: [Svg]},
  '/tables': {json: TablesJson, file: 'components/Tables.md', name: 'Tables', category: 'Components', packages: [Table]},
  '/tabs': {json: TabsJson, file: 'components/Tabs.md', name: 'Tabs', category: 'Components', packages: [Tabs]},
  '/tile_layout': {json: TileLayoutJson, file: 'components/TileLayout.md', name: 'Tile Layout', category: 'Components', packages: [TileLayout, Trigger]},
  '/tooltips': {json: TooltipsJson, file: 'components/Tooltips.md', name: 'Tooltips', category: 'Components', packages: [Tooltip]},
  '/typography': {json: TypographyJson, file: 'components/Typography.md', name: 'Typography', category: 'Components', packages: [Typography]},
  '/vertical_alignment': {json: VerticalAlignmentJson, file: 'components/VerticalAlignment.md', name: 'Vertical Align', category: 'Components', packages: [VerticalAlignment]},
  '/whitespace': {json: WhitespaceJson, file: 'components/Whitespace.md', name: 'Whitespace', category: 'Components', packages: [Whitespace]},
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