import React from 'react'
import {Autocomplete} from 'pui-react-autocomplete'
import {Iconography} from 'pui-react-iconography'
import {Collapse} from 'pui-react-collapse'

const styleItems = [
  {text: 'Icons', link: 'icons'},
  {text: 'Colors', link: 'colors'},
  {text: 'Grid', link: 'grid'},
]

const componentItems = [
  {text: 'Alerts', link: 'alerts'},
  {text: 'Alignment', link: 'alignment'},
  {text: 'Autocomplete', link: 'autocomplete'},
  {text: 'Buttons', link: 'buttons'},
  {text: 'Collapse', link: 'collapse'},
  {text: 'Copy To Clipboard', link: 'copy_to_clipboard'},
  {text: 'Dividers', link: 'dividers'},
  {text: 'Dropdowns', link: 'dropdowns'},
  {text: 'Ellipsis', link: 'ellipsis'},
  {text: 'Expander', link: 'expander'},
  {text: 'Forms', link: 'forms'},
  {text: 'Grids', link: 'grids'},
  {text: 'Hoverable', link: 'hoverable'},
  {text: 'Images', link: 'images'},
  {text: 'Labels', link: 'labels'},
  {text: 'Lists', link: 'lists'},
  {text: 'Media', link: 'media'},
  {text: 'Modals', link: 'modals'},
  {text: 'Notifications', link: 'notifications'},
  {text: 'Pagination', link: 'pagination'},
  {text: 'Panels', link: 'panels'},
  {text: 'Panes', link: 'panes'},
  {text: 'Portals', link: 'portals'},
  {text: 'Ribbons', link: 'ribbons'},
  {text: 'Select', link: 'select'},
  {text: 'Svg', link: 'svg'},
  {text: 'Tables', link: 'tables'},
  {text: 'Tabs', link: 'tabs'},
  {text: 'Tooltips', link: 'tooltips'},
]

const onPick = item => console.log('You selected ' + item.value)
const onInitializeItems = callback => callback(['foo', 'food', 'bar'])
const SearchBar = () => <Autocomplete onInitializeItems={onInitializeItems}
                                      placeholder="Search"
                                      onPick={onPick}/>

export default class Sidebar extends React.PureComponent {
  render() {
    const styles = styleItems
      .map((style, i) => <a key={i}
                            onClick={this.props.clickHandler}
                            href={style.link}
                            className="sidebar--item">{style.text}</a>)

    const components = componentItems
      .map((component, i) => <a key={i}
                                onClick={this.props.clickHandler}
                                href={component.link}
                                className="sidebar--item">{component.text}</a>)

    return <div className="sidebar">
      <div className="sidebar--header">
        <Icon className="sidebar--icon" src="pivotal_ui_white"/>
        <div className="sidebar--title">Pivotal UI</div>
      </div>
      <SearchBar/>
      <div className="sidebar--items">
        <a className="sidebar--item" href="">Get Started</a>
        <Collapse className="sidebar--item" header="Styles">
          {styles}
        </Collapse>
        <Collapse className="sidebar--item" header="Components">
          {components}
        </Collapse>
        <a className="sidebar--item" href="">Upgrade Guide</a>
        <a className="sidebar--item" href="">Contribute</a>
        <a className="sidebar--item" href="">Downloads</a>
        <a className="sidebar--item" href="">Github</a>
      </div>
    </div>
  }
}