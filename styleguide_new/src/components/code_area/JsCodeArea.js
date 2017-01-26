import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as Babel from 'babel-standalone'
import {AllHtmlEntities} from 'html-entities'
import pretty from 'pretty'
import {Icon} from 'pui-react-iconography'
import {InlineList, ListItem} from 'pui-react-lists'
import {CopyToClipboardButton} from 'pui-react-copy-to-clipboard'

import ReactEditor from './ReactEditor'
import HtmlEditor from './HtmlEditor'

import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/crimson_editor'

const defaultLoadingMessage = 'loading code preview'

export default class JsCodeArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code: props.code,
      showReact: false,
      showHTMLPreview: false,
      file: props.file
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.code != nextState.code ||
            this.state.showReact != nextState.showReact ||
            this.state.showHTMLPreview != nextState.showHTMLPreview
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

  editGithub() {
    console.log(this.state)
    const url="https://github.com/pivotal-cf/pivotal-ui/edit/styleguide_new/styleguide_new/docs/" + this.state.file
    window.open(url, "_blank")
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

    let reactClasses = "code-editor--toolbar--icon "
    reactClasses = reactClasses + (this.state.showReact ? "code-editor--toolbar--open" : "code-editor--toolbar--close")

    let htmlClasses = "code-editor--toolbar--icon "
    htmlClasses = htmlClasses + (this.state.showHTMLPreview ? "code-editor--toolbar--open" : "code-editor--toolbar--close")

    return <div className="code-editor">
      <InlineList className="code-editor--toolbar">
        <ListItem className="code-editor--toolbar--item" onClick={this.editGithub.bind(this)}>
          <Icon src="github" className="code-editor--toolbar--icon"/>
          <div className="code-editor--toolbar--label">Edit</div>
        </ListItem>
        <ListItem className="code-editor--toolbar--item" onClick={this.toggleEditor.bind(this)}>
          <Icon className={reactClasses}
                src="check"/>
          <div className="code-editor--toolbar--label">React</div>
        </ListItem>
        <ListItem className="code-editor--toolbar--item" onClick={this.toggleHTMLPreview.bind(this)}>
          <Icon className={htmlClasses}
                src="check"/>
          <div className="code-editor--toolbar--label">HTML</div>
        </ListItem>
      </InlineList>
      {this.state.showReact &&
        <ReactEditor code={code} changeHandler={this.changeHandler.bind(this)}/>}
      {this.state.showHTMLPreview &&
        <HtmlEditor code={JsCodeArea.getRenderedReact(transpiledCode)} readOnly={true}/>}
      <div className="code-editor--live-preview">
        {eval(transpiledCode)}
      </div>
    </div>
  }
}
