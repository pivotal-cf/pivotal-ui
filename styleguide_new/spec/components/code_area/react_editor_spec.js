import '../../spec_helper';

describe('ReactEditor', () => {
  let subject, code, changeHandler, AceEditorWrapper;

  beforeEach(() => {
    const ReactEditor = require('../../../src/components/code_area/react_editor');
    AceEditorWrapper = require('../../../src/components/code_area/ace_editor_wrapper');

    code = "i++";
    changeHandler = () => {};
    spyOnRender(AceEditorWrapper).and.callThrough();

    subject = ReactDOM.render(<ReactEditor {...{code, changeHandler}}/>, root);
  });

  it('renders an editor', () => {
    expect(".code-editor--edit").toExist();
  });

  it('renders the Ace Editor wrapper with the correct props', () => {
    expect(AceEditorWrapper).toHaveBeenRenderedWithProps({code, changeHandler});
  });
});
