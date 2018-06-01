import React from 'react';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Icon} from 'pivotal-ui/react/iconography';
import {Input} from 'pivotal-ui/react/inputs';
import routes from '../routes';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {version} from '../../../pivotal-ui/package.json';

const components = Object.values(routes).filter(({category}) => category === 'component');
const modifiers = Object.values(routes).filter(({category}) => category === 'modifier');
const searchItems = Object.values(routes).map(({pageMetadata}) => pageMetadata.title);

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

  handleClick = evt => {
    evt.preventDefault();
    this.props.updateContent(evt.target.href);
  }

  handlePick = evt => {
    const searchItem = searchItems.find(i => i === evt.value);
    if (!searchItem) return;
    this.props.updateContent(searchItem.href);
  }

  render() {
    const SearchBar = () => (
      <Autocomplete {...{
        onInitializeItems: callback => callback(searchItems),
        placeholder: 'Search',
        className: 'sidebar--search phxl mbxl',
        input: <AutocompleteInput><Input icon="search"/></AutocompleteInput>,
        onPick: this.handlePick,
        showNoSearchResults: true
      }}/>
    );

    const componentLinks = components.map(({href, pageMetadata}) => (
      <ContentLink {...{
        key: href,
        className: 'sidebar-component',
        onClick: this.handleClick,
        link: href,
        text: pageMetadata.title,
        active: href === this.props.activePath
      }}/>
    ));

    const modifierLinks = modifiers.map(({href, pageMetadata}) => (
      <ContentLink {...{
        key: href,
        className: 'sidebar-component',
        onClick: this.handleClick,
        link: href,
        text: pageMetadata.title,
        active: href === this.props.activePath
      }}/>
    ));

    return (
      <nav className="sidebar">
        <div className="sidebar--header">
          <Icon className="sidebar--icon" src="pivotal_ui_white"/>
          <div className="sidebar--title plxl">
            <h1 className="em-high h2">Pivotal UI</h1>
            <div className="h4">v{version}</div>
          </div>
        </div>
        <SearchBar/>
        <div className="sidebar--items">
          <ContentLink {...{
            onClick: this.handleClick,
            link: 'getstarted',
            text:'Get Started',
            active: ['', 'getstarted', 'index.html'].indexOf(this.props.activePath) !== -1
          }}/>
          <ContentLink {...{
            onClick: this.handleClick,
            link: 'faq',
            text:'FAQ',
            active: this.props.activePath === 'faq'
          }}/>
          <ContentLink {...{
            onClick: this.handleClick,
            link: 'upgradeguide',
            text:'Upgrade Guide',
            active: this.props.activePath === 'upgradeguide'
          }}/>
          <ContentLink {...{
            onClick: this.handleClick,
            link: 'contribute',
            text:'Contribute',
            active: this.props.activePath === 'contribute'
          }}/>
          <ContentLink {...{
            onClick: this.handleClick,
            link: 'versions',
            text:'Versions',
            active: this.props.activePath === 'versions'
          }}/>
          <a className="sidebar--item" href="https://github.com/pivotal-cf/pivotal-ui" target="_blank">GitHub Repo</a>
          <div className="sidebar-components em-high pvl plxl prl">Components</div>
          {componentLinks}
          <div className="sidebar-components em-high pvl plxl prl">Modifiers</div>
          {modifierLinks}
        </div>
      </nav>
    );
  }
}