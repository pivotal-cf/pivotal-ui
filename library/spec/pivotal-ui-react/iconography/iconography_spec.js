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
  
  it('propagates className and id to the span', () => {
    ReactDOM.render(<Icon src='add' className="foo" id="bar"/>, root);
    expect('.svgicon').toHaveClass('foo');
    expect('.svgicon').toHaveAttr('id', 'bar');
  });

  describe('verticalAlign', () => {
    it('if verticalAlign is not specified it applies the .svg-middle', () => {
      ReactDOM.render(<Icon src='add'/>, root);
      expect('.svgicon').toHaveClass('svg-middle');
    });

    it('if verticalAlign=baseline it applies the .svg-middle class', () => {
      ReactDOM.render(<Icon src='add' verticalAlign='middle'/>, root);
      expect('.svgicon').toHaveClass('svg-middle');
    });

    it('if verticalAlign=baseline it applies the .svg-baseline class', () => {
      ReactDOM.render(<Icon src='add' verticalAlign='baseline'/>, root);
      expect('.svgicon').toHaveClass('svg-baseline');
    });
  });
});
