import '../spec_helper';

describe('TocSidebar', () => {
  let TocSidebar;

  beforeEach(() => {
    TocSidebar = require('../../src/components/toc_sidebar');

    const json = [
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
        depth: 3,
        children: [
          {
            value: 'I am an H3'
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
        depth: 3,
        children: [
          {
            value: 'I am another H3'
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
      expect('.toc-sidebar a:eq(1)').toHaveText('I am an H3');
      expect('.toc-sidebar a:eq(1)').toHaveClass('heading-3');
      expect('.toc-sidebar a:eq(2)').toHaveText('I am another h2');
      expect('.toc-sidebar a:eq(2)').toHaveClass('heading-2');
      expect('.toc-sidebar a:eq(3)').toHaveText('I am another H3');
      expect('.toc-sidebar a:eq(3)').toHaveClass('heading-3');
    });

    it('as links to their subsections', () => {
      expect('.toc-sidebar a:eq(0)').toHaveAttr('href', '#i-am-an-h-2');
      expect('.toc-sidebar a:eq(1)').toHaveAttr('href', '#i-am-an-h-3');
      expect('.toc-sidebar a:eq(2)').toHaveAttr('href', '#i-am-another-h-2');
      expect('.toc-sidebar a:eq(3)').toHaveAttr('href', '#i-am-another-h-3');
    })
  });
});