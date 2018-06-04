import React, {Component} from 'react';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import Sidebar from './components/sidebar';
import 'pivotal-ui/js/prismjs';
import '../stylesheets/app.scss';
import routes, {getRouteContent} from './routes';
import Router from './helpers/router';
import Page from './components/page';

const cssRequireContext = require.context('pivotal-ui/css/', true, /\.scss/);
cssRequireContext.keys().map(cssRequireContext);

Object.values(routes).forEach(({pageMetadata}) => {
  if (!pageMetadata || !pageMetadata.reactPath) return;
  const componentPath = pageMetadata.reactPath.split('/').pop();
  const exported = require(`pivotal-ui/react/${componentPath}`);
  Object.entries(exported).forEach(([key, value]) => window[key] = value);
});

export default class App extends Component {
  state = {
    route: window.location.pathname,
    routeContent: getRouteContent(window.location.pathname)
  };

  componentDidMount() {
    Router.onRouteChange((route, routeContent) => {
      this.setState({route, routeContent});
    });
  }

  componentWillUnmount() {
    Router.destroy();
  }

  render() {
    const {route, routeContent} = this.state;
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const footer = (
      <footer className="pvxl phxxxl">
        © {year} <a href="https://pivotal.io">Pivotal Software</a>, Inc. All Rights Reserved.
        <span className="pln">
          <span className="policy-link"><a href="https://pivotal.io/privacy-policy">Privacy Policy</a></span>
          <span className="policy-link"><a href="https://pivotal.io/terms-of-use">Terms of Use</a></span>
          <span className="policy-link" id="teconsent"/>
        </span>
      </footer>
    );

    return (
      <Grid id="app" gutter={false}>
        <FlexCol fixed>
          <Sidebar {...{route}}/>
        </FlexCol>
        <FlexCol id="content" className="content">
          <Page {...{route, ...routeContent}}/>
          {footer}
        </FlexCol>
      </Grid>
    );
  }
}