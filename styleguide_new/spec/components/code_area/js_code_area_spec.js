import '../../spec_helper';

describe('JsCodeArea', () => {
  let code, description, JsCodeArea;

  beforeEach(() => {
    code = '<div>Hi</div>';
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

  describe('rendering valid JSX with invalid JavaScript', () => {
    beforeEach(() => {
      code = `
      class BadComponent extends React.Component {
        render() {
          throw Error('render error')
        }
      }
      <BadComponent/>
      `
      spyOn(console, 'log');
    });

    it('does not throw an error on render', () => {
      expect(() => {
        ReactDOM.render(<JsCodeArea {...{description, code}}/>, root);
      }).not.toThrow();
    });

    it('renders the error message for the user', () => {
      ReactDOM.render(<JsCodeArea {...{description, code}}/>, root);
      expect('.code-editor--live-preview pre').toContainText('render error');
    });
  });
});