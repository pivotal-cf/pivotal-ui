require('./spec_helper');

import StyleguideNav from '../../src/styleguide-nav';

describe('StyleguideNav', () => {
  beforeEach(() => {
    const navTree = {
      CSS: {
        eggplants: "purple.html",
        apples: "red.html"
      },
      React: {
        carrots: "orange.html",
        apples: "red.html"
      }
    };

    ReactDOM.render(
      <StyleguideNav navTree={navTree}
                     defaultLanguage={'react'}
                     />,
      root
    );
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('creates top-level language tabs with React first', () => {
    expect('.nav-tabs li:eq(0)').toContainText('React');
    expect('.nav-tabs li:eq(1)').toContainText('CSS');
  });

  it('selects language provided as default', () => {
    expect('.nav-tabs li.active').toContainText('React');
  });

  it('creates second-level links', () => {
    expect(".tab-pane:eq(0)").toContainText('apples');
    expect(".tab-pane:eq(0)").toContainText('carrots');
    expect(".tab-pane:eq(1)").toContainText('eggplants');
    expect(".tab-pane:eq(1)").toContainText('apples');
  });

  it('creates component links', () => {
    expect(".tab-pane:eq(0) a:eq(0)")
      .toHaveAttr('href', 'red.html');

    expect(".tab-pane:eq(1) a:eq(1)")
      .toHaveAttr('href', 'purple.html');
  });
});
