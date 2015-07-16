require('../spec_helper');
describe('BasePane', function() {
  var BasePane;
  beforeEach(function() {
    BasePane = require('../../../src/pivotal-ui-react/panes/panes').BasePane;
    React.render(<BasePane className="my-pane">Pane content here</BasePane>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('creates a pane and container', function() {
    expect('.pane .container').toContainText('Pane content here');
  });

  it('creates a pane with the expected class', function() {
    expect('.pane').toHaveClass('my-pane');
  });

  describe('when inner and outer attributes are provided', function() {
    beforeEach(function() {
      React.unmountComponentAtNode(root);
      React.render(<BasePane className="bg-dark-1 more-outer" innerClassName="bg-glow"
        id="outer-id" style={{opacity: '0.5'}}/>, root);
    });

    it('add classes, id, and styles to the pane and container', function() {
      expect('.pane').toHaveClass('bg-dark-1');
      expect('.container').toHaveClass('bg-glow');
      expect('.pane').toHaveAttr('id', 'outer-id');
      expect('.pane').toHaveCss({opacity: '0.5'});
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
