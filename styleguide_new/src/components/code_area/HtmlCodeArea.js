import React from 'react'
import {AllHtmlEntities} from 'html-entities'
import {Icon} from 'pui-react-iconography'
import {InlineList, ListItem} from 'pui-react-lists'

import HtmlEditor from './HtmlEditor'

import 'brace/mode/html'
import {githubRepo, githubBranch, issueUrl} from '../../helpers/constants'

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

  editGithub() {
    const url = `${githubRepo}/edit/${githubBranch}/styleguide_new/docs/${this.props.file}`
    window.open(url, '_blank')
  }

  fileIssue() {
    const url = issueUrl(this.props.name)
    window.open(url, '_blank')
  }

  render() {
    const {code} = this.state

    let editorClasses = "code-editor--toolbar--icon "
    editorClasses = editorClasses + (this.state.showEditor ? "code-editor--toolbar--open" : "code-editor--toolbar--close")

    return <div className="code-editor">
      <InlineList className="code-editor--toolbar">
        <ListItem className="code-editor--toolbar--item" onClick={this.editGithub.bind(this)}>
          <Icon src="github" className="code-editor--toolbar--icon"/>
          <div className="code-editor--toolbar--label">Edit</div>
        </ListItem>
        <ListItem className="code-editor--toolbar--item" onClick={this.fileIssue.bind(this)}>
          <Icon src="info_outline" className="code-editor--toolbar--icon"/>
          <div className="code-editor--toolbar--label">Issues</div>
        </ListItem>
        <ListItem className="code-editor--toolbar--item" onClick={this.toggleEditor.bind(this)}>
          <Icon className={editorClasses}
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