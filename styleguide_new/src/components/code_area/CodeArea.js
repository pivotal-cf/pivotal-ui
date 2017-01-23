import React from 'react'
import * as Babel from 'babel-standalone'
import {AllHtmlEntities} from 'html-entities'
import AceEditor from 'react-ace'
import pretty from 'pretty'
import attachLocalImportsToWindow from '../../helpers/local_imports_helper'

import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/crimson_editor'

attachLocalImportsToWindow()

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
                   value={pretty(CodeArea.stripHtmlComments(this.state.codePreviewHtml))}
                   editorProps={{$blockScrolling: Infinity}}/>
      </div>
    </div>
  }
}
