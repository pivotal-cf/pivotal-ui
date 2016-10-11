require('../spec_helper');

var Icon = require('../../../src/pivotal-ui-react/iconography/iconography').Icon;

describe('iconography', function() {
  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('works', function() {
    ReactDOM.render(<Icon src='add'/>, root);
    expect('.svgicon svg').toExist();
  });

  describe('when a style is given', function() {
    it('adds the style to the svg', function() {
      ReactDOM.render(<Icon src='add' style={{height: 100}}/>, root);
      expect('.svgicon svg').toHaveAttr('style', /height: 100px;/);
    });
  });

  it('propagates className and id to the span', () => {
    ReactDOM.render(<Icon src='add' className="foo" id="bar"/>, root);
    expect('.svgicon').toHaveClass('foo');
    expect('.svgicon').toHaveAttr('id', 'bar');
  });
});
