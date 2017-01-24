import React from 'react'

const styleItems = [
  {text: 'Icons', link: 'icons'},
  {text: 'Colors', link: 'colors'},
  {text: 'Grid', link: 'grid'},
]

const componentItems = [
  {text: "Alerts", link: "alerts"},
  {text: "Alignment", link: "alignment"},
  {text: "Autocomplete", link: "autocomplete"},
  {text: "Buttons", link: "buttons"},
  {text: "Collapse", link: "collapse"},
  {text: "Copy To Clipboard", link: "copy_to_clipboard"},
  {text: "Dividers", link: "dividers"},
  {text: "Dropdowns", link: "dropdowns"},
  {text: "Ellipsis", link: "ellipsis"},
  {text: "Expander", link: "expander"},
  {text: "Forms", link: "forms"},
  {text: "Grids", link: "grids"},
  {text: "Hoverable", link: "hoverable"},
  {text: "Images", link: "images"},
  {text: "Labels", link: "labels"},
  {text: "Lists", link: "lists"},
  {text: "Media", link: "media"},
  {text: "Modals", link: "modals"},
  {text: "Notifications", link: "notifications"},
  {text: "Pagination", link: "pagination"},
  {text: "Panels", link: "panels"},
  {text: "Panes", link: "panes"},
  {text: "Portals", link: "portals"},
  {text: "Ribbons", link: "ribbons"},
  {text: "Select", link: "select"},
  {text: "Svg", link: "svg"},
  {text: "Tables", link: "tables"},
  {text: "Tabs", link: "tabs"},
  {text: "Tooltips", link: "tooltips"},
]

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
      <input className="sidebar--search" placeholder="search by component name"/>
      <div className="sidebar--content">
        <h2>Styles</h2>
        {styles}
        <h2>Components</h2>
        {components}
      </div>
    </div>
  }
}