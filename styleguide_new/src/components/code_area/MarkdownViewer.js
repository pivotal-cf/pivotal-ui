import React from 'react'
import ReactDOM from 'react-dom'
import JsCodeArea from './JsCodeArea'
import HtmlCodeArea from './HtmlCodeArea'
import {AllHtmlEntities} from 'html-entities'

export default class MarkdownViewer extends React.PureComponent {
  renderEditableAreas(element) {
    if(!element) {
      return // component was unmounted
    }

    const {file, name} = this.props

    MarkdownViewer.renderJsEditableAreas(element, file, name)
    MarkdownViewer.renderHtmlEditableAreas(element, file, name)
  }

  static renderJsEditableAreas(element, file, name) {
    const jsExamples = [...element.getElementsByClassName('lang-jsx'), ...element.getElementsByClassName('lang-js')]

    for(let codeElement of jsExamples) {
      const code = AllHtmlEntities.decode(codeElement.innerHTML)
      ReactDOM.render(<JsCodeArea code={code} file={file} name={name}/>, codeElement)
    }
  }

  static renderHtmlEditableAreas(element, file, name) {
    const htmlExamples = element.getElementsByClassName('lang-html')

    for(let codeElement of htmlExamples) {
      const code = AllHtmlEntities.decode(codeElement.innerHTML)
      ReactDOM.render(<HtmlCodeArea code={code} file={file} name={name}/>, codeElement)
    }
  }

  render() {
    return <div className="markdown-viewer"
                ref={this.renderEditableAreas.bind(this)}
                dangerouslySetInnerHTML={{__html: this.props.html}}></div>
  }
}
