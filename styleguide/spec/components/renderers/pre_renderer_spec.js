import '../../spec_helper';

describe('PreRenderer', () => {
  let file, name, JsCodeArea, PreRenderer, code, contents, title, description;

  beforeEach(() => {
    code = ['const a = 1;', 'const b = 2;'].join('\n');
    file = 'some-file';
    name = 'some-name';
    JsCodeArea = require('../../../src/components/code_area/js_code_area');
    spyOnRender(JsCodeArea);
    PreRenderer = require('../../../src/components/renderers/pre_renderer')(file, name);
  });

  describe('with className "language-js"', () => {

    describe('without title or description', () => {
      beforeEach(() => {
        ReactDOM.render((
          <PreRenderer>
            <span className="language-js" children={[code]}/>
            <span>Some other span</span>
          </PreRenderer>
        ), root);
      });

      it('renders JsCodeArea', () => {
        expect(JsCodeArea).toHaveBeenRenderedWithProps({
          code,
          file,
          name
        });
      });
    });

    describe('with title', () => {
      beforeEach(() => {
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
      beforeEach(() => {
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
      beforeEach(() => {
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

    describe('without a toolbar', () => {
      beforeEach(() => {
        contents = [
          `::noToolbar`,
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
          code,
          file,
          name,
          noToolbar: true
        });
      })
    });

  });

  describe('with className "language-html"', () => {
    let HtmlCodeArea;

    beforeEach(() => {
      HtmlCodeArea = require('../../../src/components/code_area/html_code_area');
      spyOnRender(HtmlCodeArea);
    });

    describe('without title or description', () => {
      beforeEach(() => {
        ReactDOM.render((
          <PreRenderer>
            <span className="language-html" children={[code]}/>
            <span>Some other span</span>
          </PreRenderer>
        ), root);
      });

      it('renders HtmlCodeArea', () => {
        expect(HtmlCodeArea).toHaveBeenRenderedWithProps({
          code,
          file,
          name
        });
      });
    });

    describe('without a toolbar', () => {
      beforeEach(() => {
        contents = [
          `::noToolbar`,
          code
        ].join('\n');

        ReactDOM.render((
          <PreRenderer>
            <span className="language-html" children={[contents]}/>
            <span>Some other span</span>
          </PreRenderer>
        ), root);
      });

      it('renders HtmlCodeArea', () => {
        expect(HtmlCodeArea).toHaveBeenRenderedWithProps({
          code,
          file,
          name,
          noToolbar: true
        });
      })
    });
  });
});