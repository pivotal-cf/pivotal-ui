import PreRenderer from '../../../src/components/renderers/pre_renderer';
import CodeExample from '../../../src/components/code_example';

describe('PreRenderer', () => {
  let code, subject;

  beforeEach(() => {
    code = ['echo "hello";', 'echo "world";'].join('\n');
    spyOnRender(CodeExample);
    subject = testRender(<PreRenderer {...{
      children: [
        <span className="language-bash" children={[code]}/>
      ]
    }}/>);
  });

  it('renders a pre tag', () => {
    expect('pre.md-pre').toHaveClass(['border', 'border-not-rounded', 'language-bash']);
    expect('pre.md-pre').toHaveText(code);
  });

  describe('when the language is JavaScript', () => {
    beforeEach(() => {
      code = ['const x = "hello";', 'const y = "world";'].join('\n');
      subject.setProps({children: [
        <span className="language-js" children={[code]}/>
      ]});
    });

    it('renders a code example', () => {
      expect(CodeExample).toHaveBeenRenderedWithProps({
        code,
        description: '',
        lang: 'language-js',
        noToolbar: false,
        title: ''
      });
    });

    describe('when a //title is given', () => {
      beforeEach(() => {
        subject.setProps({children: [
          <span className="language-js" children={[`//title=My example\n${code}`]}/>
        ]});
      });

      it('renders a code example', () => {
        expect(CodeExample).toHaveBeenRenderedWithProps({
          code,
          description: '',
          lang: 'language-js',
          noToolbar: false,
          title: 'My example'
        });
      });
    });

    describe('when a //description is given', () => {
      beforeEach(() => {
        subject.setProps({children: [
          <span className="language-js" children={[`//description=My description\n${code}`]}/>
        ]});
      });

      it('renders a code example', () => {
        expect(CodeExample).toHaveBeenRenderedWithProps({
          code,
          description: 'My description',
          lang: 'language-js',
          noToolbar: false,
          title: ''
        });
      });
    });

    describe('when //noToolbar is given', () => {
      beforeEach(() => {
        subject.setProps({children: [
          <span className="language-js" children={[`//noToolbar\n${code}`]}/>
        ]});
      });

      it('renders a code example', () => {
        expect(CodeExample).toHaveBeenRenderedWithProps({
          code,
          description: '',
          lang: 'language-js',
          noToolbar: true,
          title: ''
        });
      });
    });

    describe('when //nonInteractive is given', () => {
      beforeEach(() => {
        subject.setProps({children: [
          <span className="language-js" children={[`//nonInteractive\n${code}`]}/>
        ]});
      });

      it('renders a pre tag', () => {
        expect('pre.md-pre').toHaveClass(['border', 'border-not-rounded', 'language-js']);
        expect('pre.md-pre code').toHaveText(code);
      });
    });
  });
});