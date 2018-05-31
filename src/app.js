import React from 'react';
import Sidebar from './components/sidebar';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import '../stylesheets/app.scss';
import 'pivotal-ui/js/prismjs';
import {routes} from './routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const path = window.location.pathname.split('/').pop();
    this.state = {content: App.currentContent(path), path};
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', (event) => {
      this.updatePath(event.currentTarget.location);
    }, false);
  }

  updateContent(href) {
    window.history.pushState({}, '', href);
    this.updatePath(window.location);
  }

  updatePath(location) {
    document.body.scrollTop = 0;
    const path = location.pathname.split('/').pop();
    this.setState({content: App.currentContent(path), path});
  }

  static currentContent(path) {
    return routes[path] || routes['404'];
  }

  render() {
    const {path, content: {PageComponent}} = this.state;
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const footer = (
      <div className="footer whitelabel-bg-color grid mrn mtxxxl">
        <div className="col type-ellipsis">
          <p>
            © {year} <a href="https://pivotal.io">Pivotal Software</a>, Inc. All Rights Reserved.
            <span className="pln">
              <span className="policy-link"><a href="https://pivotal.io/privacy-policy">Privacy Policy</a></span>
              <span className="policy-link"><a href="https://pivotal.io/terms-of-use">Terms of Use</a></span>
              <span className="policy-link" id="teconsent"/>
            </span>
          </p>
        </div>
      </div>
    );

    return (
      <Grid id="app" gutter={false}>
        <FlexCol fixed>
          {/* <Sidebar updateContent={this.updateContent} activePath={path}/> */}
        </FlexCol>
        <FlexCol id="content" className="content">
          <div id="wrapper">
            <PageComponent/>
          </div>
          {footer}
        </FlexCol>
      </Grid>
    );
  }
}