require('../spec_helper');

describe('Alpha', function() {
  var Alpha;
  beforeEach(function() {
    Alpha = require('../../../src/pivotal-ui-react/alpha/alpha').Alpha;
    React.render(<Alpha />, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('exists', function() {
    expect('.alpha').toExist();
  });
  // Insert tests here
});