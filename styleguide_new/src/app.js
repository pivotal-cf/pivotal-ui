import React from 'react';
import ReactDOM from 'react-dom';

import 'pui-css-all';
import '../stylesheets/app.scss';

import Sidebar from './components/sidebar';
import MarkdownViewer from './components/markdown_viewer';
import TocSidebar from './components/toc_sidebar';
import contentMap, {attachPackagesToWindow} from './helpers/content';

attachPackagesToWindow();

class App extends React.Component {
  constructor(props) {
    super(props);

    const path = window.location.pathname;
    this.state = {content: App.currentContent(path), path: path};
  }

  updateContent(href) {
    window.history.pushState({}, '', href);

    const path = window.location.pathname;
    this.setState({content: App.currentContent(path), path: path});
  }

  static currentContent(path) {
    return contentMap[path] ? contentMap[path] : contentMap['/404'];
  }

  render() {
    return (
      <div id="app">
        <Sidebar updateContent={this.updateContent.bind(this)} activePath={this.state.path}/>
        <div className="content">
          <MarkdownViewer json={this.state.content.json}
                          file={this.state.content.file}
                          name={this.state.content.name}/>
        </div>
        <TocSidebar json={this.state.content.json.children}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));