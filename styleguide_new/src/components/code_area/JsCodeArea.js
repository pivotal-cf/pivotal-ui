import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as Babel from 'babel-standalone'
import {AllHtmlEntities} from 'html-entities'
import AceEditor from 'react-ace'
import pretty from 'pretty'
import {Icon} from 'pui-react-iconography'
import {InlineList, ListItem} from 'pui-react-lists'

import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/crimson_editor'

const defaultLoadingMessage = 'loading code preview'

export default class JsCodeArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code: props.code,
      codePreviewHtml: defaultLoadingMessage,
      showReact: false,
      showHTMLPreview: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const firstCodepreviewLoad = this.state.codePreviewHtml === defaultLoadingMessage
      && nextState.codePreviewHtml !== defaultLoadingMessage

    // We can't use codePreviewHtml beyond the first time because react injects counters such as
    // <label for="radio81"> and <!-- react-text: 784 -->. If codePreviewHtml triggered
    // a redraw, the counters in the rendered jsx would increase, which would cause the
    // codePreviewHtml to be different, causing a re-render, etc, infinite loop
    return this.state.code != nextState.code || firstCodepreviewLoad ||
              this.state.showReact != nextState.showReact || this.state.showHTMLPreview != nextState.showHTMLPreview
  }

  changeHandler(value) {
    this.setState({code: AllHtmlEntities.decode(value)})
  }

  toggleEditor() {
    this.setState({showReact: this.state.showReact ? false : true})
  }

  toggleHTMLPreview() {
    this.setState({showHTMLPreview: this.state.showHTMLPreview ? false : true})
  }

  static getRenderedReact(code) {
    const tempElem = React.createElement('div', {}, eval(code))
    const renderedCode = ReactDOMServer.renderToStaticMarkup(tempElem)
    const strippedCode = renderedCode.replace(/^<div>/, '').replace(/<\/div>$/, '')

    return pretty(strippedCode)
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
      <InlineList className="code-editor--toolbar">
        <ListItem className="code-editor--toolbar--item" onClick={this.toggleEditor.bind(this)}>
          <Icon className={this.state.showReact ? "code-editor--toolbar--toggle-open" : ""}
                src="check"/>
          <div className="code-editor--toolbar--label">React</div>
        </ListItem>
        <ListItem className="code-editor--toolbar--item" onClick={this.toggleHTMLPreview.bind(this)}>
          <Icon className={this.state.showHTMLPreview ? "code-editor--toolbar--toggle-open" : ""}
                src="check"/>
          <div className="code-editor--toolbar--label">HTML</div>
        </ListItem>
      </InlineList>
      {this.state.showReact && <AceEditor className="code-editor--edit"
                 width="100%"
                 height="200px"
                 mode="jsx"
                 theme="crimson_editor"
                 value={code}
                 onChange={this.changeHandler.bind(this)}
                 editorProps={{$blockScrolling: Infinity}}/>}
      {this.state.showHTMLPreview && <AceEditor className="code-editor--html-preview"
                 width="100%"
                 height="200px"
                 mode="html"
                 readOnly={true}
                 theme="crimson_editor"
                 wrap={true}
                 value={JsCodeArea.getRenderedReact(transpiledCode)}
                 editorProps={{$blockScrolling: Infinity}}/>}
      <div className="code-editor--live-preview">
        {eval(transpiledCode)}
      </div>
    </div>
  }
}
