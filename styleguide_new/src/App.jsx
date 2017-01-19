import React from 'react'
import ReactDOM from 'react-dom'
import '../stylesheets/app.scss'
import SideBar from './Sidebar'
import Content from './Content'

ReactDOM.render(<div id="app">
  <SideBar/>
  <Content/>
</div>, document.getElementById('root'))