import React from 'react';
import ReactDOM from 'react-dom';
import {spyOnRender} from '../../../spec/support/jest_spy_on_render';
import AceEditor from 'react-ace';
import Editor from '../../src/components/editor';

describe('Editor', () => {
  let code, changeHandler, mode, readOnly;

  beforeEach(() => {
    spyOnRender(AceEditor);
    code = 'i++';
    mode = 'js';
    readOnly = true;
    changeHandler = jest.fn();
    ReactDOM.render(<Editor {...{code, changeHandler, mode, readOnly}}/>, root);
  });

  it('renders the AceEditor with the correct props', () => {
    expect(AceEditor).toHaveBeenRenderedWithProps(expect.objectContaining({
      editorProps: {$blockScrolling: Infinity},
      height: '200px',
      mode,
      onChange: changeHandler,
      readOnly,
      setOptions: {
        showGutter: false,
        showPrintMargin: false,
        highlightActiveLine: false,
        maxLines: 15
      },
      theme: 'clouds',
      value: code,
      width: '100%'
    }));
  });
});