import React, {Component} from 'react';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import Sidebar from './components/sidebar';
import {Route, Switch, Redirect} from 'react-router-dom';
import Page from './components/page';
import '../stylesheets/app.scss';

const requirePuiCss = require.context('pivotal-ui/css/', true, /\.scss$/);
requirePuiCss.keys().map(requirePuiCss);

const requirePuiReact = require.context('pivotal-ui/react/', true, /index\.js$/);
requirePuiReact.keys().map(file => {
  Object.entries(requirePuiReact(file)).forEach(([key, value]) => window[key] = value);
});

window.Icons = require('pivotal-ui/react/iconography/icons');
window.colorPalette = {
  neutral: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  dark: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  brand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  accent: [1, 2, 3, 4, 5, 6],
  error: [1, 2, 3, 4, 5, 6],
  warn: [1, 2, 3, 4, 5, 6],
  success: [1, 2, 3, 4, 5, 6]
};

export default class App extends Component {
  render() {
    const {routes, location} = this.props;
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
      <Grid id="app" gutter={false}>
        <FlexCol fixed>
          <Sidebar {...{routes, currentRoute: location.pathname}}/>
        </FlexCol>
        <FlexCol id="content" className="content">
          <Switch>
            {Object.keys(routes).map((path, key) =>
              <Route exact {...{key, path, render: props => <Page {...{...props, routes}}/>}}/>
            )}
            <Redirect from="/"  to="/get_started/installation"/>
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
        </FlexCol>
      </Grid>
    );
  }
}