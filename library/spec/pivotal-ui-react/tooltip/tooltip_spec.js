require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

describe('tooltip', function() {
  var props = {
    className: 'test-class',
    id: 'test-id',
    style: {
      opacity: '0.5'
    }
  };

  beforeEach(function() {
    var Tooltip = require('../../../src/pivotal-ui-react/tooltip/tooltip').Tooltip;
    ReactDOM.render((<Tooltip {...props}><div className="tooltip-text">Hello World</div></Tooltip>), root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('works', function() {
    expect('.tooltip-text').toExist();
  });

  itPropagatesAttributes('#root #test-id', props);
});
