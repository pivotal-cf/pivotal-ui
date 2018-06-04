import React, {PureComponent} from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import 'brace/mode/jsx';
import 'brace/mode/html';

export default class Editor extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    changeHandler: PropTypes.func,
    mode: PropTypes.string,
    readOnly: PropTypes.bool
  };

  render() {
    const {code, mode, readOnly, changeHandler} = this.props;

    return (
      <div className="mtl ptl border-top">
        <AceEditor {...{
          width: '100%',
          height: '200px',
          mode,
          value: code,
          readOnly,
          onChange: changeHandler,
          editorProps: {$blockScrolling: Infinity},
          setOptions: {
            showGutter: false,
            showPrintMargin: false,
            highlightActiveLine: false,
            maxLines: 15
          }
        }}/>
      </div>
    );
  }
}