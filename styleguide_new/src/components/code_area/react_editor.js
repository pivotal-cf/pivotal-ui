import React from 'react';
import AceEditor from 'react-ace';
import {Icon} from 'pui-react-iconography';
import {CopyToClipboardButton} from 'pui-react-copy-to-clipboard';

export default class ReactEditor extends React.Component {
  render() {
    return (
      <div className="code-editor--edit mbxl">
        <div className="code-editor--titlebar">
          <div className="code-editor--label plxl">
            <Icon src="react" className="mrl code-editor--label-icon"/>React
          </div>
          <div className="code-editor--actions">
            <Icon src="autorenew"/>
            <CopyToClipboardButton text={this.props.code} className="code-editor--titlebar-copy"/>
          </div>
        </div>
        <AceEditor width="100%"
                   height="200px"
                   mode="jsx"
                   theme="crimson_editor"
                   value={this.props.code}
                   onChange={this.props.changeHandler}
                   editorProps={{$blockScrolling: Infinity}}
                   setOptions={{showGutter: true, showLineNumbers: true}}/>
      </div>
    );
  }
}