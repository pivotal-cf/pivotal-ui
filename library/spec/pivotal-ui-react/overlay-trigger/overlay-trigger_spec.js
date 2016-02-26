require('../spec_helper');
const Tooltip = require('../../../src/pivotal-ui-react/tooltip/tooltip').Tooltip;
const OverlayTrigger = require('../../../src/pivotal-ui-react/overlay-trigger/overlay-trigger').OverlayTrigger;

describe('OverlayTrigger', function() {
  let subject;
  describe('core functionality', () => {
    beforeEach(() => {
      const tooltip = (
        <div className="tooltip-text" id="1"> Hello World </div>
      );

      const launcher = (<span className="launcher">Manually Ask For Tooltip</span>);

      const overlays = (
          <OverlayTrigger trigger="manual" display={true} placement="top" overlay={tooltip} pin={false}>
            {launcher}
          </OverlayTrigger>
      );
      subject = ReactDOM.render(overlays, root);
    });

    it('renders the launcher', () => {
      expect('.launcher').toHaveText('Manually Ask For Tooltip');
    });

    describe('with the tooltip open', function() {
      beforeEach(() => {
        subject::setProps({display: true});
      });

      it('renders the tooltip', () => {
        expect('.tooltip-text').toExist();
      });
    });

    describe('with the tooltip closed', function() {
      beforeEach(() => {
        subject::setProps({display: false});
      });

      it('renders the tooltip', () => {
        expect('.tooltip-text').not.toExist();
      });
    });

    it('pins the overlay if it is outside the window', function() {
      subject::setProps({placement: 'left'});
      expect('.launcher').toHaveClass('overlay-placement-left');
      subject::setProps({pin: true});
      expect('.launcher').toHaveClass('overlay-placement-right');
    });

    describe('positioning', () => {
      beforeEach(() => {
        subject::setProps({pin: false});
      });

      it('works for top', () => {
        subject::setProps({placement: 'top'});
        expect('.launcher').toHaveClass('overlay-placement-top');
      });
      it('works for bottom', () => {
        subject::setProps({placement: 'bottom'});
        expect('.launcher').toHaveClass('overlay-placement-bottom');
      });
      it('works for left', () => {
        subject::setProps({placement: 'left'});
        expect('.launcher').toHaveClass('overlay-placement-left');
      });
      it('works for right', () => {
        subject::setProps({placement: 'right'});
        expect('.launcher').toHaveClass('overlay-placement-right');
      });
    });

    describe('callbacks', () => {
      let onEnteredSpy, onExitedSpy;

      beforeEach(() => {
        onEnteredSpy = jasmine.createSpy('onEntered');
        onExitedSpy = jasmine.createSpy('onExited');

        subject::setProps({onEntered: onEnteredSpy, onExited: onExitedSpy, display: false});
        onExitedSpy.calls.reset();
      });

      it('calls onEntered upon tooltip display', () => {
        subject::setProps({display: true});
        expect(onEnteredSpy).toHaveBeenCalled();
      });

      it('calls onExited upon tooltip display', () => {
        subject::setProps({display: true});
        subject::setProps({display: false});
        expect(onExitedSpy).toHaveBeenCalled()
      });

      it('does not call the callbacks when not changing', () => {
        subject::setProps({display: true});
        expect(onEnteredSpy).toHaveBeenCalled();
        onEnteredSpy.calls.reset();
        subject::setProps({display: true});
        expect(onEnteredSpy).not.toHaveBeenCalled();
      });
    });

    describe('delays', () => {
      beforeEach(() => {
        subject::setProps({display: false});
        expect('.pui-tooltip').not.toExist();
      });

      it('respects "delayShow"', () => {
        subject::setProps({delayShow: 5000});
        subject::setProps({display: true});
        jasmine.clock().tick(1);
        expect('.tooltip-text').not.toExist();
        jasmine.clock().tick(5000);
        expect('.tooltip-text').toExist();
      });

      it('respects "delayHide"', () => {
        subject::setProps({delayHide: 2000});
        subject::setProps({display: true});
        subject::setProps({display: false});
        jasmine.clock().tick(1);
        expect('.tooltip-text').toExist();
        jasmine.clock().tick(1999);
        expect('.tooltip-text').not.toExist();
      });

      it('respects "delay"', () => {
        subject::setProps({delay: 3000});
        subject::setProps({display: true});
        expect('.tooltip-text').not.toExist();
        jasmine.clock().tick(3000);
        expect('.tooltip-text').toExist();
        subject::setProps({display: false});
        expect('.tooltip-text').toExist();
        jasmine.clock().tick(3000);
        expect('.tooltip-text').not.toExist();
      });
    });
  });

  describe('when no id is provided', function() {
    beforeEach(function() {
      const tooltip = (
        <Tooltip className="tooltip-text"> Hello World </Tooltip>
      );
      const tooltip2 = (
        <Tooltip className="tooltip-text">Hello World2 </Tooltip>
      );
      const launcher = (<div style={{margin: 200}}className="launcher">Hover For Tooltip</div>);

      const overlays = (
        <OverlayTrigger placement="bottom" display={true} overlay={tooltip2}>
          <OverlayTrigger placement="left" display={true} overlay={tooltip}>
            {launcher}
          </OverlayTrigger>
        </OverlayTrigger>
      );
      ReactDOM.render(overlays, root);
    });

    it('generates an id', function() {
      expect($('.pui-tooltip')[0].id).not.toEqual('');
      expect($('.pui-tooltip')[1].id).not.toEqual('');
    });

    it('id is unique', function() {
      expect($('.pui-tooltip')[0].id).not.toEqual($('.pui-tooltip')[1].id);
    });
  });

  describe('when an id is provided', function() {
    beforeEach(function() {
      const tooltip = (
        <Tooltip id="toiletpaper" className="tooltip-text">Hello World2 </Tooltip>
      );
      const launcher = (<span className="launcher">Hover For Tooltip</span>);

      const overlays = (
        <OverlayTrigger display={true} placement="left" overlay={tooltip}>
          {launcher}
        </OverlayTrigger>
      );
      ReactDOM.render(overlays, root);
    });

    it('uses provided id', function() {
      expect('.pui-tooltip').toHaveAttr('id', 'toiletpaper');
    });

    it('uses aria-described-by', () => {
      expect($('.pui-tooltip')[0].id).toEqual($('.launcher').attr('aria-describedby'));
    });
  });

  describe('triggering', function() {
    let onMouseOverSpy, onClickSpy;

    beforeEach(() => {
      const tooltip = (
        <div className="tooltip-text" id="1"> Hello World </div>
      );
      onMouseOverSpy = jasmine.createSpy('onMouseOver');
      onClickSpy = jasmine.createSpy('onClick');
      const launcher = (
        <span className="launcher" onMouseOver={onMouseOverSpy} onClick={onClickSpy}>
          Manually Ask For Tooltip
        </span>
      );

      const overlays = (
        <OverlayTrigger placement="top" overlay={tooltip} pin={false}>
          {launcher}
        </OverlayTrigger>
      );
      subject = ReactDOM.render(overlays, root);
    });

    it('triggers on hover', () => {
      subject::setProps({trigger: 'hover'});
      expect('.tooltip-text').not.toExist();
      $('.launcher').simulate('mouseOver');
      expect('.tooltip-text').toExist();
      $('.launcher').simulate('mouseOut');
      expect('.tooltip-text').not.toExist();
    });

    it('does not override user callbacks', () => {
      subject::setProps({trigger: 'hover'});
      $('.launcher').simulate('mouseOver');
      expect(onMouseOverSpy).toHaveBeenCalled();
      subject::setProps({trigger: 'click'});
      $('.launcher').simulate('click');
      expect(onClickSpy).toHaveBeenCalled();
    });

    it('triggers on focus', () => {
      subject::setProps({trigger: 'focus'});
      expect('.tooltip-text').not.toExist();
      $('.launcher').simulate('focus');
      expect('.tooltip-text').toExist();
      $('.launcher').simulate('blur');
      expect('.tooltip-text').not.toExist();
    });

    it('triggers on click', () => {
      subject::setProps({trigger: 'click'});
      expect('.tooltip-text').not.toExist();
      $('.launcher').simulate('click');
      expect('.tooltip-text').toExist();
      $('.launcher').simulate('click');
      expect('.tooltip-text').not.toExist();
    });

    describe('root close', () => {
      beforeEach(() => {
        subject::setProps({trigger: 'click', rootClose: true});
      });

      it('allows clicking on the trigger to still work', () => {
        $('.launcher').simulate('click');
        expect('.tooltip-text').toExist();
      });

      it('closes the tooltip when clicking on the body', () => {
        $('.launcher').simulate('click');
        expect('.tooltip-text').toExist();
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true );
        document.documentElement.dispatchEvent(evt);
        expect('.tooltip-text').not.toExist();
      });

      it('does not close if rootClose is false', () => {
        subject::setProps({rootClose: false});
        $('.launcher').simulate('click');
        expect('.tooltip-text').toExist();
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true );
        document.documentElement.dispatchEvent(evt);
        expect('.tooltip-text').toExist();
      });
    });

  });

  describe('accessibility', function() {
    it('passes ADT', function() {
      const tooltip = (
        <Tooltip className="tooltip-text" id="tooltip3">Hello World</Tooltip>
      );
      const launcher = (<span className="launcher">Hover For Tooltip</span>);

      const overlays = (
        <OverlayTrigger display={true} placement="top" overlay={tooltip} container={root}>
          {launcher}
        </OverlayTrigger>
      );
      ReactDOM.render(overlays, root);

      expect(root).toPassADT();
    });
  });
});
