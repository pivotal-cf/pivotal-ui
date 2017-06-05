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
import * as Pagination from 'pui-react-pagination'
import * as Panels from 'pui-react-panels'
import * as Panes from 'pui-react-panes'
import * as Portals from 'pui-react-portals'
import * as Radio from 'pui-react-radio'
import * as Table from 'pui-react-table'
import * as Trigger from 'pui-react-overlay-trigger'
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

import ColorsJson from '../../docs/styles/Colors.md'
import GridcssJson from '../../docs/styles/Grid.md'
import IconsJson from '../../docs/styles/Icons.md'

import AlertsJson from '../../docs/components/Alerts.md'
import AlignmentJson from '../../docs/components/Alignment.md'
import AutocompleteJson from '../../docs/components/Autocomplete.md'
import BackToTopJson from '../../docs/components/BackToTop.md'
import ButtonsJson from '../../docs/components/Buttons.md'
import CollapseJson from '../../docs/components/Collapse.md'
import CopyToClipboardJson from '../../docs/components/CopyToClipboard.md'
import DividersJson from '../../docs/components/Dividers.md'
import DropdownsJson from '../../docs/components/Dropdowns.md'
import EllipsisJson from '../../docs/components/Ellipsis.md'
import ExpanderJson from '../../docs/components/Expander.md'
import FormsJson from '../../docs/components/Forms.md'
import GridsJson from '../../docs/components/Grids.md'
import HoverableJson from '../../docs/components/Hoverable.md'
import ImagesJson from '../../docs/components/Images.md'
import LabelsJson from '../../docs/components/Labels.md'
import LayoutJson from '../../docs/components/Layout.md'
import ListsJson from '../../docs/components/Lists.md'
import MediaJson from '../../docs/components/Media.md'
import ModalsJson from '../../docs/components/Modals.md'
import NotificationsJson from '../../docs/components/Notifications.md'
import PaginationJson from '../../docs/components/Pagination.md'
import PanesJson from '../../docs/components/Panes.md'
import PanelsJson from '../../docs/components/Panels.md'
import PortalsJson from '../../docs/components/Portals.md'
import SelectJson from '../../docs/components/Select.md'
import SvgJson from '../../docs/components/Svg.md'
import TablesJson from '../../docs/components/Tables.md'
import TabsJson from '../../docs/components/Tabs.md'
import TooltipsJson from '../../docs/components/Tooltips.md'

const routes = {
  '/': {json: Homepage, file: 'Homepage.md', name: 'Homepage', category: 'Base', packages: []},
  '/getstarted': {json: GetStarted, file: 'GetStarted.md', name: 'Get Started', category: 'Base', packages: []},
  '/upgradeguide': {json: UpgradeGuide, file: 'UpgradeGuide.md', name: 'Upgrade Guide', category: 'Base', packages: []},
  '/contribute': {json: Contribute, file: 'Contribute.md', name: 'Contribute', category: 'Base', packages: []},
  '/downloads': {json: Downloads, file: 'Downloads.md', name: 'Downloads', category: 'Base', packages: []},
  '/404': {json: NotFound, file: '404.md', name: '404 Not Found', category: 'Ignored', packages: []},

  '/colors': {json: ColorsJson, file: 'styles/Colors.md', name: 'Colors', category: 'Styles', packages: [Bootstrap]},
  '/gridcss': {json: GridcssJson, file: 'styles/Grid.md', name: 'Grids', category: 'Styles', packages: []},
  '/icons': {json: IconsJson, file: 'styles/Icons.md', name: 'Icons', category: 'Styles', packages: [Iconography]},

  '/alerts': {json: AlertsJson, file: 'components/Alerts.md', name: 'Alerts', category: 'Components', packages: [Alerts]},
  '/alignment': {json: AlignmentJson, file: 'components/Alignment.md', name: 'Alignment', category: 'Components', packages: [Alignment]},
  '/autocomplete': {json: AutocompleteJson, file: 'components/Autocomplete.md', name: 'Autocomplete', category: 'Components', packages: [Autocomplete]},
  '/backtotop': {json: BackToTopJson, file: 'components/Backtotop.md', name: 'Back To Top', category: 'Components', packages: [Top]},
  '/buttons': {json: ButtonsJson, file: 'components/Buttons.md', name: 'Buttons', category: 'Components', packages: [Buttons]},
  '/collapse': {json: CollapseJson, file: 'components/Collapse.md', name: 'Collapse', category: 'Components', packages: [Collapse]},
  '/copy_to_clipboard': {json: CopyToClipboardJson, file: 'components/CopyToClipboard.md', name: 'CopyToClipboard', category: 'Components', packages: [Clipboard]},
  '/dividers': {json: DividersJson, file: 'components/Dividers.md', name: 'Dividers', category: 'Components', packages: [Dividers]},
  '/dropdowns': {json: DropdownsJson, file: 'components/Dropdowns.md', name: 'Dropdowns', category: 'Components', packages: [Dropdowns]},
  '/ellipsis': {json: EllipsisJson, file: 'components/Ellipsis.md', name: 'Ellipsis', category: 'Components', packages: [Ellipsis]},
  '/expander': {json: ExpanderJson, file: 'components/Expander.md', name: 'Expander', category: 'Components', packages: [Expander]},
  '/forms': {json: FormsJson, file: 'components/Forms.md', name: 'Forms', category: 'Components', packages: [Checkbox, Inputs, Radio, Toggle]},
  '/grids': {json: GridsJson, file: 'components/Grids.md', name: 'Grids', category: 'Components', packages: [Grids]},
  '/hoverable': {json: HoverableJson, file: 'components/Hoverable.md', name: 'Hoverable', category: 'Components', packages: [Hoverable]},
  '/images': {json: ImagesJson, file: 'components/Images.md', name: 'Images', category: 'Components', packages: [Images]},
  '/labels': {json: LabelsJson, file: 'components/Labels.md', name: 'Labels', category: 'Components', packages: [Labels]},
  '/layout': {json: LayoutJson, file: 'components/Layout.md', name: 'Layout', category: 'Components', packages: [Layout, Trigger]},
  '/lists': {json: ListsJson, file: 'components/Lists.md', name: 'Lists', category: 'Components', packages: [Lists, DraggableList, StreamList]},
  '/media': {json: MediaJson, file: 'components/Media.md', name: 'Media', category: 'Components', packages: [Media]},
  '/modals': {json: ModalsJson, file: 'components/Modals.md', name: 'Modals', category: 'Components', packages: [Modals]},
  '/notifications': {json: NotificationsJson, file: 'components/Notifications.md', name: 'Notifications', category: 'Components', packages: [Notifications]},
  '/pagination': {json: PaginationJson, file: 'components/Pagination.md', name: 'Pagination', category: 'Components', packages: [Pagination]},
  '/panes': {json: PanesJson, file: 'components/Panes.md', name: 'Panes', category: 'Components', packages: [Panes]},
  '/panels': {json: PanelsJson, file: 'components/Panels.md', name: 'Panels', category: 'Components', packages: [Panels]},
  '/portals': {json: PortalsJson, file: 'components/Portals.md', name: 'Portals', category: 'Components', packages: [Portals]},
  '/select': {json: SelectJson, file: 'components/Select.md', name: 'Select', category: 'Components', packages: [Select]},
  '/svg': {json: SvgJson, file: 'components/Svg.md', name: 'Svg', category: 'Components', packages: [Svg]},
  '/tables': {json: TablesJson, file: 'components/Tables.md', name: 'Tables', category: 'Components', packages: [Table]},
  '/tabs': {json: TabsJson, file: 'components/Tabs.md', name: 'Tabs', category: 'Components', packages: [Tabs]},
  '/tooltips': {json: TooltipsJson, file: 'components/Tooltips.md', name: 'Tooltips', category: 'Components', packages: [Tooltip]},
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