import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from 'pivotal-ui/react/iconography';
import {Divider} from 'pivotal-ui/react/dividers';
import {routeData} from '../routes';
import Config from '../config';
import Anchor from './anchor';
import SearchBar from './search_bar';

const routeMatchesCurrentRoute = (currentRoute, route) => {
  return `/${currentRoute.split('/').filter(Boolean)[0] || ''}` === route;
};

const toAnchor = currentRoute => ({route, pageMetadata}) => (
  <Anchor {...{
    key: route,
    className: classnames('sidebar-link', {active: routeMatchesCurrentRoute(currentRoute, route)}),
    href: route
  }}>{pageMetadata.title}</Anchor>
);

const concepts = routeData.filter(({pageMetadata}) => pageMetadata && pageMetadata.menu === 'concepts');
const components = routeData.filter(({pageMetadata}) => pageMetadata && pageMetadata.menu === 'components');
const modifiers = routeData.filter(({pageMetadata}) => pageMetadata && pageMetadata.menu === 'modifiers');

export default class Sidebar extends PureComponent {
  static propTypes = {
    currentRoute: PropTypes.string
  };

  render() {
    const {currentRoute} = this.props;

    return (
      <nav className="sidebar bg-dark-2">
        <div className="sidebar-header">
          <Anchor href="/"><Icon className="sidebar--icon" src="pivotal_ui_white"/></Anchor>
          <div className="sidebar--title plxl">
            <h1 className="em-high h2">Pivotal UI</h1>
            <div className="h4">v{Config.get('puiVersion')}</div>
          </div>
        </div>
        <SearchBar/>
        <Anchor {...{
          href: '/get-started',
          className: classnames('sidebar-link', {
            active: routeMatchesCurrentRoute(currentRoute, '/') || routeMatchesCurrentRoute(currentRoute, '/get-started')
          })
        }}>Get Started</Anchor>
        <Anchor {...{
          href: '/faq',
          className: classnames('sidebar-link', {active: routeMatchesCurrentRoute(currentRoute, '/faq')})
        }}>FAQ</Anchor>
        <Anchor {...{
          href: '/upgrade-guide',
          className: classnames('sidebar-link', {active: routeMatchesCurrentRoute(currentRoute, '/upgrade-guide')})
        }}>Upgrade Guide</Anchor>
        <Anchor {...{
          href: '/contribute',
          className: classnames('sidebar-link', {active: routeMatchesCurrentRoute(currentRoute, '/contribute')})
        }}>Contribute</Anchor>
        <Anchor {...{
          href: '/versions',
          className: classnames('sidebar-link', {active: routeMatchesCurrentRoute(currentRoute, '/versions')})
        }}>Versions</Anchor>
        <Anchor {...{
          href: 'https://github.com/pivotal-cf/pivotal-ui',
          target: '_blank',
          className: 'sidebar-link'
        }}>GitHub<Icon src="open_in_new" verticalAlign="baseline" className="mlm"/></Anchor>
        <Divider inverse className="mvl"/>
        <div className="em-high h4 pvl plxl prl">Concepts</div>
        {concepts.map(toAnchor(currentRoute))}
        <Divider inverse className="mvl"/>
        <div className="em-high h4 pvl plxl prl">Components</div>
        {components.map(toAnchor(currentRoute))}
        <Divider inverse className="mvl"/>
        <div className="em-high h4 pvl plxl prl">Modifiers</div>
        {modifiers.map(toAnchor(currentRoute))}
      </nav>
    );
  }
}