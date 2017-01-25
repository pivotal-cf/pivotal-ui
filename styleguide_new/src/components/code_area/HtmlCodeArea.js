import React from 'react'
import {AllHtmlEntities} from 'html-entities'
import AceEditor from 'react-ace'
import {Icon} from 'pui-react-iconography'
import {InlineList, ListItem} from 'pui-react-lists'

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
      {this.state.showEditor &&
        <HtmlEditor code={code} readOnly={false} changeHandler={this.changeHandler.bind(this)}/> }
      <div className="code-editor--live-preview" dangerouslySetInnerHTML={{__html: code}}></div>
    </div>
  }
}