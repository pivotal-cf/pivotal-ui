import React from 'react'
import ReactDOM from 'react-dom'

import '../stylesheets/app.scss'

import SideBar from './components/Sidebar'
import Content from './components/Content'
import ButtonStuff from '../docs/Buttons.md'
import RibbonStuff from '../docs/Ribbons.md'
import PanelStuff from '../docs/Panels.md'

const content = {
  '/buttons': ButtonStuff,
  '/ribbons': RibbonStuff,
  '/panels': PanelStuff,
}

const homepage = <div className="content">
  Make a selection on the left
</div>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {content: false}
  }

  updateContent(event) {
    event.preventDefault()
    window.history.pushState({}, '', event.target.href)
    const path = window.location.pathname

    if(path === "/" || !content[path]) {
      this.setState({content: false})
    }

    this.setState({content: content[path]})
  }

  render() {
    return <div id="app">
      <SideBar clickHandler={this.updateContent.bind(this)}/>
      {this.state.content ? <Content content={this.state.content}/> : homepage}
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))