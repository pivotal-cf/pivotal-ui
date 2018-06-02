import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';

export default class EditorWrapper extends React.Component {
  static propTypes = {
    code: PropTypes.string,
    changeHandler: PropTypes.func,
    mode: PropTypes.string,
    readOnly: PropTypes.bool
  };

  render() {
    return (
      <AceEditor width="100%"
                 height="200px"
                 theme="crimson_editor"
                 mode={this.props.mode}
                 value={this.props.code}
                 readOnly={this.props.readOnly}
                 onChange={this.props.changeHandler}
                 editorProps={{$blockScrolling: Infinity}}
                 setOptions={{showGutter: false}}/>
    );
  }
}