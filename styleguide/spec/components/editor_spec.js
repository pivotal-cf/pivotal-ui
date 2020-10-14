import '../spec_helper';
import AceEditor from 'react-ace';
import Editor from '../../src/components/editor';

describe('Editor', () => {
  let code, changeHandler, mode, readOnly;

  beforeEach(() => {
    spyOnRender(AceEditor).and.returnValue(<div className="mock-editor"/>);
    code = 'i++';
    mode = 'js';
    readOnly = true;
    changeHandler = jasmine.createSpy('changeHandler');
    ReactDOM.render(<Editor {...{code, changeHandler, mode, readOnly}}/>, root);
  });

  it('renders the editor inside a div', () => {
    expect('div.pal.border-top > .mock-editor').toExist();
  });

  it('renders the AceEditor with the correct props', () => {
    expect(AceEditor).toHaveBeenRenderedWithProps({
      width: '100%',
      height: '200px',
      mode,
      theme: 'clouds',
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
    });
  });
});