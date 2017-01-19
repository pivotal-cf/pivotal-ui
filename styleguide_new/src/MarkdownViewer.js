import React from 'react'
import ReactDOM from 'react-dom'
import CodeEditor from './CodeEditor'
import {AllHtmlEntities} from 'html-entities'

export default class MarkdownViewer extends React.Component {
  static renderEditableArea(codeElement) {
    const code = AllHtmlEntities.decode(codeElement.innerHTML)
    ReactDOM.render(<CodeEditor code={code}/>, codeElement)
  }

  static renderEditableAreas(element) {
    for(let i = 0; element.getElementsByTagName("code").length > i; i++) {
      const codeElement = element.getElementsByTagName('code')[i]
      MarkdownViewer.renderEditableArea(codeElement)
    }
  }

  render() {
    return <div id="markdown-viewer"
                ref={MarkdownViewer.renderEditableAreas}
                dangerouslySetInnerHTML={{__html: this.props.html}}></div>
  }
}
