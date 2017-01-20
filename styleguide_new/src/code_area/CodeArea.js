import React from 'react'
import ReactDOM from 'react-dom'
import * as Babel from 'babel-standalone'
import {DefaultButton, PrimaryButton} from 'pui-react-buttons'
import {Ribbon, PrimaryRibbon} from 'pui-react-ribbons'
import {Panel, BasicPanel, BasicPanelAlt, ShadowPanel, ClickablePanel, HighlightPanel} from 'pui-react-panels'
import {AllHtmlEntities} from 'html-entities'
import AceEditor from 'react-ace'
import pretty from 'pretty'

import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/crimson_editor'

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

export default class CodeArea extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: props.code,
      codePreviewHtml: 'loading code preview'
    }
  }

  changeHandler(value) {
    this.setState({code: AllHtmlEntities.decode(value)})
  }

  static stripHtmlComments(htmlCode) {
    return htmlCode.replace(/<!-- .+?(?= -->) --> ?/g, '')
  }

  grabCodePreviewHtml(element) {
    if(element === null) {
      return
    }

    this.setState({codePreviewHtml: AllHtmlEntities.decode(element.innerHTML)})
  }

  render() {
    const {code} = this.state
    let transpiledCode

    try {
      transpiledCode = Babel.transform(code, {presets: ['es2015', 'react']}).code
    } catch(error) {
      // TODO: display on page or something?
    }

    return <div className="code-editor">
      <div className="code-editor--live-preview" ref={this.grabCodePreviewHtml.bind(this)}>
        {eval(transpiledCode)}
      </div>
      <div className="code-editor--panel">
        <AceEditor className="code-editor--edit"
                   mode="jsx"
                   theme="crimson_editor"
                   value={code}
                   onChange={this.changeHandler.bind(this)}/>
        <AceEditor className="code-editor--html-preview"
                   mode="html"
                   readOnly={true}
                   theme="crimson_editor"
                   wrap={true}
                   value={pretty(CodeArea.stripHtmlComments(this.state.codePreviewHtml))}/>
      </div>
    </div>
  }
}
