import AceEditor from 'react-ace';
import Editor from '../../src/components/editor';

describe('Editor', () => {
  let code, changeHandler, mode, readOnly;

  beforeEach(() => {
    spyOnRender(AceEditor, <div className="mock-editor"/>);
    code = 'i++';
    mode = 'js';
    readOnly = true;
    changeHandler = jest.fn();
    testRender(<Editor {...{code, changeHandler, mode, readOnly}}/>);
  });

  it('renders the editor inside a div', () => {
    expect('div.pal.border-top > .mock-editor').toExist();
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