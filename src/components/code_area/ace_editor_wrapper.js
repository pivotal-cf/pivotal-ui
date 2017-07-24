import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';

export default class EditorWrapper extends React.Component {
  static propTypes = {
    code: PropTypes.string,
    changeHandler: PropTypes.func
  };

  render() {
    return (
      <AceEditor width="100%"
                 height="200px"
                 mode="jsx"
                 theme="crimson_editor"
                 value={this.props.code}
                 onChange={this.props.changeHandler}
                 editorProps={{$blockScrolling: Infinity}}
                 setOptions={{showGutter: true, showLineNumbers: true}}/>
    )
  }
}