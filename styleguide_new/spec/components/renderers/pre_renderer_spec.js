import '../../spec_helper';

describe('PreRenderer', () => {
  let file, name, JsCodeArea, PreRenderer;

  beforeEach(() => {
    file = 'some-file';
    name = 'some-name';
    JsCodeArea = require('../../../src/components/code_area/js_code_area');
    spyOnRender(JsCodeArea);
    PreRenderer = require('../../../src/components/renderers/pre_renderer')(file, name);
  });

  describe('with className "language-js"', () => {
    let code;

    describe('without title or description', () => {
      beforeEach(() => {
        code = ['const a = 1;', 'const b = 2;'].join('\n');
        ReactDOM.render((
          <PreRenderer>
            <span className="language-js" children={[code]}/>
            <span>Some other span</span>
          </PreRenderer>
        ), root);
      });

      it('renders JsCodeArea', () => {
        expect(JsCodeArea).toHaveBeenRenderedWithProps({
          title: '',
          code,
          file,
          name
        });
      });
    });

    describe('with title', () => {
      let contents, title;

      beforeEach(() => {
        code = [
          'const a = 1;',
          'const b = 2;'
        ].join('\n');
        title = 'some-title';
        contents = [
          `::title=${title}`,
          code
        ].join('\n');
        ReactDOM.render((
          <PreRenderer>
            <span className="language-js" children={[contents]}/>
            <span>Some other span</span>
          </PreRenderer>
        ), root);
      });

      it('renders JsCodeArea', () => {
        expect(JsCodeArea).toHaveBeenRenderedWithProps({
          title,
          code,
          file,
          name
        });
      });
    });

    describe('with description', () => {
      let contents, description;

      beforeEach(() => {
        code = [
          'const a = 1;',
          'const b = 2;'
        ].join('\n');
        description = 'some-description';
        contents = [
          `::description=${description}`,
          code
        ].join('\n');
        ReactDOM.render((
          <PreRenderer>
            <span className="language-js" children={[contents]}/>
            <span>Some other span</span>
          </PreRenderer>
        ), root);
      });

      it('renders JsCodeArea', () => {
        expect(JsCodeArea).toHaveBeenRenderedWithProps({
          title: '',
          description,
          code,
          file,
          name
        });
      });
    });

    describe('with title and description', () => {
      let contents, description, title;

      beforeEach(() => {
        code = [
          'const a = 1;',
          'const b = 2;'
        ].join('\n');
        title = 'some title';
        description = 'some-description';
        contents = [
          `::title=${title}`,
          `::description=${description}`,
          code
        ].join('\n');
        ReactDOM.render((
          <PreRenderer>
            <span className="language-js" children={[contents]}/>
            <span>Some other span</span>
          </PreRenderer>
        ), root);
      });

      it('renders JsCodeArea', () => {
        expect(JsCodeArea).toHaveBeenRenderedWithProps({
          title,
          description,
          code,
          file,
          name
        });
      });
    });
  });
});