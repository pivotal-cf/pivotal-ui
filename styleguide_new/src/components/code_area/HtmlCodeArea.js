import React from 'react'
import {AllHtmlEntities} from 'html-entities'
import AceEditor from 'react-ace'

import 'brace/mode/html'

export default class HtmlCodeArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {code: props.code}
  }

  changeHandler(value) {
    this.setState({code: AllHtmlEntities.decode(value)})
  }

  render() {
    const {code} = this.state

    return <div className="code-editor">
      <AceEditor className="code-editor--edit"
                 width="100%"
                 height="200px"
                 mode="html"
                 theme="crimson_editor"
                 value={code}
                 onChange={this.changeHandler.bind(this)}
                 editorProps={{$blockScrolling: Infinity}}/>
      <div className="code-editor--live-preview" dangerouslySetInnerHTML={{__html: code}}></div>
    </div>
  }
}