import '../../spec_helper';

describe('ReactEditor', () => {
  let subject, code;
  beforeEach(() => {
    const ReactEditor = require('../../../src/components/code_area/react_editor');
    code = "i++";
    subject = ReactDOM.render(<ReactEditor code={code} changeHandler={() => {}}/>, root);
  });

  it('renders an editor', () => {
    expect(".code-editor--edit").toExist();
  });

  it('renders the code in the editor', (done) => {
    jasmine.clock().uninstall();
    setTimeout(() => {
      expect('.ace_text-layer').toContainText(code);
      done();
    }, 1)
  })
});
