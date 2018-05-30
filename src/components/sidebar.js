import React from 'react';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Icon} from 'pivotal-ui/react/iconography';
import {Input} from 'pivotal-ui/react/inputs';
import {componentItems} from '../helpers/content';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const searchItems = componentItems;

const ContentLink = ({onClick, link, text, active, className}) => {
  return (
    <div className={classnames(className, 'sidebar--item-wrapper',
      {'sidebar--item-wrapper__active': active})}>
      <a onClick={onClick}
         href={link}
         className="sidebar--item">{text}</a>
    </div>
  );
};

ContentLink.propTypes = {
  onClick: PropTypes.func,
  link: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string
};

export default class Sidebar extends React.PureComponent {
  static propTypes = {
    activePath: PropTypes.string,
    updateContent: PropTypes.func.isRequired
  }

  handleClick(event) {
    event.preventDefault();
    this.props.updateContent(event.target.href);
  }

  handlePick(event) {
    const searchItem = searchItems.find(i => i.name === event.value);
    if (!searchItem) return;
    this.props.updateContent(searchItem.href);
  }

  render() {
    const onInitializeItems = callback => callback(searchItems.map(item => item.name));
    const SearchBar = () => (<Autocomplete onInitializeItems={onInitializeItems}
                                          placeholder="Search"
                                          className="sidebar--search phxl mbxl"
                                          input={<AutocompleteInput><Input icon="search"/></AutocompleteInput>}
                                          onPick={this.handlePick.bind(this)}
                                          showNoSearchResults={true}/>);

    const components = componentItems
      .map((component, i) => (<ContentLink key={i}
                                          className="sidebar-component"
                                          onClick={this.handleClick.bind(this)}
                                          link={component.href}
                                          text={component.name}
                                          active={component.href === this.props.activePath}/>));

    return (
      <div className="sidebar">
        <div className="sidebar--header">
          <Icon className="sidebar--icon" src="pivotal_ui_white"/>
          <div className="sidebar--title plxl">Pivotal UI</div>
        </div>
        <SearchBar/>
        <div className="sidebar--items">
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="getstarted"
                       text="Get Started"
                       active={['', 'getstarted', 'index.html'].indexOf(this.props.activePath) !== -1}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="faq"
                       text="FAQ"
                       active={this.props.activePath === 'faq'}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="upgradeguide"
                       text="Upgrade Guide"
                       active={this.props.activePath === 'upgradeguide'}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="contribute"
                       text="Contribute"
                       active={this.props.activePath === 'contribute'}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="versions"
                       text="Versions"
                       active={this.props.activePath === 'versions'}/>
          <a className="sidebar--item" href="https://github.com/pivotal-cf/pivotal-ui">Github</a>
          <ContentLink text="Components" className="sidebar-components"/>
          {components}
        </div>
      </div>
    );
  }
}