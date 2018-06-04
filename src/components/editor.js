import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import 'brace/mode/jsx';
import 'brace/mode/html';
import 'brace/theme/crimson_editor';

export default class Editor extends React.Component {
  static propTypes = {
    code: PropTypes.string,
    changeHandler: PropTypes.func,
    mode: PropTypes.string,
    readOnly: PropTypes.bool
  };

  render() {
    const {code, mode, readOnly, changeHandler} = this.props;

    return (
      <AceEditor {...{
        width: '100%',
        height: '200px',
        theme: 'crimson_editor',
        mode,
        value: code,
        readOnly,
        onChange: changeHandler,
        editorProps: {$blockScrolling: Infinity},
        setOptions: {showGutter: false, showPrintMargin: false}
      }}/>
    );
  }
}