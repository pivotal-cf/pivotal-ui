import React from 'react'
import ReactDOM from 'react-dom'
import CodeArea from './CodeArea'
import {AllHtmlEntities} from 'html-entities'

export default class MarkdownViewer extends React.Component {
  static renderEditableArea(codeElement) {
    const code = AllHtmlEntities.decode(codeElement.innerHTML)
    ReactDOM.render(<CodeArea code={code}/>, codeElement)
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
