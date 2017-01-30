import React from 'react'
import ReactDOM from 'react-dom'

import 'pui-css-all'
import '../stylesheets/app.scss'

import SideBar from './components/Sidebar'
import Content from './components/Content'
import contentMap, {attachPackagesToWindow} from './helpers/content'

attachPackagesToWindow()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {content: App.currentContent()}
  }

  updateContent(href) {
    window.history.pushState({}, '', href)
    this.setState({content: App.currentContent()})
  }

  static currentContent() {
    const path = window.location.pathname
    return contentMap[path] ? contentMap[path] : contentMap['/404']
  }

  render() {
    return <div id="app">
      <SideBar updateContent={this.updateContent.bind(this)}/>
      <Content content={this.state.content}/>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))