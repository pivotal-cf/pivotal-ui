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
      <div className="code-editor--live-preview" dangerouslySetInnerHTML={{__html: code}}></div>
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
                   value={code}
                   editorProps={{$blockScrolling: Infinity}}/>
      </div>
    </div>
  }
}