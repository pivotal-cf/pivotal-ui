import React from 'react'
import ReactDOM from 'react-dom'
import * as Babel from 'babel-standalone'

import {DefaultButton, PrimaryButton} from 'pui-react-buttons'
import {Ribbon, PrimaryRibbon} from 'pui-react-ribbons'
import {Panel, BasicPanel, BasicPanelAlt, ShadowPanel, ClickablePanel, HighlightPanel} from 'pui-react-panels'
import {AllHtmlEntities} from 'html-entities'

window.React = React
window.ReactDOM = ReactDOM
window.DefaultButton = DefaultButton
window.PrimaryButton = PrimaryButton
window.Ribbon = Ribbon
window.PrimaryRibbon = PrimaryRibbon
window.Panel = Panel
window.BasicPanel = BasicPanel
window.BasicPanelAlt = BasicPanelAlt
window.ShadowPanel = ShadowPanel
window.ClickablePanel = ClickablePanel
window.HighlightPanel = HighlightPanel

export default class CodeEditor extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: props.code,
      codePreviewHtml: 'loading code preview'
    }
  }

  changeHandler(event) {
    this.setState({code: AllHtmlEntities.decode(event.target.value)})
  }

  static stripHtmlComments(htmlCode) {
    return htmlCode.replace(/<!-- .+?(?= -->) --> ?/g, '')
  }

  grabCodePreviewHtml(element) {
    if (element === null) {
      return
    }

    this.setState({codePreviewHtml: AllHtmlEntities.decode(element.innerHTML)})
  }

  render() {
    const {code} = this.state
    const transpiledCode = Babel.transform(code, {presets: ['es2015', 'react']}).code

    return <div className="code-editor">
      <div className="code-preview" ref={this.grabCodePreviewHtml.bind(this)}>
        {eval(transpiledCode)}
      </div>
      <div className="code-panel">
        <form className="code-edit">
          <textarea className="code-area" onChange={this.changeHandler.bind(this)} defaultValue={code}/>
        </form>
        <pre className="code-rendered">
          {CodeEditor.stripHtmlComments(this.state.codePreviewHtml)}
        </pre>
      </div>
    </div>
  }
}
