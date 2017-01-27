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

const searchItems = componentItems.concat(styleItems)

const ContentLink = ({onClick, link, text}) => <a onClick={onClick}
                                                  href={link}
                                                  className="sidebar--item">{text}</a>

export default class Sidebar extends React.PureComponent {
  handleClick(event) {
    event.preventDefault()
    this.props.updateContent(event.target.href)
  }

  handlePick(event) {
    const link = searchItems.find(i => i.text == event.value).link;
    this.props.updateContent(link)
  }

  render() {
    const onInitializeItems = callback => callback(searchItems.map(item => item.text))
    const SearchBar = () => <Autocomplete onInitializeItems={onInitializeItems}
                                          placeholder="Search"
                                          onPick={this.handlePick.bind(this)}/>

    const styles = styleItems
      .map((style, i) => <ContentLink key={i}
                                      onClick={this.handleClick.bind(this)}
                                      link={style.link}
                                      text={style.text}/>)

    const components = componentItems
      .map((component, i) => <ContentLink key={i}
                                          onClick={this.handleClick.bind(this)}
                                          link={component.link}
                                          text={component.text}/>)

    return <div className="sidebar">
      <div className="sidebar--header">
        <Icon className="sidebar--icon" src="pivotal_ui_white"/>
        <div className="sidebar--title">Pivotal UI</div>
      </div>
      <SearchBar/>
      <div className="sidebar--items">
        <ContentLink onClick={this.handleClick.bind(this)} link="getstarted" text="Get Started"/>
        <Collapse className="sidebar--item" header="Styles">
          {styles}
        </Collapse>
        <Collapse className="sidebar--item" header="Components">
          {components}
        </Collapse>
        <ContentLink onClick={this.handleClick.bind(this)} link="upgradeguide" text="Upgrade Guide"/>
        <ContentLink onClick={this.handleClick.bind(this)} link="contribute" text="Contribute"/>
        <ContentLink onClick={this.handleClick.bind(this)} link="downloads" text="Downloads"/>
        <a className="sidebar--item" href="github.com/pivotal-cf/pivotal-ui">Github</a>
      </div>
    </div>
  }
}