import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from 'pivotal-ui/react/iconography';
import {Divider} from 'pivotal-ui/react/dividers';
import Config from '../config';
import SearchBar from './search_bar';

const routeMatchesCurrentRoute = (currentRoute, route) => currentRoute.substring(0, currentRoute.lastIndexOf('/')) === route.substring(0, route.lastIndexOf('/'));

const toLink = ({route, parentTitle}, currentRoute) => (
  <Link {...{
    key: route,
    className: classnames('sidebar-link', {active: routeMatchesCurrentRoute(currentRoute, route)}),
    to: route
  }}>{parentTitle}</Link>
);

export default class Sidebar extends PureComponent {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    currentRoute: PropTypes.string.isRequired
  };

  render() {
    const {routes, currentRoute} = this.props;
    const concepts = [];
    const components = [];
    const modifiers = [];
    const others = [];

    const sidebarRoutes = Object.values(
      Object.values(routes)
        .reduce((memo, route) => {
          return {
            ...memo,
            [route.parentTitle]: memo[route.parentTitle] && memo[route.parentTitle].tabHeaderIndex < route.tabHeaderIndex ? memo[route.parentTitle] : route
          };
        }, {}));

    Object.values(sidebarRoutes).forEach(route => {
      if (route.route.startsWith('/concepts/')) concepts.push(route);
      else if (route.route.startsWith('/components/')) components.push(route);
      else if (route.route.startsWith('/modifiers/')) modifiers.push(route);
      else if (!route.route.startsWith('/404')) others.push(route);
    });

    const fileNumRegex = /^\.\/(-?\d+)\./;
    others.sort((a, b) => parseInt(a.file.match(fileNumRegex)[1], 10) > parseInt(b.file.match(fileNumRegex)[1], 10));

    return (
      <nav className="sidebar bg-dark-2">
        <div className="sidebar-header">
          <Link to="/"><Icon className="sidebar-icon" src="pivotal_ui_white"/></Link>
          <div className="sidebar-title plxl">
            <h1 className="em-high h2">Pivotal UI</h1>
            <div className="h4">v{Config.get('puiVersion')}</div>
          </div>
        </div>
        <SearchBar {...{routes}}/>
        {others.map(route => toLink(route, currentRoute))}
        <a {...{
          href: 'https://github.com/pivotal-cf/pivotal-ui',
          target: '_blank',
          className: 'sidebar-link'
        }}>GitHub<Icon src="open_in_new" verticalAlign="baseline" className="mlm"/></a>

        <Divider inverse className="mvl"/>
        <div className="em-high h4 pvl plxl prl">Concepts</div>
        {concepts.map(route => toLink(route, currentRoute))}
        <Divider inverse className="mvl"/>
        <div className="em-high h4 pvl plxl prl">Components</div>
        {components.map(route => toLink(route, currentRoute))}
        <Divider inverse className="mvl"/>
        <div className="em-high h4 pvl plxl prl">Modifiers</div>
        {modifiers.map(route => toLink(route, currentRoute))}
      </nav>
    );
  }
}