import React from 'react'
import ReactDOM from 'react-dom'
import JsCodeArea from './JsCodeArea'
import HtmlCodeArea from './HtmlCodeArea'
import {AllHtmlEntities} from 'html-entities'

const codeLang = element => Array.prototype.slice.call(element.classList)
  .find(e => e.includes('lang'))
  .replace('lang-', '')

export default class MarkdownViewer extends React.PureComponent {
  renderEditableAreas(element) {
    if(!element) {
      return // component was unmounted
    }

    const {file, name} = this.props
    const codeAreas = element.getElementsByClassName('code-area')

    for(const codeArea of codeAreas) {
      const title = codeArea.getElementsByClassName('code-area--title')[0].textContent
      const codeBlock = codeArea.getElementsByTagName('pre')[0]
      const code = AllHtmlEntities.decode(codeBlock.innerHTML)
      const lang = codeLang(codeArea)

      switch(lang) {
        case 'js':
        case 'jsx':
          ReactDOM.render(<JsCodeArea title={title} code={code} file={file} name={name}/>, codeArea)
          break;
        case 'html':
          ReactDOM.render(<HtmlCodeArea title={title} code={code} file={file} name={name}/>, codeArea)
          break;
        default:
          throw `I dont know how to deal with lang=${lang}`
          break;
      }
    }
  }

  render() {
    return <div className="markdown-viewer"
                ref={this.renderEditableAreas.bind(this)}
                dangerouslySetInnerHTML={{__html: this.props.html}}></div>
  }
}
