require('../spec_helper');
describe('Label', function() {
  var Label;
  beforeEach(function() {
    Label = require('../../../src/pivotal-ui-react/labels/labels').Label;
    React.render(<Label>bananas</Label>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('renders a primary colored label', function() {
    expect('#root span').toHaveClass('label');
    expect('#root span').toHaveClass('label-primary');
    expect('#root span').toHaveText('bananas');
  });

  function renderLabel(props) {
    React.render(<Label {...props}>bananas</Label>, root);
  }

  describe('when custom options are added', function() {
    beforeEach(function() {
      renderLabel({
        title: 'stuff',
        id: 'things',
        className: 'foo',
        style: {
          height: '5px'
        }
      });
    });

    it('renders a label with custom options', function() {
      expect('#root span').toHaveAttr('title', 'stuff');
      expect('#root span').toHaveAttr('id', 'things');
      expect('#root span').toHaveClass('foo');
      expect('#root span').toHaveAttr('style', 'height: 5px;');
    });
  });
});
