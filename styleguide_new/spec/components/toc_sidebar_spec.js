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
            value: 'I am an H2'
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
        type: 'code'
      }
    ];

    ReactDOM.render(<TocSidebar {...{json}}/>, root);
  });

  it('renders the toc sidebar', () => {
    expect('.toc-sidebar').toExist();
  });

  it('renders headings with the correct classes', () => {
    expect('.toc-sidebar .heading-2').toHaveText('I am an H2');
    expect('.toc-sidebar .heading-3').toHaveText('I am an H3');
  });
});