require('../spec_helper');

describe('OverlayTrigger', function() {
  beforeEach(function() {
    var Tooltip = require('../../../src/pivotal-ui-react/tooltip/tooltip').Tooltip;
    var OverlayTrigger = require('../../../src/pivotal-ui-react/overlay-trigger/overlay-trigger').OverlayTrigger;
    var tooltip = (<Tooltip><div className="tooltip-text">Hello World</div></Tooltip>);
    var launcher = (<div className="launcher">Hover For Tooltip</div>);
    var overlay = (
      <OverlayTrigger placement="bottom" overlay={tooltip} className='overlay' id='test' style={{'padding': '5px'}}>
        {launcher}
      </OverlayTrigger>
    );
    React.render(overlay, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('hovering over the launcher', function() {
    beforeEach(function() {
      expect('.tooltip-text').not.toExist();
      $('.launcher').simulate('mouseOver');
    });

    it('puts the tooltip in the DOM', function() {
      expect('.tooltip-text').toExist();
    });
  });
});
