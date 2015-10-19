require('../pivotal-ui-react/spec_helper');

import StyleguideNav from '../../src/styleguide/styleguide-nav';

describe('StyleguideNav', () => {
  beforeEach(() => {
    const navTree = {
      CSS: {
        base: {
          eggplant: "purple.html"
        },
        objects: {
          apples: "red.html"
        }
      },
      React: {
        objects: {
          carrots: "orange.html"
        },
        base: {
          apples: "red.html"
        }
      }
    };

    React.render(
      <StyleguideNav navTree={navTree}
                     defaultLanguage={'react'}
                     defaultComponentType={'objects'}/>,
      root
    );

    MockRaf.next();
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('creates top-level language tabs with react first', () => {
    expect('.nav-tabs li:eq(0)').toContainText('React');
    expect('.nav-tabs li:eq(1)').toContainText('CSS');
  });

  it('selects language provided as default', () => {
    expect('.nav-tabs li.active').toContainText('React');
  });

  it('creates second-level category collapses', () => {
    expect(".tab-pane:eq(0)").toContainText('objects');
    expect(".tab-pane:eq(1)").toContainText('base');
    expect(".tab-pane:eq(1)").toContainText('objects');
  });

  it('sets default component type collapse of each tab to be defaultExpanded', () => {
    expect(".tab-pane:eq(1) .nav-component-type:contains('objects') .panel-heading a").not.toHaveClass('collapsed');
    expect(".tab-pane:eq(0) .nav-component-type:contains('objects') .panel-heading a").not.toHaveClass('collapsed');

    expect(".tab-pane:eq(1) .nav-component-type:contains('base') .panel-heading a").toHaveClass('collapsed');
    expect(".tab-pane:eq(0) .nav-component-type:contains('base') .panel-heading a").toHaveClass('collapsed');
  });

  it('creates component links', () => {
    expect(".tab-pane:eq(0) a:contains('carrots')")
      .toHaveAttr('href', 'orange.html');

    expect(".tab-pane:eq(1) a:contains('eggplant')")
      .toHaveAttr('href', 'purple.html');
  });
});
