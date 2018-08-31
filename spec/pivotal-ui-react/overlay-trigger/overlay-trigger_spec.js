import {Tooltip} from '../../../src/react/tooltip';
import {OverlayTrigger} from '../../../src/react/overlay-trigger';

describe('OverlayTrigger', () => {
  let subject;
  const launcher = <span className="launcher">Manually Ask For Tooltip</span>;
  const tooltip = <Tooltip className="tooltip-text" content="Hello World"/>;
  const renderComponent = props => subject = shallow(<OverlayTrigger {...props}>{launcher}</OverlayTrigger>);
  const createLauncher = props => <span className="launcher" {...props}>Manually Ask For Tooltip</span>;
  const renderComponentWithCustomLauncher = (props, customLauncher) => subject = shallow(<OverlayTrigger {...props}>{customLauncher}</OverlayTrigger>);

  const renderIntoDom = props => subject = shallow(<OverlayTrigger {...props}>{launcher}</OverlayTrigger>);

  it('renders the launcher', () => {
    subject = renderComponent({overlay: tooltip});
    expect(subject.find(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).text()).toBe('Manually Ask For Tooltip');
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
      expect(subject.find(subject.find('.tooltip-text')).exists()).toBeTruthy();
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
    });
  });

  describe('with the tooltip closed', () => {
    it('hides the tooltip', () => {
      subject = renderIntoDom({overlay: tooltip});
      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
      expect(subject.find(subject.find('.tooltip-text')).exists()).toBeFalsy();
    });
  });

  it('positions according to placement if pin is false, defaulting to right-side placement', () => {
    subject = renderComponent({overlay: tooltip, display: true, pin: false});
    expect(
      subject.find(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).hasClass('tooltip-right')
    ).toBeTruthy();

    subject = renderComponent({placement: 'left', overlay: tooltip, display: true, pin: false});
    expect(
      subject.find(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).hasClass('tooltip-left')
    ).toBeTruthy();

    subject = renderComponent({placement: 'left', overlay: tooltip, display: true, pin: false});
    expect(
      subject.find(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).hasClass('tooltip-left')
    ).toBeTruthy();

    subject = renderComponent({placement: 'top', overlay: tooltip, display: true, pin: false});
    expect(
      subject.find(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).hasClass('tooltip-top')
    ).toBeTruthy();

    subject = renderComponent({placement: 'bottom', overlay: tooltip, display: true, pin: false});
    expect(
      subject.find(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).hasClass('tooltip-bottom')
    ).toBeTruthy();

    subject = renderComponent({placement: 'right', overlay: tooltip, display: true, pin: false});
    expect(
      subject.find(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher')).hasClass('tooltip-right')
    ).toBeTruthy();
  });

  describe('callbacks', () => {
    let onEnteredSpy, onExitedSpy, launcher;

    beforeEach(() => {
      onEnteredSpy = jest.fn().mockName('onEntered');
      onExitedSpy = jest.fn().mockName('onExited');

      subject = renderComponent({
        overlay: tooltip,
        onEntered: onEnteredSpy,
        onExited: onExitedSpy,
        trigger: 'click'
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');

      onEnteredSpy.mockReset();
      onExitedSpy.mockReset();
    });

    it('calls onEntered upon tooltip display', () => {
      expect(onEnteredSpy).not.toHaveBeenCalled();
      ReactTestUtils.Simulate.simulate('click');

      expect(onEnteredSpy).toHaveBeenCalled();
    });

    it('calls onExited upon tooltip display', () => {
      expect(onExitedSpy).not.toHaveBeenCalled();
      ReactTestUtils.Simulate.simulate('click');
      ReactTestUtils.Simulate.simulate('click');
      expect(onExitedSpy).toHaveBeenCalled();
    });

    it('does not call the callbacks when not changing', () => {
      ReactTestUtils.Simulate.simulate('click');
      onEnteredSpy.mockReset();

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
      ReactTestUtils.Simulate.simulate('click');

      jasmine.clock().tick(4999);
      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
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
      ReactTestUtils.Simulate.simulate('click');

      jasmine.clock().tick(4999);
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
      jasmine.clock().tick(1);
      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
    });

    it('respects "delay"', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'click',
        delay: 5000,
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
      ReactTestUtils.Simulate.simulate('click');

      jasmine.clock().tick(4999);
      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
      jasmine.clock().tick(1);
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();

      ReactTestUtils.Simulate.simulate('click');

      jasmine.clock().tick(4999);
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
      jasmine.clock().tick(1);
      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
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
      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
      ReactTestUtils.Simulate.mouseOut(launcher);

      jasmine.clock().tick(3000);

      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);

      jasmine.clock().tick(2000);

      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
    });

    it('does not delay an action if it happens repeatedly', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'click',
        delay: 5000,
      });

      launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');

      ReactTestUtils.Simulate.simulate('click');
      jasmine.clock().tick(2000);
      expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
      ReactTestUtils.Simulate.simulate('click');

      jasmine.clock().tick(3000);

      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
    });
  });

  it('cleans up callbacks when unmounted', () => {
    const onEnteredSpy = jest.fn().mockName('on entered');
    subject = renderIntoDom({
      trigger: 'click',
      delay: 5000,
      overlay: tooltip,
      onEntered: onEnteredSpy
    });

    const launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
    ReactTestUtils.Simulate.simulate('click');

    jasmine.clock().tick(3000);
    // // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove? // TODO: remove?
    jasmine.clock().tick(2000);

    expect(onEnteredSpy).not.toHaveBeenCalled();
  });

  describe('when no id is provided', () => {
    it('generates an id', () => {
      const tooltip1 = <Tooltip className="tooltip-unspecified-id" content="Hello World3"/>;
      const tooltip2 = <Tooltip className="tooltip-unspecified-id" content="Hello World4"/>;

      subject = shallow(<OverlayTrigger display={true} overlay={tooltip2}>
        <OverlayTrigger display={true} overlay={tooltip1}>
          {launcher}
        </OverlayTrigger>
      </OverlayTrigger>);

      expect(subject.find('.tooltip-unspecified-id')[0].id).toBeTruthy();
      expect(subject.find('.tooltip-unspecified-id')[1].id).toBeTruthy();
      expect(subject.find('.tooltip-unspecified-id')[0].id).not.toEqual(subject.find('.tooltip-unspecified-id')[1].id);
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
      expect(subject.find(subject.find('.specified-id')).prop('id')).toBe('my-specified-id');
    });

    it('uses aria-described-by', () => {
      const launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
      expect(subject.find(launcher).prop('aria-describedby')).toBe('my-specified-id');
    });
  });

  describe('triggering', () => {
    let launcher;

    describe('on hover', () => {
      let onMouseOverSpy, onMouseOutSpy;
      beforeEach(() => {
        onMouseOverSpy = jest.fn().mockName('onMouseOver');
        onMouseOutSpy = jest.fn().mockName('onMouseOut');
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'hover'},
          createLauncher({onMouseOver: onMouseOverSpy, onMouseOut: onMouseOutSpy})
        );
        launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
        onMouseOverSpy.mockReset();
        onMouseOutSpy.mockReset();
      });

      it('triggers on hover', () => {
        expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);

        ReactTestUtils.Simulate.mouseOver(launcher);

        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();

        ReactTestUtils.Simulate.mouseOut(launcher);

        expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
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
        subject.find('.launcher').simulate('mouseOver');
        expect(subject.find('.tooltip-text').exists()).toBeTruthy();

        subject.find('.launcher').simulate('mouseOut');

        jasmine.clock().tick(49);
        expect(subject.find('.tooltip-text').exists()).toBeTruthy();

        subject.find('.tooltip-text').simulate('mouseOver');
        jasmine.clock().tick(2);
        expect(subject.find('.tooltip-text').exists()).toBeTruthy();

        subject.find('.tooltip-text').simulate('mouseOut');
        jasmine.clock().tick(50);
        expect(subject.find('.tooltip-text').exists()).toBeFalsy();
      });
    });


    describe('on click', () => {
      let onClickSpy;
      beforeEach(() => {
        onClickSpy = jest.fn().mockName('onClick');
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'click'},
          createLauncher({onClick: onClickSpy})
        );
        launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
        onClickSpy.mockReset();
      });

      it('triggers on hover', () => {
        expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);

        ReactTestUtils.Simulate.simulate('click');

        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();

        ReactTestUtils.Simulate.simulate('click');

        expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
      });

      it('calls the callback', () => {
        ReactTestUtils.Simulate.simulate('click');
        expect(onClickSpy).toHaveBeenCalled();
      });
    });

    describe('on focus', () => {
      let onFocusSpy, onBlurSpy;
      beforeEach(() => {
        onFocusSpy = jest.fn().mockName('onFocus');
        onBlurSpy = jest.fn().mockName('onBlur');
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'focus'},
          createLauncher({onFocus: onFocusSpy, onBlur: onBlurSpy})
        );
        launcher = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'launcher');
        onFocusSpy.mockReset();
        onBlurSpy.mockReset();
      });

      it('triggers on focus', () => {
        expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);

        ReactTestUtils.Simulate.focus(launcher);

        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();

        ReactTestUtils.Simulate.blur(launcher);

        expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
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

        ReactTestUtils.Simulate.simulate('click');

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
        ReactTestUtils.Simulate.simulate('click');
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tether-enabled')).toBeDefined();
      });

      it('closes the tooltip when clicking on the body', () => {
        ReactTestUtils.Simulate.simulate('click');

        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        document.documentElement.dispatchEvent(evt);

        expect(subject.find(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled'))).toHaveLength(0);
      });

      it('does not close when clicking on the launcher', () => {
        subject.find('.launcher').simulate('click');

        expect(subject.find('.tether-enabled').exists()).toBeTruthy();
      });
    });
  });

  describe('theme', () => {
    it('adds an appropriate class if theme === light', () => {
      subject = renderIntoDom({theme: 'light', overlay: tooltip, display: true});
      expect(subject.find(subject.find('.tooltip-light .tooltip-text')).exists()).toBeTruthy();
    });

    it('does not add a class if theme =/= light', () => {
      subject = renderIntoDom({theme: 'dark', overlay: tooltip, display: true});
      expect(subject.find(subject.find('.tooltip-light')).exists()).toBeFalsy();
    });
  });
});