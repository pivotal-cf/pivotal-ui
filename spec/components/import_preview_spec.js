import ImportPreview from '../../src/components/import_preview';

describe('ImportPreview', () => {
  let subject;

  beforeEach(() => {
    subject = testRender(<ImportPreview/>);
  });

  it('renders nothing with CSS or React paths', () => {
    expect('.styleguide-import-preview').not.toExist();
  });

  describe('with only a CSS path', () => {
    beforeEach(() => {
      subject.setProps({cssPath: 'pivotal-ui/css/alerts'});
    });

    it('renders only one import preview', () => {
      expect('.styleguide-import-preview:eq(0)').toExist();
      expect('.styleguide-import-preview:eq(1)').not.toExist();
    });

    it('renders the correct label and text', () => {
      expect('.styleguide-import-preview').toHaveClass('border');
      expect('.styleguide-import-preview > .border-bottom.em-high.pal.bg-white')
        .toHaveText('Import CSS');
      expect('.styleguide-import-preview > .pre-unstyled.man.md-pre.language-js > code')
        .toHaveText('import \'pivotal-ui/css/alerts\';');
    });
  });

  describe('with only a React path', () => {
    beforeEach(() => {
      subject.setProps({reactPath: 'pivotal-ui/react/alerts'});
    });

    it('renders only one import preview', () => {
      expect('.styleguide-import-preview:eq(0)').toExist();
      expect('.styleguide-import-preview:eq(1)').not.toExist();
    });

    describe('with one React component', () => {
      beforeEach(() => {
        subject.setProps({reactComponents: ['Component1']});
      });

      it('renders the correct label and text', () => {
        expect('.styleguide-import-preview').toHaveClass('border');
        expect('.styleguide-import-preview > .border-bottom.em-high.pal.bg-white')
          .toHaveText('Import React component');
        expect('.styleguide-import-preview > .pre-unstyled.man.md-pre.language-js > code')
          .toHaveText('import {Component1} from \'pivotal-ui/react/alerts\';');
      });
    });

    describe('with multiple React components', () => {
      beforeEach(() => {
        subject.setProps({reactComponents: ['Component1', 'Component2']});
      });

      it('renders the correct label and text', () => {
        expect('.styleguide-import-preview').toHaveClass('border');
        expect('.styleguide-import-preview > .border-bottom.em-high.pal.bg-white')
          .toHaveText('Import React components');
        expect('.styleguide-import-preview > .pre-unstyled.man.md-pre.language-js > code')
          .toHaveText('import {Component1, Component2} from \'pivotal-ui/react/alerts\';');
      });
    });
  });

  describe('with both CSS and React paths', () => {
    beforeEach(() => {
      subject.setProps({
        cssPath: 'pivotal-ui/css/alerts',
        reactPath: 'pivotal-ui/react/alerts',
        reactComponents: ['Component1', 'Component2']
      });
    });

    it('renders two import previews', () => {
      expect('.styleguide-import-preview:eq(0)').toExist();
      expect('.styleguide-import-preview:eq(1)').toExist();
      expect('.styleguide-import-preview:eq(2)').not.toExist();
    });

    it('renders the correct label and text for the React import', () => {
      expect('.styleguide-import-preview:eq(0)').toHaveClass('border');
      expect('.styleguide-import-preview:eq(0) > .border-bottom.em-high.pal.bg-white')
        .toHaveText('Import React components');
      expect('.styleguide-import-preview:eq(0) > .pre-unstyled.man.md-pre.language-js > code')
        .toHaveText('import {Component1, Component2} from \'pivotal-ui/react/alerts\';');
    });

    it('renders the correct label and text for the CSS import', () => {
      expect('.styleguide-import-preview:eq(1)').toHaveClass('border');
      expect('.styleguide-import-preview:eq(1) > .border-bottom.em-high.pal.bg-white')
        .toHaveText('Import CSS only');
      expect('.styleguide-import-preview:eq(1) > .pre-unstyled.man.md-pre.language-js > code')
        .toHaveText('import \'pivotal-ui/css/alerts\';');
    });
  });
});