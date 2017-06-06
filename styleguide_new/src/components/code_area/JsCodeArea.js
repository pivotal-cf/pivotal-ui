import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as Babel from 'babel-standalone'
import {AllHtmlEntities} from 'html-entities'
import pretty from 'pretty'
import {CopyToClipboardButton} from 'pui-react-copy-to-clipboard'

import ReactEditor from './ReactEditor'
import HtmlEditor from './HtmlEditor'
import Toolbar from './Toolbar'

import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/crimson_editor'

export default class JsCodeArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code: props.code,
      showReact: false,
      showHtmlPreview: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.code != nextState.code ||
      this.state.showReact != nextState.showReact ||
      this.state.showHtmlPreview != nextState.showHtmlPreview
  }

  changeHandler(value) {
    this.setState({code: AllHtmlEntities.decode(value)})
  }

  toggleEditor() {
    this.setState({showReact: !this.state.showReact})
  }

  toggleHtmlPreview() {
    this.setState({showHtmlPreview: !this.state.showHtmlPreview})
  }

  static getRenderedReact(code) {
    const tempElem = React.createElement('div', {}, eval(code));
    const renderedCode = ReactDOMServer.renderToStaticMarkup(tempElem);
    const strippedCode = renderedCode.replace(/^<div>/, '').replace(/<\/div>$/, '');

    return pretty(strippedCode)
  }

  render() {
    const {file, name, title} = this.props;
    const {code} = this.state;

    let transpiledCode;

    try {
      transpiledCode = Babel.transform(code, {presets: ['es2015', 'react']}).code
    } catch(error) {
      // TODO: display on page or something?
    }

    return <div className="code-editor">
      <Toolbar showReact={this.state.showReact}
                       showHtml={this.state.showHtmlPreview}
                       title={title}
                       file={file}
                       name={name}
                       toggleEditor={this.toggleEditor.bind(this)}
                       toggleHtmlPreview={this.toggleHtmlPreview.bind(this)}
                       isReact={true}/>

      {this.state.showReact && <ReactEditor code={code} changeHandler={this.changeHandler.bind(this)}/>}
      {this.state.showHtmlPreview && <HtmlEditor code={JsCodeArea.getRenderedReact(transpiledCode)} readOnly={true}/>}

      <div className="code-editor--live-preview">
        {eval(transpiledCode)}
      </div>
    </div>
  }
}
