require('../pivotal-ui-react/spec_helper');

import StyleguideNav from '../../src/styleguide/styleguide-nav';

describe('StyleguideNav', () => {
  beforeEach(() => {
    const navTree = {
      CSS: {
        elements: {
          eggplant: "purple.html"
        }
      },
      React: {
        objects: {
          carrots: "orange.html"
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
  });

  it('creates component links', () => {
    expect(".panel:contains('React') a:contains('carrots')")
      .toHaveAttr('href', 'orange.html');

    expect(".panel:contains('CSS') a:contains('eggplant')")
      .toHaveAttr('href', 'purple.html');
  })
});