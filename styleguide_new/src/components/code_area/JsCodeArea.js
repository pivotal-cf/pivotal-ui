import React from 'react'
import * as Babel from 'babel-standalone'
import {AllHtmlEntities} from 'html-entities'
import AceEditor from 'react-ace'
import pretty from 'pretty'

import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/crimson_editor'

const stripHtmlComments = htmlCode => htmlCode.replace(/<!-- .+?(?= -->) --> ?/g, '')
const defaultLoadingMessage = 'loading code preview'

export default class JsCodeArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code: props.code,
      codePreviewHtml: defaultLoadingMessage
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // We must make sure not to use codePreviewHtml because react injects counters such as
    // <label for="radio81"> and <!-- react-text: 784 -->. If codePreviewHtml triggered
    // a redraw, the counters in the rendered jsx would increase, which would cause the
    // codePreviewHtml to be different, causing a re-render, etc, infinite loop
    return this.state.code != nextState.code ||
      (this.state.codePreviewHtml === defaultLoadingMessage && nextState.codePreviewHtml !== defaultLoadingMessage)
  }

  changeHandler(value) {
    this.setState({code: AllHtmlEntities.decode(value)})
  }

  grabCodePreviewHtml(element) {
    if(!element) {
      return // component was unmounted
    }

    const code = element.innerHTML
    const unescapedCode = AllHtmlEntities.decode(code)
    const codeWithoutComments = stripHtmlComments(unescapedCode)
    this.setState({codePreviewHtml: pretty(codeWithoutComments)})
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
                   height="100px"
                   mode="jsx"
                   theme="crimson_editor"
                   value={code}
                   onChange={this.changeHandler.bind(this)}
                   editorProps={{$blockScrolling: Infinity}}/>
        <AceEditor className="code-editor--html-preview"
                   height="100px"
                   mode="html"
                   readOnly={true}
                   theme="crimson_editor"
                   wrap={true}
                   value={this.state.codePreviewHtml}
                   editorProps={{$blockScrolling: Infinity}}/>
      </div>
    </div>
  }
}
