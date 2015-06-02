require('../spec_helper');
describe('BasePane', function() {
  var BasePane;
  beforeEach(function() {
    BasePane = require('../../../src/pivotal-ui-react/panes/panes').BasePane;
    React.render(<BasePane>Pane content here</BasePane>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('creates a pane and container', function() {
    expect('.pane .container').toContainText('Pane content here');
  });

  describe('when inner and outer classes are provided', function() {
    beforeEach(function() {
      React.unmountComponentAtNode(root);
      React.render(<BasePane outerClass="bg-dark-1" innerClass="bg-glow"/>, root);
    });

    it('add classes to the pane and container', function() {
      expect('.pane').toHaveClass('bg-dark-1');
      expect('.container').toHaveClass('bg-glow');
    });
  });

  describe('when data-attributes are provided', function() {
    beforeEach(function() {
      React.unmountComponentAtNode(root);
      React.render(<BasePane data-foo="baz"/>, root);
    });

    it('attaches the attributes to the .pane', function() {
      expect('.pane').toHaveAttr('data-foo', 'baz');
    });
  });
});
