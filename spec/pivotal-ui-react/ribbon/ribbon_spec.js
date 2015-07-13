require('../spec_helper');

describe('Ribbon', function() {
  beforeEach(function() {
    var Ribbon = require('../../../src/pivotal-ui-react/ribbons/ribbons').Ribbon;
    React.render(<Ribbon>British</Ribbon>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('renders a ribbon', function() {
    expect('.ribbon').toHaveText('British');
    expect('.ribbon').not.toHaveClass('ribbon-primary');
  });
});

describe('PrimaryRibbon', function() {
  beforeEach(function() {
    var PrimaryRibbon = require('../../../src/pivotal-ui-react/ribbons/ribbons').PrimaryRibbon;
    React.render(<PrimaryRibbon>British</PrimaryRibbon>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('adds the ribbon-primary class', function() {
    expect('.ribbon').toHaveText('British');
    expect('.ribbon').toHaveClass('ribbon-primary');
  });
});


describe('Banner', function() {
  beforeEach(function() {
    var Banner = require('../../../src/pivotal-ui-react/ribbons/ribbons').Banner;
    React.render(<Banner>British</Banner>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('renders a Banner', function() {
    expect('.ribbon-banner').toHaveText('British');
    expect('.ribbon-banner').not.toHaveClass('ribbon-primary');
  });
});
