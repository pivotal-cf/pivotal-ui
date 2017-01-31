import React from 'react'
import ReactDOM from 'react-dom'

import * as Alignment from 'pui-css-alignment'
import * as Bootstrap from 'pui-css-bootstrap'
import * as Ellipsis from 'pui-css-ellipsis'
import * as Hoverable from 'pui-css-hoverable'

import * as Alerts from 'pui-react-alerts'
import * as Autocomplete from 'pui-react-autocomplete'
import * as Top from 'pui-react-back-to-top'
import * as Buttons from 'pui-react-buttons'
import * as Checkbox from 'pui-react-checkbox'
import * as Collapse from 'pui-react-collapse'
import * as Clipboard from 'pui-react-copy-to-clipboard'
import * as Dividers from 'pui-react-dividers'
import * as DraggableList from 'pui-react-draggable-list'
import * as Dropdowns from 'pui-react-dropdowns'
import * as Expander from 'pui-react-expander'
import * as Grids from 'pui-react-grids'
import * as Iconography from 'pui-react-iconography'
import * as Images from 'pui-react-images'
import * as Inputs from 'pui-react-inputs'
import * as Labels from 'pui-react-labels'
import * as Lists from 'pui-react-lists'
import * as Media from 'pui-react-media'
import * as Modals from 'pui-react-modals'
import * as Notifications from 'pui-react-notifications'
import * as Trigger from 'pui-react-overlay-trigger'
import * as Pagination from 'pui-react-pagination'
import * as Panels from 'pui-react-panels'
import * as Panes from 'pui-react-panes'
import * as Portals from 'pui-react-portals'
import * as Radio from 'pui-react-radio'
import * as Table from 'pui-react-table'
import * as Select from 'pui-react-select'
import * as StreamList from 'pui-react-stream-list'
import * as Svg from 'pui-react-svg'
import * as Tabs from 'pui-react-tabs'
import * as Layout from 'pui-react-tile-layout'
import * as Toggle from 'pui-react-toggle'
import * as Tooltip from 'pui-react-tooltip'

import Contribute from '../../docs/Contribute.md'
import Downloads from '../../docs/Downloads.md'
import GetStarted from '../../docs/GetStarted.md'
import Homepage from '../../docs/Homepage.md'
import UpgradeGuide from '../../docs/UpgradeGuide.md'
import NotFound from '../../docs/404.md'

import ColorsStuff from '../../docs/styles/Colors.md'
import GridcssStuff from '../../docs/styles/Grid.md'
import IconsStuff from '../../docs/styles/Icons.md'

import AlertsStuff from '../../docs/components/Alerts.md'
import AlignmentStuff from '../../docs/components/Alignment.md'
import AutocompleteStuff from '../../docs/components/Autocomplete.md'
import BackToTopStuff from '../../docs/components/BackToTop.md'
import ButtonsStuff from '../../docs/components/Buttons.md'
import CollapseStuff from '../../docs/components/Collapse.md'
import CopyToClipboardStuff from '../../docs/components/CopyToClipboard.md'
import DividersStuff from '../../docs/components/Dividers.md'
import DropdownsStuff from '../../docs/components/Dropdowns.md'
import EllipsisStuff from '../../docs/components/Ellipsis.md'
import ExpanderStuff from '../../docs/components/Expander.md'
import FormsStuff from '../../docs/components/Forms.md'
import GridsStuff from '../../docs/components/Grids.md'
import HoverableStuff from '../../docs/components/Hoverable.md'
import ImagesStuff from '../../docs/components/Images.md'
import LabelsStuff from '../../docs/components/Labels.md'
import LayoutStuff from '../../docs/components/Layout.md'
import ListsStuff from '../../docs/components/Lists.md'
import MediaStuff from '../../docs/components/Media.md'
import ModalsStuff from '../../docs/components/Modals.md'
import NotificationsStuff from '../../docs/components/Notifications.md'
import PaginationStuff from '../../docs/components/Pagination.md'
import PanesStuff from '../../docs/components/Panes.md'
import PanelsStuff from '../../docs/components/Panels.md'
import PortalsStuff from '../../docs/components/Portals.md'
import SelectStuff from '../../docs/components/Select.md'
import SvgStuff from '../../docs/components/Svg.md'
import TablesStuff from '../../docs/components/Tables.md'
import TabsStuff from '../../docs/components/Tabs.md'
import TooltipsStuff from '../../docs/components/Tooltips.md'

const routes = {
  '/': {html: Homepage, file: 'Homepage.md', name: 'Homepage', category: 'Base', packages: []},
  '/getstarted': {html: GetStarted, file: 'GetStarted.md', name: 'Get Started', category: 'Base', packages: []},
  '/upgradeguide': {html: UpgradeGuide, file: 'UpgradeGuide.md', name: 'Upgrade Guide', category: 'Base', packages: []},
  '/contribute': {html: Contribute, file: 'Contribute.md', name: 'Contribute', category: 'Base', packages: []},
  '/downloads': {html: Downloads, file: 'Downloads.md', name: 'Downloads', category: 'Base', packages: []},
  '/404': {html: NotFound, file: '404.md', name: '404 Not Found', category: 'Ignored', packages: []},

  '/colors': {html: ColorsStuff, file: 'styles/Colors.md', name: 'Colors', category: 'Styles', packages: [Bootstrap]},
  '/gridcss': {html: GridcssStuff, file: 'styles/Grid.md', name: 'Gridcss', category: 'Styles', packages: []},
  '/icons': {html: IconsStuff, file: 'styles/Icons.md', name: 'Icons', category: 'Styles', packages: [Iconography]},

  '/alerts': {html: AlertsStuff, file: 'components/Alerts.md', name: 'Alerts', category: 'Components', packages: [Alerts]},
  '/alignment': {html: AlignmentStuff, file: 'components/Alignment.md', name: 'Alignment', category: 'Components', packages: [Alignment]},
  '/autocomplete': {html: AutocompleteStuff, file: 'components/Autocomplete.md', name: 'Autocomplete', category: 'Components', packages: [Autocomplete]},
  '/backtotop': {html: BackToTopStuff, file: 'components/Backtotop.md', name: 'Back To Top', category: 'Components', packages: [Top]},
  '/buttons': {html: ButtonsStuff, file: 'components/Buttons.md', name: 'Buttons', category: 'Components', packages: [Buttons]},
  '/collapse': {html: CollapseStuff, file: 'components/Collapse.md', name: 'Collapse', category: 'Components', packages: [Collapse]},
  '/copy_to_clipboard': {html: CopyToClipboardStuff, file: 'components/CopyToClipboard.md', name: 'CopyToClipboard', category: 'Components', packages: [Clipboard]},
  '/dividers': {html: DividersStuff, file: 'components/Dividers.md', name: 'Dividers', category: 'Components', packages: [Dividers]},
  '/dropdowns': {html: DropdownsStuff, file: 'components/Dropdowns.md', name: 'Dropdowns', category: 'Components', packages: [Dropdowns]},
  '/ellipsis': {html: EllipsisStuff, file: 'components/Ellipsis.md', name: 'Ellipsis', category: 'Components', packages: [Ellipsis]},
  '/expander': {html: ExpanderStuff, file: 'components/Expander.md', name: 'Expander', category: 'Components', packages: [Expander]},
  '/forms': {html: FormsStuff, file: 'components/Forms.md', name: 'Forms', category: 'Components', packages: [Checkbox, Inputs, Radio, Toggle]},
  '/grids': {html: GridsStuff, file: 'components/Grids.md', name: 'Grids', category: 'Components', packages: [Grids]},
  '/hoverable': {html: HoverableStuff, file: 'components/Hoverable.md', name: 'Hoverable', category: 'Components', packages: [Hoverable]},
  '/images': {html: ImagesStuff, file: 'components/Images.md', name: 'Images', category: 'Components', packages: [Images]},
  '/labels': {html: LabelsStuff, file: 'components/Labels.md', name: 'Labels', category: 'Components', packages: [Labels]},
  '/layout': {html: LayoutStuff, file: 'components/Layout.md', name: 'Layout', category: 'Components', packages: [Layout, Trigger]},
  '/lists': {html: ListsStuff, file: 'components/Lists.md', name: 'Lists', category: 'Components', packages: [Lists, DraggableList, StreamList]},
  '/media': {html: MediaStuff, file: 'components/Media.md', name: 'Media', category: 'Components', packages: [Media]},
  '/modals': {html: ModalsStuff, file: 'components/Modals.md', name: 'Modals', category: 'Components', packages: [Modals]},
  '/notifications': {html: NotificationsStuff, file: 'components/Notifications.md', name: 'Notifications', category: 'Components', packages: [Notifications]},
  '/pagination': {html: PaginationStuff, file: 'components/Pagination.md', name: 'Pagination', category: 'Components', packages: [Pagination]},
  '/panes': {html: PanesStuff, file: 'components/Panes.md', name: 'Panes', category: 'Components', packages: [Panes]},
  '/panels': {html: PanelsStuff, file: 'components/Panels.md', name: 'Panels', category: 'Components', packages: [Panels]},
  '/portals': {html: PortalsStuff, file: 'components/Portals.md', name: 'Portals', category: 'Components', packages: [Portals]},
  '/select': {html: SelectStuff, file: 'components/Select.md', name: 'Select', category: 'Components', packages: [Select]},
  '/svg': {html: SvgStuff, file: 'components/Svg.md', name: 'Svg', category: 'Components', packages: [Svg]},
  '/tables': {html: TablesStuff, file: 'components/Tables.md', name: 'Tables', category: 'Components', packages: [Table]},
  '/tabs': {html: TabsStuff, file: 'components/Tabs.md', name: 'Tabs', category: 'Components', packages: [Tabs]},
  '/tooltips': {html: TooltipsStuff, file: 'components/Tooltips.md', name: 'Tooltips', category: 'Components', packages: [Tooltip]},
}

const attachToWindow = pakage => { // package is a reserved word
  Object.keys(pakage).forEach(key => {
    window[key] = pakage[key]
  })
}

const routeKeyToObject = k => {
  const obj = routes[k]
  obj.href = k
  return obj
}

export const styleItems = Object.keys(routes)
  .map(routeKeyToObject)
  .filter(i => i.category === 'Styles')

export const componentItems = Object.keys(routes)
  .map(routeKeyToObject)
  .filter(i => i.category === 'Components')

export const attachPackagesToWindow = () => {
  window.React = React
  window.ReactDOM = ReactDOM

  Object.keys(routes)
    .map(k => routes[k])
    .map(r => r.packages)
    .forEach(packages => packages.forEach(attachToWindow))
}

export default routes