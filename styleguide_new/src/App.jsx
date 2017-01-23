import React from 'react'
import ReactDOM from 'react-dom'

import '../stylesheets/app.scss'

import SideBar from './components/Sidebar'
import Content from './components/Content'
import contentMap from './helpers/content'

const homepage = <div className="content">
  Make a selection on the left
</div>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {content: App.currentContent()}
  }

  updateContent(event) {
    event.preventDefault()
    window.history.pushState({}, '', event.target.href)
    this.setState({content: App.currentContent()})
  }

  static currentContent() {
    const path = window.location.pathname

    if(path === '/' || !contentMap[path]) {
      return false
    }

    return contentMap[path]
  }

  render() {
    return <div id="app">
      <SideBar clickHandler={this.updateContent.bind(this)}/>
      {this.state.content ? <Content content={this.state.content}/> : homepage}
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))