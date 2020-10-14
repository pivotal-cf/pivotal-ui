import '../../spec_helper';
import AceEditor from 'react-ace';
import AceEditorWrapper from '../../../src/components/code_area/ace_editor_wrapper';

describe('AceEditorWrapper', () => {
  let code, changeHandler;

  beforeEach(() => {
    spyOnRender(AceEditor);
    code = "i++";
    changeHandler = jasmine.createSpy('changeHandler');

    ReactDOM.render(<AceEditorWrapper {...{code, changeHandler}}/>, root);
  });

  it('renders the AceEditor with the correct props', () => {
    expect(AceEditor).toHaveBeenRenderedWithProps({
      value: code,
      onChange: changeHandler
    });
  });
});