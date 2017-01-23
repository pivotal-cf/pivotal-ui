import React from 'react'
import ReactDOM from 'react-dom'
import CodeArea from './CodeArea'
import {AllHtmlEntities} from 'html-entities'

export default class MarkdownViewer extends React.PureComponent {
  static renderEditableAreas(element) {
    if (!element) {
      return // component was unmounted
    }

    for(let i = 0; element.getElementsByTagName('code').length > i; i++) {
      const codeElement = element.getElementsByTagName('code')[i]
      MarkdownViewer.renderEditableArea(codeElement)
    }
  }

  static renderEditableArea(codeElement) {
    const code = AllHtmlEntities.decode(codeElement.innerHTML)
    ReactDOM.render(<CodeArea code={code}/>, codeElement)
  }

  render() {
    return <div className="markdown-viewer"
                ref={e => MarkdownViewer.renderEditableAreas(e)} // no idea why e => is necessary, but without it ref doesn't get fired on second load
                dangerouslySetInnerHTML={{__html: this.props.html}}></div>
  }
}
