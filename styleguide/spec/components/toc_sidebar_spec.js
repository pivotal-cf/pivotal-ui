import '../spec_helper';
const TocSidebar = require('../../src/components/toc_sidebar');

describe('TocSidebar', () => {
  let json;
  describe('headers', () => {
    beforeEach(() => {
      json = [
        {
          type: 'heading',
          depth: 2,
          children: [
            {
              value: 'I am an h2'
            }
          ]
        },
        {
          type: 'heading',
          depth: 4,
          children: [
            {
              value: 'I am an H4'
            }
          ]
        },
        {
          type: 'heading',
          depth: 2,
          children: [
            {
              value: 'I am another h2'
            }
          ]
        },
        {
          type: 'heading',
          depth: 4,
          children: [
            {
              value: 'I am another H4'
            }
          ]
        },
        {
          type: 'code'
        }
      ];

      ReactDOM.render(<TocSidebar {...{json}}/>, root);
    });

    it('renders the toc sidebar', () => {
      expect('.toc-sidebar').toExist();
    });

    describe('renders the headings', () => {
      it('with the correct classes', () => {
        expect('.toc-sidebar a:eq(0)').toHaveText('I am an h2');
        expect('.toc-sidebar a:eq(0)').toHaveClass('heading-2');
        expect('.toc-sidebar a:eq(1)').toHaveText('I am an H4');
        expect('.toc-sidebar a:eq(1)').toHaveClass('heading-4');
        expect('.toc-sidebar a:eq(2)').toHaveText('I am another h2');
        expect('.toc-sidebar a:eq(2)').toHaveClass('heading-2');
        expect('.toc-sidebar a:eq(3)').toHaveText('I am another H4');
        expect('.toc-sidebar a:eq(3)').toHaveClass('heading-4');
      });

      it('as links to their subsections', () => {
        expect('.toc-sidebar a:eq(0)').toHaveAttr('href', '#i-am-an-h-2');
        expect('.toc-sidebar a:eq(1)').toHaveAttr('href', '#i-am-an-h-4');
        expect('.toc-sidebar a:eq(2)').toHaveAttr('href', '#i-am-another-h-2');
        expect('.toc-sidebar a:eq(3)').toHaveAttr('href', '#i-am-another-h-4');
      })
    });
  });

  describe('jsx code-block', () => {
    beforeEach(() => {
      json = [
        {
          "type": "code",
          "lang": "jsx",
          "value": "::title=Example Title\n<div>foo</div>"
        }
      ];

      ReactDOM.render(<TocSidebar {...{json}}/>, root);
    });

    it('renders the titles', () => {
      expect('.toc-sidebar a:eq(0)').toHaveText('Example Title');
    });

    it('as links to their examples', () => {
      expect('.toc-sidebar a:eq(0)').toHaveAttr('href', '#example-title');
    });
  });

  describe('html code-block', () => {
    beforeEach(() => {
      json = [
        {
          "type": "code",
          "lang": "html",
          "value": "::title=Basic Example\n<div>content</div>"
        }
      ];

      ReactDOM.render(<TocSidebar {...{json}}/>, root);
    });

    it('renders the titles', () => {
      expect('.toc-sidebar a:eq(0)').toHaveText('Basic Example');
    });

    it('as links to their examples', () => {
      expect('.toc-sidebar a:eq(0)').toHaveAttr('href', '#basic-example');
    });
  });
});