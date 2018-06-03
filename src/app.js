import React, {PureComponent} from 'react';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import Sidebar from './components/sidebar';
import './global_pui';
import 'pivotal-ui/js/prismjs';
import '../stylesheets/app.scss';
import {getRouteContent} from './routes';

const initialRoute = window.location.pathname;
const initialRouteContent = getRouteContent(initialRoute);

export default class App extends PureComponent {
  state = {route: initialRoute, routeContent: initialRouteContent};

  render() {
    const {navigate} = this.props;
    const {route, routeContent: {PageComponent}} = this.state;

    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const footer = (
      <footer className="paxxxl">
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
          <Sidebar {...{navigate, route}}/>
        </FlexCol>
        <FlexCol id="content" className="content">
          <PageComponent {...{navigate}}/>
          {footer}
        </FlexCol>
      </Grid>
    );
  }
}