import React from 'react'
import ReactDOM from 'react-dom'
import JsCodeArea from './JsCodeArea'
import HtmlCodeArea from './HtmlCodeArea'
import {AllHtmlEntities} from 'html-entities'

export default class MarkdownViewer extends React.PureComponent {
  static renderEditableAreas(element, file) {
    if(!element) {
      return // component was unmounted
    }

    MarkdownViewer.renderJsEditableAreas(element, file)
    MarkdownViewer.renderHtmlEditableAreas(element, file)
  }

  static renderJsEditableAreas(element, file) {
    const jsExamples = [...element.getElementsByClassName('lang-jsx'), ...element.getElementsByClassName('lang-js')]

    for(let codeElement of jsExamples) {
      const code = AllHtmlEntities.decode(codeElement.innerHTML)
      ReactDOM.render(<JsCodeArea code={code} file={file}/>, codeElement)
    }
  }

  static renderHtmlEditableAreas(element, file) {
    const htmlExamples = element.getElementsByClassName('lang-html')

    for(let codeElement of htmlExamples) {
      const code = AllHtmlEntities.decode(codeElement.innerHTML)
      ReactDOM.render(<HtmlCodeArea code={code} file={file}/>, codeElement)
    }
  }

  render() {
    return <div className="markdown-viewer"
                ref={e => MarkdownViewer.renderEditableAreas(e, this.props.file)} // no idea why e => is necessary, but without it ref doesn't get fired on second load
                dangerouslySetInnerHTML={{__html: this.props.html}}></div>
  }
}
