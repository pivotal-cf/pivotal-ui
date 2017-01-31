import React from 'react'
import {AllHtmlEntities} from 'html-entities'

import Toolbar from './Toolbar'
import HtmlEditor from './HtmlEditor'
import 'brace/mode/html'

export default class HtmlCodeArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code: props.code,
      showEditor: false
    }
  }

  changeHandler(value) {
    this.setState({code: AllHtmlEntities.decode(value)})
  }

  toggleEditor() {
    this.setState({showEditor: !this.state.showEditor})
  }

  render() {
    const {code} = this.state
    const {title, file, name} = this.props

    let editorClasses = "code-editor--toolbar--icon "
    editorClasses = editorClasses + (this.state.showEditor ? "code-editor--toolbar--open" : "code-editor--toolbar--close")

    return <div className="code-editor">
      <Toolbar showReact={false}
               showHtml={this.state.showEditor}
               title={title}
               file={file}
               name={name}
               toggleHtmlPreview={this.toggleEditor.bind(this)}/>
      {this.state.showEditor &&
      <HtmlEditor code={code} readOnly={false} changeHandler={this.changeHandler.bind(this)}/> }
      <div className="code-editor--live-preview" dangerouslySetInnerHTML={{__html: code}}></div>
    </div>
  }
}