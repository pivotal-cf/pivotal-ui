require('../pivotal-ui-react/spec_helper');

import StyleguideNav from '../../src/styleguide/styleguide-nav';

describe('StyleguideNav', () => {
  beforeEach(() => {
    const navTree = {
      react: {
        objects: {
          carrots: "orange.html"
        }
      },
      css: {
        elements: {
          eggplant: "purple.html"
        }
      }
    };

    React.render(
      <StyleguideNav navTree={navTree} defaultLanguage={'react'} />
      ,
      root
    );
  });

  it('creates top-level language tabs', () => {
    expect('.nav-tabs li:eq(0)').toContainText('react');
    expect('.nav-tabs li:eq(1)').toContainText('css');
  });

  it('selects language provided as default', () => {
    expect('.nav-tabs li.active').toContainText('react');
  });

  it('creates second-level category collapses', () => {
    expect(".panel:contains('react')").toContainText('objects');
    expect(".panel:contains('css')").toContainText('elements');
  });

  it('creates component links', () => {
    expect(".panel:contains('react') a:contains('carrots')")
      .toHaveAttr('href', 'orange.html');

    expect(".panel:contains('css') a:contains('eggplant')")
      .toHaveAttr('href', 'purple.html');
  })
});