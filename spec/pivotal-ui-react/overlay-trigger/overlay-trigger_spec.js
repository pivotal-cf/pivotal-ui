import {Tooltip} from '../../../src/react/tooltip';
import {OverlayTrigger} from '../../../src/react/overlay-trigger';

describe('OverlayTrigger', () => {
  let subject;
  const launcher = <span className="launcher">Manually Ask For Tooltip</span>;
  const tooltip = <Tooltip className="tooltip-text" content="Hello World"/>;
  const renderComponent = props => ReactDOM.render(
    <OverlayTrigger {...props}>{launcher}</OverlayTrigger>, root);
  const createLauncher = props => <span className="launcher" {...props}>Manually Ask For Tooltip</span>;
  const renderComponentWithCustomLauncher = (props, customLauncher) => ReactDOM.render(
    <OverlayTrigger {...props}>{customLauncher}</OverlayTrigger>, root);

  const renderIntoDom = props => ReactDOM.render(<OverlayTrigger {...props}>{launcher}</OverlayTrigger>, root);

  it('renders the launcher', () => {
    subject = renderComponent({overlay: tooltip});
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).toHaveText('Manually Ask For Tooltip');
  });

  describe('with the tooltip open', () => {
    it('renders the tooltip', () => {
      subject = renderIntoDom({
        display: true,
        overlay: tooltip,
        trigger: 'manual',
        pin: false,
        placement: 'top'
      });
      expect($('.tooltip-text')).toExist();
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
    });
  });

  describe('with the tooltip closed', () => {
    it('hides the tooltip', () => {
      subject = renderIntoDom({overlay: tooltip});
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      expect($('.tooltip-text')).not.toExist();
    });
  });

  it('positions according to placement if pin is false, defaulting to right-side placement', () => {
    subject = renderComponent({overlay: tooltip, display: true, pin: false});
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).toHaveClass('pui-tooltip-right');

    subject = renderComponent({placement: 'left', overlay: tooltip, display: true, pin: false});
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).toHaveClass('pui-tooltip-left');

    subject = renderComponent({placement: 'left', overlay: tooltip, display: true, pin: false});
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).toHaveClass('pui-tooltip-left');

    subject = renderComponent({placement: 'top', overlay: tooltip, display: true, pin: false});
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).toHaveClass('pui-tooltip-top');

    subject = renderComponent({placement: 'bottom', overlay: tooltip, display: true, pin: false});
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).toHaveClass('pui-tooltip-bottom');

    subject = renderComponent({placement: 'right', overlay: tooltip, display: true, pin: false});
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).toHaveClass('pui-tooltip-right');
  });

  describe('callbacks', () => {
    let onEnteredSpy, onExitedSpy, launcher;

    beforeEach(() => {
      onEnteredSpy = jasmine.createSpy('onEntered');
      onExitedSpy = jasmine.createSpy('onExited');

      subject = renderComponent({
        overlay: tooltip,
        onEntered: onEnteredSpy,
        onExited: onExitedSpy,
        trigger: 'click'
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');

      onEnteredSpy.calls.reset();
      onExitedSpy.calls.reset();
    });

    it('calls onEntered upon tooltip display', () => {
      expect(onEnteredSpy).not.toHaveBeenCalled();
      ReactTestUtils.Simulate.click(launcher);

      expect(onEnteredSpy).toHaveBeenCalled();
    });

    it('calls onExited upon tooltip display', () => {
      expect(onExitedSpy).not.toHaveBeenCalled();
      ReactTestUtils.Simulate.click(launcher);
      ReactTestUtils.Simulate.click(launcher);
      expect(onExitedSpy).toHaveBeenCalled();
    });

    it('does not call the callbacks when not changing', () => {
      ReactTestUtils.Simulate.click(launcher);
      onEnteredSpy.calls.reset();

      ReactTestUtils.Simulate.focus(launcher);
      expect(onEnteredSpy).not.toHaveBeenCalled();
    });
  });

  describe('delays', () => {
    let launcher;
    it('respects "delayShow"', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'click',
        delayShow: 5000,
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
      ReactTestUtils.Simulate.click(launcher);

      jasmine.clock().tick(4999);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      jasmine.clock().tick(1);
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
    });

    it('respects "delayHide"', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'click',
        delayHide: 5000,
        display: true
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
      ReactTestUtils.Simulate.click(launcher);

      jasmine.clock().tick(4999);
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
      jasmine.clock().tick(1);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
    });

    it('respects "delay"', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'click',
        delay: 5000,
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
      ReactTestUtils.Simulate.click(launcher);

      jasmine.clock().tick(4999);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      jasmine.clock().tick(1);
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();

      ReactTestUtils.Simulate.click(launcher);

      jasmine.clock().tick(4999);
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
      jasmine.clock().tick(1);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
    });

    it('only waits for the most recent action', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'hover',
        delay: 5000,
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');

      ReactTestUtils.Simulate.mouseOver(launcher);
      jasmine.clock().tick(2000);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      ReactTestUtils.Simulate.mouseOut(launcher);

      jasmine.clock().tick(3000);

      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);

      jasmine.clock().tick(2000);

      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
    });

    it('does not delay an action if it happens repeatedly', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'click',
        delay: 5000,
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');

      ReactTestUtils.Simulate.click(launcher);
      jasmine.clock().tick(2000);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      ReactTestUtils.Simulate.click(launcher);

      jasmine.clock().tick(3000);

      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
    });
  });

  it('cleans up callbacks when unmounted', () => {
    const onEnteredSpy = jasmine.createSpy('on entered');
    subject = renderIntoDom({
      trigger: 'click',
      delay: 5000,
      overlay: tooltip,
      onEntered: onEnteredSpy
    });

    const launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
    ReactTestUtils.Simulate.click(launcher);

    jasmine.clock().tick(3000);
    ReactDOM.unmountComponentAtNode(root);
    jasmine.clock().tick(2000);

    expect(onEnteredSpy).not.toHaveBeenCalled();
  });

  describe('when no id is provided', () => {
    it('generates an id', () => {
      const tooltip1 = <Tooltip className="tooltip-unspecified-id" content="Hello World3"/>;
      const tooltip2 = <Tooltip className="tooltip-unspecified-id" content="Hello World4"/>;

      subject = ReactDOM.render(<OverlayTrigger display={true} overlay={tooltip2}>
        <OverlayTrigger display={true} overlay={tooltip1}>
          {launcher}
        </OverlayTrigger>
      </OverlayTrigger>, root);

      expect($('.tooltip-unspecified-id')[0].id).toBeTruthy();
      expect($('.tooltip-unspecified-id')[1].id).toBeTruthy();
      expect($('.tooltip-unspecified-id')[0].id).not.toEqual($('.tooltip-unspecified-id')[1].id);
    });
  });

  describe('when an id is provided', () => {
    beforeEach(() => {
      subject = renderIntoDom({
        display: true,
        overlay: <Tooltip className="specified-id" id="my-specified-id" content="Hello, world"/>
      });
    });

    it('uses provided id', () => {
      expect($('.specified-id')).toHaveAttr('id', 'my-specified-id');
    });

    it('uses aria-described-by', () => {
      const launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
      expect(launcher).toHaveAttr('aria-describedby', 'my-specified-id');
    });
  });

  describe('triggering', () => {
    let launcher;

    describe('on hover', () => {
      let onMouseOverSpy, onMouseOutSpy;
      beforeEach(() => {
        onMouseOverSpy = jasmine.createSpy('onMouseOver');
        onMouseOutSpy = jasmine.createSpy('onMouseOut');
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'hover'},
          createLauncher({onMouseOver: onMouseOverSpy, onMouseOut: onMouseOutSpy})
        );
        launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
        onMouseOverSpy.calls.reset();
        onMouseOutSpy.calls.reset();
      });

      it('triggers on hover', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);

        ReactTestUtils.Simulate.mouseOver(launcher);

        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();

        ReactTestUtils.Simulate.mouseOut(launcher);

        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      });

      it('calls the callbacks', () => {
        ReactTestUtils.Simulate.mouseOver(launcher);
        expect(onMouseOverSpy).toHaveBeenCalled();

        ReactTestUtils.Simulate.mouseOut(launcher);
        expect(onMouseOutSpy).toHaveBeenCalled();
      });
    });

    describe('isSticky', () => {
      beforeEach(() => {
        subject = renderIntoDom(
          {overlay: tooltip, trigger: 'hover', isSticky: true},
        );
      });
      it('does not hide overlay if it is hovered', () => {
        $('.launcher').simulate('mouseOver');
        expect('.tooltip-text').toExist();

        $('.launcher').simulate('mouseOut');

        jasmine.clock().tick(49);
        expect('.tooltip-text').toExist();

        $('.tooltip-text').simulate('mouseOver');
        jasmine.clock().tick(2);
        expect('.tooltip-text').toExist();

        $('.tooltip-text').simulate('mouseOut');
        jasmine.clock().tick(50);
        expect('.tooltip-text').not.toExist();
      });
    });


    describe('on click', () => {
      let onClickSpy;
      beforeEach(() => {
        onClickSpy = jasmine.createSpy('onClick');
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'click'},
          createLauncher({onClick: onClickSpy})
        );
        launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
        onClickSpy.calls.reset();
      });

      it('triggers on hover', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);

        ReactTestUtils.Simulate.click(launcher);

        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();

        ReactTestUtils.Simulate.click(launcher);

        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      });

      it('calls the callback', () => {
        ReactTestUtils.Simulate.click(launcher);
        expect(onClickSpy).toHaveBeenCalled();
      });
    });

    describe('on focus', () => {
      let onFocusSpy, onBlurSpy;
      beforeEach(() => {
        onFocusSpy = jasmine.createSpy('onFocus');
        onBlurSpy = jasmine.createSpy('onBlur');
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'focus'},
          createLauncher({onFocus: onFocusSpy, onBlur: onBlurSpy})
        );
        launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
        onFocusSpy.calls.reset();
        onBlurSpy.calls.reset();
      });

      it('triggers on focus', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);

        ReactTestUtils.Simulate.focus(launcher);

        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();

        ReactTestUtils.Simulate.blur(launcher);

        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      });

      it('calls the callbacks', () => {
        ReactTestUtils.Simulate.focus(launcher);
        expect(onFocusSpy).toHaveBeenCalled();

        ReactTestUtils.Simulate.blur(launcher);
        expect(onBlurSpy).toHaveBeenCalled();
      });
    });
  });

  describe('disableScrim', () => {
    let launcher;
    describe('with disableScrim true', () => {
      it('does not close on a click on body', () => {
        subject = renderComponent({
          trigger: 'click',
          disableScrim: true,
          overlay: tooltip
        });
        launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');

        ReactTestUtils.Simulate.click(launcher);

        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        document.documentElement.dispatchEvent(evt);

        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
      });
    });

    describe('with disableScrim false', () => {
      beforeEach(() => {
        subject = renderComponent({
          trigger: 'click',
          disableScrim: false,
          overlay: tooltip
        });
        launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
      });

      it('allows clicking on the trigger to still work', () => {
        ReactTestUtils.Simulate.click(launcher);
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
      });

      it('closes the tooltip when clicking on the body', () => {
        ReactTestUtils.Simulate.click(launcher);

        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        document.documentElement.dispatchEvent(evt);

        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      });

      it('does not close when clicking on the launcher', () => {
        $('.launcher').simulate('click');

        expect('.tether-enabled').toExist();
      });
    });
  });

  describe('theme', () => {
    it('adds an appropriate class if theme === light', () => {
      subject = renderIntoDom({theme: 'light', overlay: tooltip, display: true});
      expect($('.pui-tooltip-light .tooltip-text')).toExist();
    });

    it('does not add a class if theme =/= light', () => {
      subject = renderIntoDom({theme: 'dark', overlay: tooltip, display: true});
      expect($('.pui-tooltip-light')).not.toExist();
    });
  });
});