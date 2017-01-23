import React from 'react'
import ReactDOM from 'react-dom'

import * as Alerts from 'pui-react-alerts'
import * as Autocomplete from 'pui-react-autocomplete'
import * as Top from 'pui-react-back-to-top'
import * as Buttons from 'pui-react-buttons'
import * as Checkbox from 'pui-react-checkbox'
import * as Collapse from 'pui-react-collapse'
import * as Clipboard from 'pui-react-copy-to-clipboard'
import * as Dividers from 'pui-react-dividers'
import * as DraggableList from 'pui-react-draggable-list'
import * as Lists from 'pui-react-lists'
import * as Dropdowns from 'pui-react-dropdowns'
import * as Expander from 'pui-react-expander'
import * as Grids from 'pui-react-grids'
import * as Iconography from 'pui-react-iconography'
import * as Images from 'pui-react-images'
import * as Inputs from 'pui-react-inputs'
import * as Labels from 'pui-react-labels'
import * as Media from 'pui-react-media'
import * as Modals from 'pui-react-modals'
import * as Notifications from 'pui-react-notifications'
import * as Trigger from 'pui-react-overlay-trigger'
import * as Pagination from 'pui-react-pagination'
import * as Panels from 'pui-react-panels'
import * as Panes from 'pui-react-panes'
import * as Portals from 'pui-react-portals'
import * as Radio from 'pui-react-radio'
import * as Ribbons from 'pui-react-ribbons'
import * as Table from 'pui-react-table'
import * as Select from 'pui-react-select'
import * as StreamList from 'pui-react-stream-list'
import * as Svg from 'pui-react-svg'
import * as Tabs from 'pui-react-tabs'
import * as Layout from 'pui-react-tile-layout'
import * as Toggle from 'pui-react-toggle'
import * as Tooltip from 'pui-react-tooltip'

const attachToWindow = pakage => { // package is a reserved word
  Object.keys(pakage).forEach(key => {
    window[key] = pakage[key]
  })
}

export default () => {
  window.React = React
  window.ReactDOM = ReactDOM

  const packages = [
    Alerts,
    Autocomplete,
    Top,
    Buttons,
    Checkbox,
    Collapse,
    Clipboard,
    Dividers,
    DraggableList,
    Lists,
    Dropdowns,
    Expander,
    Grids,
    Iconography,
    Images,
    Inputs,
    Labels,
    Media,
    Modals,
    Notifications,
    Trigger,
    Pagination,
    Panels,
    Panes,
    Portals,
    Radio,
    Ribbons,
    Table,
    Select,
    StreamList,
    Svg,
    Tabs,
    Layout,
    Toggle,
    Tooltip,
  ]
  packages.forEach(attachToWindow)
}