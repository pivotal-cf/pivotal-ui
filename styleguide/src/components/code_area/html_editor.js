import React from 'react';
import AceEditor from 'react-ace';

import {Icon} from 'pivotal-ui/react/iconography';
import {CopyToClipboard} from 'pivotal-ui/react/copy-to-clipboard';
import {DefaultButton} from 'pivotal-ui/react/buttons';

export default class HtmlEditor extends React.Component {
  render() {
    return (
      <div className="code-editor--html-preview mbxl">
        <div className="code-editor--titlebar">
          <div className="code-editor--label plxl">
            <Icon src="html5" className="mrl code-editor--label-icon"/> HTML
          </div>
          <div className="code-editor--actions">
            <Icon src="autorenew"/>
            <CopyToClipboard text={this.props.code} className="code-editor--titlebar-copy">
              <DefaultButton {...{
                flat: true,
                iconOnly: true,
                icon: <Icon src="copy"/>,
                small: true
              }} />
            </CopyToClipboard>
          </div>
        </div>
        <AceEditor width="100%"
                   height="200px"
                   mode="html"
                   readOnly={this.props.readOnly ? this.props.readOnly : false}
                   theme="crimson_editor"
                   wrap={true}
                   value={this.props.code}
                   markers={[]}
                   annotations={[]}
                   editorProps={{$blockScrolling: Infinity}}
                   setOptions={{showGutter: true, showLineNumbers: true}}
                   onChange={this.props.changeHandler ? this.props.changeHandler : null }/>
      </div>
    );
  }
}