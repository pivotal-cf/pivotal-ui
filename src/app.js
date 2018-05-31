import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import '../stylesheets/app.scss';
import 'pivotal-ui/js/prismjs';
import routes from './routes';

import 'pivotal-ui/css/alerts/alerts.scss';
import 'pivotal-ui/css/alignment/alignment.scss';
import 'pivotal-ui/css/autocomplete/autocomplete.scss';
import 'pivotal-ui/css/back-to-top/back-to-top.scss';
import 'pivotal-ui/css/backgrounds/backgrounds.scss';
import 'pivotal-ui/css/buttons/buttons.scss';
import 'pivotal-ui/css/button-group/button-group.scss';
import 'pivotal-ui/css/border/border.scss';
import 'pivotal-ui/css/box-shadows/box-shadows.scss';
import 'pivotal-ui/css/checkbox/checkbox.scss';
import 'pivotal-ui/css/checkbox-dropdown/checkbox-dropdown.scss';
import 'pivotal-ui/css/code/code.scss';
import 'pivotal-ui/css/collapse/collapse.scss';
import 'pivotal-ui/css/colors/colors.scss';
import 'pivotal-ui/css/common/common.scss';
import 'pivotal-ui/css/copy-to-clipboard/copy-to-clipboard.scss';
import 'pivotal-ui/css/dialog/dialog.scss';
import 'pivotal-ui/css/dividers/dividers.scss';
import 'pivotal-ui/css/dropdowns/dropdowns.scss';
import 'pivotal-ui/css/ellipsis/ellipsis.scss';
import 'pivotal-ui/css/flex-grids/flex-grids.scss';
import 'pivotal-ui/css/flyout/flyout.scss';
import 'pivotal-ui/css/forms/forms.scss';
import 'pivotal-ui/css/hoverable/hoverable.scss';
import 'pivotal-ui/css/iconography/iconography.scss';
import 'pivotal-ui/css/images/images.scss';
import 'pivotal-ui/css/inputs/input.scss';
import 'pivotal-ui/css/links/links.scss';
import 'pivotal-ui/css/lists/lists.scss';
import 'pivotal-ui/css/media/media.scss';
import 'pivotal-ui/css/modal/modal.scss';
import 'pivotal-ui/css/notifications/notifications.scss';
import 'pivotal-ui/css/pagination/pagination.scss';
import 'pivotal-ui/css/panels/panels.scss';
import 'pivotal-ui/css/positioning/positioning.scss';
import 'pivotal-ui/css/progress-bar/progress-bar.scss';
import 'pivotal-ui/css/radio/radio.scss';
import 'pivotal-ui/css/select/select.scss';
import 'pivotal-ui/css/spinners/spinners.scss';
import 'pivotal-ui/css/tables/tables.scss';
import 'pivotal-ui/css/tabs/tabs.scss';
import 'pivotal-ui/css/text-filter/text_filter.scss';
import 'pivotal-ui/css/toggle/toggle.scss';
import 'pivotal-ui/css/tooltips/tooltips.scss';
import 'pivotal-ui/css/typography/typography.scss';
import 'pivotal-ui/css/vertical-alignment/vertical-alignment.scss';
import 'pivotal-ui/css/whitespace/whitespace.scss';

window.React = React;
window.ReactDOM = ReactDOM;
Object.values(routes).forEach(({pageMetadata: {reactPath}}) => {
  if (reactPath) {
    const componentPath = reactPath.split('/').pop();
    const exported = require(`pivotal-ui/react/${componentPath}`);
    Object.entries(exported).forEach(([key, value]) => window[key] = value);
  }
});

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
          <Sidebar updateContent={this.updateContent} activePath={path}/>
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