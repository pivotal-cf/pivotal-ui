import React from 'react'
import ReactDOM from 'react-dom'

import '../stylesheets/app.scss'

import SideBar from './components/Sidebar'
import Content from './components/Content'

import ColorsStuff from '../docs/styles/Colors.md'
import GridcssStuff from '../docs/styles/Grid.md'
import IconsStuff from '../docs/styles/Icons.md'

import AlertsStuff from '../docs/components/Alerts.md'
import AlignmentStuff from '../docs/components/Alignment.md'
import AutocompleteStuff from '../docs/components/Autocomplete.md'
import ButtonsStuff from '../docs/components/Buttons.md'
import CollapseStuff from '../docs/components/Collapse.md'
import CopyToClipboardStuff from '../docs/components/CopyToClipboard.md'
import DividersStuff from '../docs/components/Dividers.md'
import DropdownsStuff from '../docs/components/Dropdowns.md'
import EllipsisStuff from '../docs/components/Ellipsis.md'
import ExpanderStuff from '../docs/components/Expander.md'
import FormsStuff from '../docs/components/Forms.md'
import GridsStuff from '../docs/components/Grids.md'
import HoverableStuff from '../docs/components/Hoverable.md'
import ImagesStuff from '../docs/components/Images.md'
import LabelsStuff from '../docs/components/Labels.md'
import ListsStuff from '../docs/components/Lists.md'
import MediaStuff from '../docs/components/Media.md'
import ModalsStuff from '../docs/components/Modals.md'
import NotificationsStuff from '../docs/components/Notifications.md'
import PaginationStuff from '../docs/components/Pagination.md'
import PanesStuff from '../docs/components/Panes.md'
import PanelsStuff from '../docs/components/Panels.md'
import PortalsStuff from '../docs/components/Portals.md'
import ResponsiveUtilitiesStuff from '../docs/components/ResponsiveUtilities.md'
import RibbonStuff from '../docs/components/Ribbons.md'
import SelectStuff from '../docs/components/Select.md'
import SvgStuff from '../docs/components/Svg.md'
import TablesStuff from '../docs/components/Tables.md'
import TabsStuff from '../docs/components/Tabs.md'
import TooltipsStuff from '../docs/components/Tooltips.md'

const content = {
  "/colors": ColorsStuff,
  "/gridcss": GridcssStuff,
  "/icons": IconsStuff,

  "/alerts": AlertsStuff,
  "/alignment": AlignmentStuff,
  "/autocomplete": AutocompleteStuff,
  "/buttons": ButtonsStuff,
  "/collapse": CollapseStuff,
  "/copy_to_clipboard": CopyToClipboardStuff,
  "/dividers": DividersStuff,
  "/dropdowns": DropdownsStuff,
  "/ellipsis": EllipsisStuff,
  "/expander": ExpanderStuff,
  "/forms": FormsStuff,
  "/grids": GridsStuff,
  "/hoverable": HoverableStuff,
  "/images": ImagesStuff,
  "/labels": LabelsStuff,
  "/lists": ListsStuff,
  "/media": MediaStuff,
  "/modals": ModalsStuff,
  "/notifications": NotificationsStuff,
  "/pagination": PaginationStuff,
  "/panes": PanesStuff,
  "/panels": PanelsStuff,
  "/portals": PortalsStuff,
  "/responsive_utilities": ResponsiveUtilitiesStuff,
  "/ribbon": RibbonStuff,
  "/select": SelectStuff,
  "/svg": SvgStuff,
  "/tables": TablesStuff,
  "/tabs": TabsStuff,
  "/tooltips": TooltipsStuff,
}

const homepage = <div className="content">
  Make a selection on the left
</div>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {content: App.currentContent()}
  }

  updateContent(event) {
    event.preventDefault()
    window.history.pushState({}, '', event.target.href)
    this.setState({content: App.currentContent()})
  }

  static currentContent() {
    const path = window.location.pathname

    if(path === "/" || !content[path]) {
      return false
    }

    return content[path]
  }

  render() {
    return <div id="app">
      <SideBar clickHandler={this.updateContent.bind(this)}/>
      {this.state.content ? <Content content={this.state.content}/> : homepage}
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))