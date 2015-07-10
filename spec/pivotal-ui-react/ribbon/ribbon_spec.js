require('../spec_helper');
var Ribbon = require('../../../src/pivotal-ui-react/ribbons/ribbons').Ribbon;
var PrimaryRibbon = require('../../../src/pivotal-ui-react/ribbons/ribbons').PrimaryRibbon;
var Banner = require('../../../src/pivotal-ui-react/ribbons/ribbons').Banner;

describe('Ribbon', function() {
  describe('basic Ribbon', function() {
    beforeEach(function() {
      React.render(<Ribbon>British</Ribbon>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('renders a inline ribbon', function() {
      expect('.inline-ribbon').toHaveText('British');
      expect('.inline-ribbon').not.toHaveClass('ribbon-primary');
    });
  });

  describe('Ribbon with custom attributes', function() {
    beforeEach(function() {
      React.render(<Ribbon className="1234" id="test" style={{color: 'red'}}>British</Ribbon>, root);
    });

    it('renders a ribbon with custom attributes', function() {
      expect('.inline-ribbon').toHaveClass('1234');
      expect('.inline-ribbon').toHaveAttr('id', 'test');
      expect('.inline-ribbon').toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });
});

describe('PrimaryRibbon', function() {
  describe('basic PrimaryRibbon', function() {

    beforeEach(function() {
      React.render(<PrimaryRibbon>British</PrimaryRibbon>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('adds the ribbon-primary class', function() {
      expect('.inline-ribbon').toHaveText('British');
      expect('.inline-ribbon').toHaveClass('ribbon-primary');
    });
  });

  describe('PrimaryRibbon with custom attributes', function() {
    beforeEach(function() {
      React.render(<PrimaryRibbon className="1234" id="test" style={{color: 'red'}}>British</PrimaryRibbon>, root);
    });

    it('renders a ribbon with custom attributes', function() {
      expect('.inline-ribbon').toHaveClass('1234');
      expect('.inline-ribbon').toHaveAttr('id', 'test');
      expect('.inline-ribbon').toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });
});


describe('Banner', function() {
  describe('basic Banner', function() {

    beforeEach(function() {
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

  describe('Banner with custom attributes', function() {
    beforeEach(function() {
      React.render(<Banner className="1234" id="test" style={{color: 'red'}}>British</Banner>, root);
    });

    it('renders a ribbon with custom attributes', function() {
      expect('.ribbon-banner').toHaveClass('1234');
      expect('.ribbon-banner').toHaveAttr('id', 'test');
      expect('.ribbon-banner').toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });
});
