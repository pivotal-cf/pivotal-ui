import React from 'react'
import AceEditor from 'react-ace'
import {Icon} from 'pui-react-iconography'
import {InlineList, ListItem} from 'pui-react-lists'
import {CopyToClipboardButton} from 'pui-react-copy-to-clipboard'

export default class ReactEditor extends React.Component {
  render() {
    return <div className="code-editor--edit">
      <div className="code-editor--titlebar">
        <Icon src="react"/> React
        <CopyToClipboardButton text={this.props.code} className="code-editor--titlebar-copy"/>
      </div>
      <AceEditor width="100%"
                 height="200px"
                 mode="jsx"
                 theme="crimson_editor"
                 value={this.props.code}
                 onChange={this.props.changeHandler}
                 editorProps={{$blockScrolling: Infinity}}
                 setOptions={{showGutter: false}}/>
    </div>
  }
}