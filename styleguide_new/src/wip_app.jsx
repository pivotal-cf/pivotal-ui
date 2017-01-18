import React from 'react'
import ReactDOM from 'react-dom'
import ButtonStuff from '../docs/Button.md'
import {DefaultButton, PrimaryButton} from 'pui-react-buttons'
import * as Babel from 'babel-standalone'
import {AllHtmlEntities} from 'html-entities'

window.React = React
window.ReactDOM = ReactDOM
window.DefaultButton = DefaultButton
window.PrimaryButton = PrimaryButton

class CodeEditor extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: props.code
    }
  }

  changeHandler(event) {
    this.setState({code: AllHtmlEntities.decode(event.target.value)})
  }

  render() {
    const {code} = this.state
    const transpiledCode = Babel.transform(code, {presets: ['es2015', 'react']}).code;

    return <div>
      <pre>
        {code}
      </pre>
      <form>
        <textarea onChange={this.changeHandler.bind(this)} defaultValue={code}/>
      </form>
      <div>
        {eval(transpiledCode)}
      </div>
    </div>
  }
}

class MarkdownViewer extends React.Component {
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

const app = <div>
  <MarkdownViewer html={ButtonStuff}/>
</div>

ReactDOM.render(app, document.getElementById('root'))