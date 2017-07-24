import React from 'react';
import {Icon} from 'pui-react-iconography';
import {CopyToClipboardButton} from 'pui-react-copy-to-clipboard';
import AceEditorWrapper from './ace_editor_wrapper';

export default class ReactEditor extends React.Component {
  render() {
    const {code, changeHandler} = this.props;

    return (
      <div className="code-editor--edit mbxl">
        <div className="code-editor--titlebar">
          <div className="code-editor--label plxl">
            <Icon src="react" className="mrl code-editor--label-icon"/>React
          </div>
          <div className="code-editor--actions">
            <Icon src="autorenew"/>
            <CopyToClipboardButton text={code} className="code-editor--titlebar-copy"/>
          </div>
        </div>
        <AceEditorWrapper {...{code, changeHandler}}/>
      </div>
    );
  }
}