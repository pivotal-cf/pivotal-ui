import React, {Component} from 'react';
import Sidebar from './components/sidebar';
import {Route, Switch, Redirect} from 'react-router-dom';
import Page from './components/page';
import '../stylesheets/app.scss';
import {getRoutes} from './helpers/routes_helper';
import processor from './helpers/markdown_processor';

const requirePuiCss = require.context('pivotal-ui/css/', true, /\.scss$/);
requirePuiCss.keys().map(requirePuiCss);

const requirePuiReact = require.context('pivotal-ui/react/', true, /index\.js$/);
requirePuiReact.keys().map(file => Object.entries(requirePuiReact(file))
  .forEach(([key, value]) => window[key] = value));

const routes = getRoutes({processor, requireFunc: require.context('../docs', true, /\.md$/)});

window.Icons = require('pivotal-ui/react/iconography/icons');
window.colorPalette = [
  ['black', 'dark-gray', 'gray', 'accent-gray', 'light-gray', 'white'],
  ['teal', 'accent-teal', 'light-teal'],
  ['dark-blue', 'blue', 'accent-blue', 'light-blue'],
  ['dark-red', 'red', 'light-red'],
  ['green', 'accent-green', 'light-green'],
  ['decorative-yellow', 'light-yellow']
];

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

export default class App extends Component {
  render() {
    const {location} = this.props;
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
      <div id="app">
        <Sidebar {...{routes, currentRoute: location.pathname}}/>
        <div id="content" className="content">
          <Route component={ScrollToTop}/>
          <Switch>
            {Object.keys(routes).map((path, key) =>
              <Route exact {...{key, path, render: props => <Page {...{...props, routes}}/>}}/>
            )}
            <Redirect from="/" to="/get_started/installation"/>
            <Route {...{render: () => <Page {...{match: {path: '/404/404'}, routes}}/>}}/>
          </Switch>

          <footer className="pvxl phxxxl">
            © {year} <a href="https://pivotal.io" target="_blank">Pivotal Software</a>, Inc. All Rights Reserved.
            <span className="pln">
              <span className="policy-link"><a href="https://pivotal.io/privacy-policy"
                                               target="_blank">Privacy Policy</a></span>
              <span className="policy-link"><a href="https://pivotal.io/terms-of-use"
                                               target="_blank">Terms of Use</a></span>
              <span className="policy-link" id="teconsent"/>
            </span>
          </footer>
        </div>
      </div>
    );
  }
}