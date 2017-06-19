import '../../spec_helper';

describe('JsCodeArea', () => {
  let code, description, JsCodeArea;

  beforeEach(() => {
    code = 'let a = 1; let b = 2;';
    JsCodeArea = require('../../../src/components/code_area/js_code_area');
  });

  describe('rendering a description without markdown', () => {
    beforeEach(() => {
      description = 'some-description';
      ReactDOM.render(<JsCodeArea {...{description, code}}/>, root);
    });

    it('renders the description', () => {
      expect('.code-area-description').toHaveText(description);
    });
  });

  describe('rendering a description with markdown', () => {
    beforeEach(() => {
      description = 'not bold **some-description** also not bold';
      ReactDOM.render(<JsCodeArea {...{description, code}}/>, root);
    });

    it('correctly renders the markdown', () => {
      expect('strong').toHaveText('some-description');
    });
  });
});