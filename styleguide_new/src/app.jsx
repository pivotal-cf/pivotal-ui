import React from 'react'
import ReactDOM from 'react-dom'
import '../stylesheets/app.scss'
import SideBar from './sidebar'
import Content from './content'

ReactDOM.render(<div id="app">
  <SideBar/>
  <Content/>
</div>, document.getElementById('root'))