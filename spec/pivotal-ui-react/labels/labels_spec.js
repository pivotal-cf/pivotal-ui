require('../spec_helper');
describe('Label', function() {
  beforeEach(function() {
    var Label = require('../../../src/pivotal-ui-react/labels/labels').Label;
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
});
