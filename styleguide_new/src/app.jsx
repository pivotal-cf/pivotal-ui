import React from 'react'
import ReactDOM from 'react-dom'
import '../stylesheets/app.scss'
import SideBar from './sidebar'
import Content from './content'
import {Router, Route, browserHistory} from 'react-router'

class App extends React.Component{
  render() {
    return <div id="app">
      <SideBar/>
      <Content/>
    </div>
  }
}

class Foo extends React.Component{
  render() {
    return <div>foo</div>
  }
}

class Bar extends React.Component{
  render() {
    return <div>bar</div>
  }
}
ReactDOM.render(<Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="foo" component={Foo}/>
    <Route path="bar" component={Bar}/>
  </Route>
</Router>, document.getElementById('root'))