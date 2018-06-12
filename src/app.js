import React, {Component} from 'react';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import Sidebar from './components/sidebar';
import {getRouteContent} from './routes';
import Router from './helpers/router';
import Page from './components/page';
import 'pivotal-ui/js/prismjs';
import '../stylesheets/app.scss';

const cssRequireContext = require.context('pivotal-ui/css/', true, /\.scss/);
cssRequireContext.keys().map(cssRequireContext);

export default class App extends Component {
  state = {
    currentRoute: window.location.pathname,
    routeContent: getRouteContent(window.location.pathname)
  };

  componentDidMount() {
    Router.onRouteChange((currentRoute, routeContent) => {
      this.setState({currentRoute, routeContent});
    });
  }

  componentWillUnmount() {
    Router.destroy();
  }

  render() {
    const {currentRoute, routeContent} = this.state;
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
          <Sidebar {...{currentRoute}}/>
        </FlexCol>
        <FlexCol id="content" className="content">
          <Page {...{currentRoute, key: currentRoute, ...routeContent}}/>
          {footer}
        </FlexCol>
      </Grid>
    );
  }
}