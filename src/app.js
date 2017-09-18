import React from 'react';
import ReactDOM from 'react-dom';

import '../stylesheets/app.scss';

import Sidebar from './components/sidebar';
import MarkdownViewer from './components/markdown_viewer';
import TocSidebar from './components/toc_sidebar';
import contentMap, {attachPackagesToWindow} from './helpers/content';
import 'pivotal-ui/js/prismjs';

attachPackagesToWindow();

class App extends React.Component {
  constructor(props) {
    super(props);

    const path = window.location.pathname;
    this.state = {content: App.currentContent(path), path: path};
  }

  updateContent(href) {
    window.history.pushState({}, '', href);
    content.scrollTop = 0;
    const path = window.location.pathname;
    this.setState({content: App.currentContent(path), path: path});
  }

  static currentContent(path) {
    return contentMap[path] ? contentMap[path] : contentMap['/404'];
  }

  render() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const footer = (<div className="footer whitelabel-bg-color grid mrn mtxxxl">
      <div className="col type-ellipsis">
            <span className="legal-text">
              ©{year} Pivotal Software, Inc. All Rights Reserved.
            </span>
      </div>
      <div className="last-login-time col col-fixed mrl">Last login: 9/18/17 2:33 pm</div>
    </div>);

    return (
      <div id="app" className="grid grid-nogutter">
        <div className="col col-fixed">
          <Sidebar updateContent={this.updateContent.bind(this)} activePath={this.state.path}/>
        </div>
        <div id="content" className="col content">
          <div id="wrapper">
            <MarkdownViewer json={this.state.content.json}
                            file={this.state.content.file}
                            name={this.state.content.name}/>
          </div>
          {footer}
        </div>
        <div hidden id="toc-sidebar" className="col col-fixed toc-column pln">
          <TocSidebar json={this.state.content.json.children}/>
        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));