import React from 'react'
import ReactDOM from 'react-dom'
import '../stylesheets/app.scss'
import SideBar from './components/Sidebar'
import Content from './components/Content'

ReactDOM.render(<div id="app">
  <SideBar/>
  <Content/>
</div>, document.getElementById('root'))