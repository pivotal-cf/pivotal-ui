require('../pivotal-ui-react/spec_helper');

import StyleguideNav from '../../src/styleguide/styleguide-nav';

describe('StyleguideNav', () => {
  beforeEach(() => {
    const navTree = {
      CSS: {
        elements: {
          eggplant: "purple.html"
        },
        fruits: {
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
      <StyleguideNav navTree={navTree} defaultLanguage={'React'}/>
      ,
      root
    );
  });

  it('creates top-level language tabs with react first', () => {
    expect('.nav-tabs li:eq(0)').toContainText('React');
    expect('.nav-tabs li:eq(1)').toContainText('CSS');
  });

  it('selects language provided as default', () => {
    expect('.nav-tabs li.active').toContainText('React');
  });

  it('creates second-level category collapses', () => {
    expect(".panel:contains('React')").toContainText('objects');
    expect(".panel:contains('CSS')").toContainText('elements');
    expect(".panel:contains('CSS')").toContainText('fruits');
  });

  it('sets only the first (alphabetically) category collapse of each tab to be defaultExpanded', () => {
    expect(".panel:contains('CSS') .nav-component-type:contains('elements') .panel-heading a").not.toHaveClass('collapsed');
    expect(".panel:contains('React') .nav-component-type:contains('base') .panel-heading a").not.toHaveClass('collapsed');

    expect(".panel:contains('CSS') .nav-component-type:contains('fruits') .panel-heading a").toHaveClass('collapsed');
    expect(".panel:contains('React') .nav-component-type:contains('objects') .panel-heading a").toHaveClass('collapsed');
  });

  it('creates component links', () => {
    expect(".panel:contains('React') a:contains('carrots')")
      .toHaveAttr('href', 'orange.html');

    expect(".panel:contains('CSS') a:contains('eggplant')")
      .toHaveAttr('href', 'purple.html');
  })
});