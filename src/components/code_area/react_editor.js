import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'pivotal-ui/react/iconography';
import {CopyToClipboard} from 'pivotal-ui/react/copy-to-clipboard';
import {DefaultButton} from 'pivotal-ui/react/buttons';
import AceEditorWrapper from './ace_editor_wrapper';

export default class ReactEditor extends React.Component {
  static propTypes = {
    changeHandler: PropTypes.func,
    code: PropTypes.string
  };

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
            <CopyToClipboard text={code} className="code-editor--titlebar-copy">
              <DefaultButton {...{
                flat: true,
                iconOnly: true,
                icon: <Icon src="copy"/>,
                small: true
              }} />
            </CopyToClipboard>
          </div>
        </div>
        <AceEditorWrapper {...{code, changeHandler}}/>
      </div>
    );
  }
}