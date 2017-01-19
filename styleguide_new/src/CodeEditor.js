import React from 'react'
import ReactDOM from 'react-dom'
import * as Babel from 'babel-standalone'

import {DefaultButton, PrimaryButton} from 'pui-react-buttons'
import {Ribbon, PrimaryRibbon} from 'pui-react-ribbons'

window.React = React
window.ReactDOM = ReactDOM
window.DefaultButton = DefaultButton
window.PrimaryButton = PrimaryButton
window.Ribbon = Ribbon
window.PrimaryRibbon = PrimaryRibbon

export default class CodeEditor extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: props.code
    }
  }

  changeHandler(event) {
    this.setState({code: AllHtmlEntities.decode(event.target.value)})
  }

  render() {
    const {code} = this.state
    const transpiledCode = Babel.transform(code, {presets: ['es2015', 'react']}).code;

    return <div>
      <pre>
        {code}
      </pre>
      <form>
        <textarea onChange={this.changeHandler.bind(this)} defaultValue={code}/>
      </form>
      <div>
        {eval(transpiledCode)}
      </div>
    </div>
  }
}
