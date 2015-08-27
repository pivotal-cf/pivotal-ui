require('../spec_helper');
var Tooltip = require('../../../src/pivotal-ui-react/tooltip/tooltip').Tooltip;
var OverlayTrigger = require('../../../src/pivotal-ui-react/overlay-trigger/overlay-trigger').OverlayTrigger;

describe('OverlayTrigger', function() {
  afterEach(function() {
    React.unmountComponentAtNode(root);
  });


  describe('hovering over the launcher', function() {
    beforeEach(function() {
      var tooltip = (
        <Tooltip className="tooltip-text"> Hello World </Tooltip>
      );
      var launcher = (<span className="launcher">Hover For Tooltip</span>);

      var overlays = (
        <OverlayTrigger placement="top" overlay={tooltip}>
          {launcher}
        </OverlayTrigger>
      );
      React.render(overlays, root);

      expect('.tooltip-text').not.toExist();
      $('.launcher').simulate('mouseOver');
    });

    it('wraps the given children in a span with tab-index=0', function() {
      expect('span.overlay-trigger').toExist();
      expect('span.overlay-trigger').toHaveAttr('tabIndex', '0');
    });

    it('adds a leading space to the trigger contents to separate trigger from preceding text', function() {
      expect($('span.overlay-trigger').text()[0]).toEqual(' ');
    });

    it('puts the tooltip in the DOM', function() {
      expect('.tooltip-text').toExist();
    });
  });

  describe('when no id is provided', function() {
    beforeEach(function() {
      var tooltip = (
        <Tooltip className="tooltip-text"> Hello World </Tooltip>
      );
      var tooltip2 = (
        <Tooltip className="tooltip-text">Hello World2 </Tooltip>
      );
      var launcher = (<div className="launcher">Hover For Tooltip</div>);

      var overlays = (
        <OverlayTrigger placement="bottom" overlay={tooltip2}>
          <OverlayTrigger placement="left" overlay={tooltip}>
            {launcher}
          </OverlayTrigger>
        </OverlayTrigger>
      );
      React.render(overlays, root);

      expect('.tooltip-text').not.toExist();
      $('.launcher').simulate('mouseOver');
    });

    it('generates an id', function() {
      expect($('.tooltip')[0].id).not.toEqual('');
      expect($('.tooltip')[1].id).not.toEqual('');
    });

    it('id is unique', function() {
      expect($('.tooltip')[0].id).not.toEqual($('.tooltip')[1].id);
    });
  });

  describe('when an id is provided', function() {
    beforeEach(function() {
      var tooltip = (
        <Tooltip id="toiletpaper" className="tooltip-text">Hello World2 </Tooltip>
      );
      var launcher = (<span className="launcher">Hover For Tooltip</span>);

      var overlays = (
        <OverlayTrigger placement="left" overlay={tooltip}>
          {launcher}
        </OverlayTrigger>
      );
      React.render(overlays, root);

      expect('.tooltip-text').not.toExist();
      $('.launcher').simulate('mouseOver');
    });

    it('uses provided id', function() {
      expect('.tooltip#toiletpaper').toExist();
    });
  });

  describe('accessibility', function() {
    it('passes ADT', function() {
      var tooltip = (
        <Tooltip className="tooltip-text">Hello World</Tooltip>
      );
      var launcher = (<span className="launcher">Hover For Tooltip</span>);

      var overlays = (
        <OverlayTrigger placement="top" overlay={tooltip} container={root}>
          {launcher}
        </OverlayTrigger>
      );
      React.render(overlays, root);

      expect('.tooltip-text').not.toExist();
      $('.launcher').simulate('mouseOver');
      expect(root).toPassADT();
    });
  });
});
