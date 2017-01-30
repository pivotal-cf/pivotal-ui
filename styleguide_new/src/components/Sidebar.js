import React from 'react'
import {Autocomplete} from 'pui-react-autocomplete'
import {Iconography, Icon} from 'pui-react-iconography'
import {Collapse} from 'pui-react-collapse'
import {styleItems, componentItems} from '../helpers/content'

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
    const link = searchItems.find(i => i.name == event.value).href;
    this.props.updateContent(link)
  }

  render() {
    const onInitializeItems = callback => callback(searchItems.map(item => item.name))
    const SearchBar = () => <Autocomplete onInitializeItems={onInitializeItems}
                                          placeholder="Search"
                                          onPick={this.handlePick.bind(this)}/>

    const styles = styleItems
      .map((style, i) => <ContentLink key={i}
                                      onClick={this.handleClick.bind(this)}
                                      link={style.href}
                                      text={style.name}/>)

    const components = componentItems
      .map((component, i) => <ContentLink key={i}
                                          onClick={this.handleClick.bind(this)}
                                          link={component.href}
                                          text={component.name}/>)

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
        <a className="sidebar--item" href="https://github.com/pivotal-cf/pivotal-ui">Github</a>
      </div>
    </div>
  }
}