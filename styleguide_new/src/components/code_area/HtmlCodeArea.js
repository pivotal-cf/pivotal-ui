import React from 'react'
import {AllHtmlEntities} from 'html-entities'
import AceEditor from 'react-ace'
import {Icon} from 'pui-react-iconography'
import {InlineList, ListItem} from 'pui-react-lists'

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
    this.setState({showEditor: this.state.showEditor ? false : true})
  }

  render() {
    const {code} = this.state

    return <div className="code-editor">
      <InlineList className="code-editor--toolbar">
        <ListItem className="code-editor--toolbar--item" onClick={this.toggleEditor.bind(this)}>
          <Icon className={this.state.showEditor ? "code-editor--toolbar--toggle-open" : ""}
                src="check"/>
          <div className="code-editor--toolbar--label">HTML</div>
        </ListItem>
      </InlineList>
      {this.state.showEditor && <AceEditor className="code-editor--edit"
                                           width="100%"
                                           height="200px"
                                           mode="html"
                                           theme="crimson_editor"
                                           value={code}
                                           onChange={this.changeHandler.bind(this)}
                                           editorProps={{$blockScrolling: Infinity}}/>}
      <div className="code-editor--live-preview" dangerouslySetInnerHTML={{__html: code}}></div>
    </div>
  }
}