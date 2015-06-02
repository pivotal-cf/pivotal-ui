require('../spec_helper');

describe('tooltip', function() {
  beforeEach(function() {
    var Tooltip = require('../../../src/pivotal-ui-react/tooltip/tooltip').Tooltip;
    React.render((<Tooltip><div className="tooltip-text">Hello World</div></Tooltip>), root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('works', function() {
    expect('.tooltip-text').toExist();
  });
});
