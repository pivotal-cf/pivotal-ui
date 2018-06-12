import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Icon} from 'pivotal-ui/react/iconography';
import {Input} from 'pivotal-ui/react/inputs';
import {Divider} from 'pivotal-ui/react/dividers';
import routes from '../routes';
import Config from '../config';
import Anchor from './anchor';

const routeMatchesCurrentRoute = (currentRoute, route) => {
  return `/${currentRoute.split('/').filter(Boolean)[0]}` === route;
}

const byPageTitle = (a, b) => {
  const aTitle = (a.pageMetadata.title || '').toLowerCase();
  const bTitle = (b.pageMetadata.title || '').toLowerCase();
  return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
};

const routeData = Object.values(routes);
const components = routeData.sort(byPageTitle).filter(({pageMetadata}) => pageMetadata && pageMetadata.menu === 'components');
const modifiers = routeData.sort(byPageTitle).filter(({pageMetadata}) => pageMetadata && pageMetadata.menu === 'modifiers');
const searchItems = routeData.map(({pageMetadata}) => pageMetadata && pageMetadata.title);

export default class Sidebar extends PureComponent {
  static propTypes = {
    currentRoute: PropTypes.string
  }

  handlePick = evt => {
    const searchItem = searchItems.find(i => i === evt.value);
    if (!searchItem) return;
    // this.props.navigate(searchItem.href);
  }

  render() {
    const {currentRoute} = this.props;

    const SearchBar = () => (
      <Autocomplete {...{
        onInitializeItems: callback => callback(searchItems),
        placeholder: 'Search',
        className: 'sidebar--search ptl phxl mbxl',
        input: <AutocompleteInput><Input icon="search"/></AutocompleteInput>,
        onPick: this.handlePick,
        showNoSearchResults: true
      }}/>
    );

    const componentLinks = components.map(({route, pageMetadata}) => (
      <Anchor {...{
        key: route,
        className: classnames('sidebar-link', {active: routeMatchesCurrentRoute(currentRoute, route)}),
        href: route
      }}>{pageMetadata.title}</Anchor>
    ));

    const modifierLinks = modifiers.map(({route, pageMetadata}) => (
      <Anchor {...{
        key: route,
        className: classnames('sidebar-link', {active: routeMatchesCurrentRoute(currentRoute, route)}),
        href: route
      }}>{pageMetadata.title}</Anchor>
    ));

    return (
      <nav className="sidebar bg-dark-2">
        <div className="sidebar-header">
          <Icon className="sidebar--icon" src="pivotal_ui_white"/>
          <div className="sidebar--title plxl">
            <h1 className="em-high h2">Pivotal UI</h1>
            <div className="h4">v{Config.get('puiVersion')}</div>
          </div>
        </div>
        <SearchBar/>
        <Anchor {...{
          href: '/getstarted',
          className: classnames('sidebar-link', {
            active: ['/', '/getstarted'].indexOf(currentRoute) !== -1
          })
        }}>Get Started</Anchor>
        <Anchor {...{
          href: '/faq',
          className: classnames('sidebar-link', {active: currentRoute === '/faq'})
        }}>FAQ</Anchor>
        <Anchor {...{
          href: '/upgradeguide',
          className: classnames('sidebar-link', {active: currentRoute === '/upgradeguide'})
        }}>Upgrade Guide</Anchor>
        <Anchor {...{
          href: '/contribute',
          className: classnames('sidebar-link', {active: currentRoute === '/contribute'})
        }}>Contribute</Anchor>
        <Anchor {...{
          href: '/versions',
          className: classnames('sidebar-link', {active: currentRoute === '/versions'})
        }}>Versions</Anchor>
        <Anchor {...{
          href: 'https://github.com/pivotal-cf/pivotal-ui',
          target: '_blank',
          className: 'sidebar-link'
        }}>GitHub</Anchor>
        <Divider inverse className="mvl"/>
        <div className="em-high h4 pvl plxl prl">Components</div>
        {componentLinks}
        <Divider inverse className="mvl"/>
        <div className="em-high h4 pvl plxl prl">Modifiers</div>
        {modifierLinks}
      </nav>
    );
  }
}