import {Tooltip} from '../../../src/react/tooltip';
import {OverlayTrigger} from '../../../src/react/overlay-trigger';

describe('OverlayTrigger', () => {
  let subject;
  const launcher = <span className="launcher">Manually Ask For Tooltip</span>;
  const tooltip = <Tooltip className="tooltip-text" content="Hello World"/>;
  const renderComponent = props => subject = shallow(
    <OverlayTrigger {...props}>{launcher}</OverlayTrigger>);
  const createLauncher = props => <span className="launcher" {...props}>Manually Ask For Tooltip</span>;
  const renderComponentWithCustomLauncher = (props, customLauncher) => subject = shallow(
    <OverlayTrigger {...props}>{customLauncher}</OverlayTrigger>);

  const renderIntoDom = props => subject = shallow(<OverlayTrigger {...props}>{launcher}</OverlayTrigger>);

  it('renders the launcher', () => {
    subject = renderComponent({overlay: tooltip});
    expect(subject.find('launcher').text()).toBe('Manually Ask For Tooltip');
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
      expect($('.tooltip-text').exists()).toBeTruthy();
      expect(subject.find('tether-enabled')).toBeDefined();
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
    expect(subject.find('launcher').hasClass('tooltip-right')).toBeTruthy();

    subject = renderComponent({placement: 'left', overlay: tooltip, display: true, pin: false});
    expect(subject.find('launcher').hasClass('tooltip-left')).toBeTruthy();

    subject = renderComponent({placement: 'left', overlay: tooltip, display: true, pin: false});
    expect(subject.find('launcher').hasClass('tooltip-left')).toBeTruthy();

    subject = renderComponent({placement: 'top', overlay: tooltip, display: true, pin: false});
    expect(subject.find('launcher').hasClass('tooltip-top')).toBeTruthy();

    subject = renderComponent({placement: 'bottom', overlay: tooltip, display: true, pin: false});
    expect(subject.find('launcher').hasClass('tooltip-bottom')).toBeTruthy();

    subject = renderComponent({placement: 'right', overlay: tooltip, display: true, pin: false});
    expect(subject.find('launcher').hasClass('tooltip-right')).toBeTruthy();
  });

  describe('callbacks', () => {
    let onEnteredSpy, onExitedSpy, launcher;

    beforeEach(() => {
      onEnteredSpy = jest.fn();
      onExitedSpy = jest.fn();

      subject = renderComponent({
        overlay: tooltip,
        onEntered: onEnteredSpy,
        onExited: onExitedSpy,
        trigger: 'click'
      });

      launcher = subject.find('launcher');

      onEnteredSpy.calls.reset();
      onExitedSpy.calls.reset();
    });

    it('calls onEntered upon tooltip display', () => {
      expect(onEnteredSpy).not.toHaveBeenCalled();
      launcher.simulate('click');

      expect(onEnteredSpy).toHaveBeenCalled();
    });

    it('calls onExited upon tooltip display', () => {
      expect(onExitedSpy).not.toHaveBeenCalled();
      launcher.simulate('click');
      launcher.simulate('click');
      expect(onExitedSpy).toHaveBeenCalled();
    });

    it('does not call the callbacks when not changing', () => {
      launcher.simulate('click');
      onEnteredSpy.calls.reset();

      launcher.simulate('focus');
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

      launcher = subject.find('launcher');
      launcher.simulate('click');

      jasmine.clock().tick(4999);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      jasmine.clock().tick(1);
      expect(subject.find('tether-enabled')).toBeDefined();
    });

    it('respects "delayHide"', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'click',
        delayHide: 5000,
        display: true
      });

      launcher = subject.find('launcher');
      launcher.simulate('click');

      jasmine.clock().tick(4999);
      expect(subject.find('tether-enabled')).toBeDefined();
      jasmine.clock().tick(1);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
    });

    it('respects "delay"', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'click',
        delay: 5000,
      });

      launcher = subject.find('launcher');
      launcher.simulate('click');

      jasmine.clock().tick(4999);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      jasmine.clock().tick(1);
      expect(subject.find('tether-enabled')).toBeDefined();

      launcher.simulate('click');

      jasmine.clock().tick(4999);
      expect(subject.find('tether-enabled')).toBeDefined();
      jasmine.clock().tick(1);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
    });

    it('only waits for the most recent action', () => {
      subject = renderComponent({
        overlay: tooltip,
        trigger: 'hover',
        delay: 5000,
      });

      launcher = subject.find('launcher');

      launcher.simulate('mouseOver');
      jasmine.clock().tick(2000);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      launcher.simulate('mouseOut');

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

      launcher = subject.find('launcher');

      launcher.simulate('click');
      jasmine.clock().tick(2000);
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      launcher.simulate('click');

      jasmine.clock().tick(3000);

      expect(subject.find('tether-enabled')).toBeDefined();
    });
  });

  it('cleans up callbacks when unmounted', () => {
    const onEnteredSpy = jest.fn();
    subject = renderIntoDom({
      trigger: 'click',
      delay: 5000,
      overlay: tooltip,
      onEntered: onEnteredSpy
    });

    const launcher = subject.find('launcher');
    launcher.simulate('click');

    jasmine.clock().tick(3000);
    ReactDOM.unmountComponentAtNode(root);
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

      expect($('.tooltip-unspecified-id')[0].id.exists()).toBeTruthy();
      expect($('.tooltip-unspecified-id')[1].id.exists()).toBeTruthy();
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
      const launcher = subject.find('launcher');
      expect(subject.find(launcher).prop('aria-describedby')).toBe('my-specified-id');
    });
  });

  describe('triggering', () => {
    let launcher;

    describe('on hover', () => {
      let onMouseOverSpy, onMouseOutSpy;
      beforeEach(() => {
        onMouseOverSpy = jest.fn();
        onMouseOutSpy = jest.fn();
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'hover'},
          createLauncher({onMouseOver: onMouseOverSpy, onMouseOut: onMouseOutSpy})
        );
        launcher = subject.find('launcher');
        onMouseOverSpy.calls.reset();
        onMouseOutSpy.calls.reset();
      });

      it('triggers on hover', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);

        launcher.simulate('mouseOver');

        expect(subject.find('tether-enabled')).toBeDefined();

        launcher.simulate('mouseOut');

        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      });

      it('calls the callbacks', () => {
        launcher.simulate('mouseOver');
        expect(onMouseOverSpy).toHaveBeenCalled();

        launcher.simulate('mouseOut');
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
        expect(subject.find('.tooltip-text').exists()).toBeTruthy();

        $('.launcher').simulate('mouseOut');

        jasmine.clock().tick(49);
        expect(subject.find('.tooltip-text').exists()).toBeTruthy();

        $('.tooltip-text').simulate('mouseOver');
        jasmine.clock().tick(2);
        expect(subject.find('.tooltip-text').exists()).toBeTruthy();

        $('.tooltip-text').simulate('mouseOut');
        jasmine.clock().tick(50);
        expect(subject.find('.tooltip-text').exists()).toBeFalsy();
      });
    });


    describe('on click', () => {
      let onClickSpy;
      beforeEach(() => {
        onClickSpy = jest.fn();
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'click'},
          createLauncher({onClick: onClickSpy})
        );
        launcher = subject.find('launcher');
        onClickSpy.calls.reset();
      });

      it('triggers on hover', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);

        launcher.simulate('click');

        expect(subject.find('tether-enabled')).toBeDefined();

        launcher.simulate('click');

        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      });

      it('calls the callback', () => {
        launcher.simulate('click');
        expect(onClickSpy).toHaveBeenCalled();
      });
    });

    describe('on focus', () => {
      let onFocusSpy, onBlurSpy;
      beforeEach(() => {
        onFocusSpy = jest.fn();
        onBlurSpy = jest.fn();
        subject = renderComponentWithCustomLauncher(
          {overlay: tooltip, trigger: 'focus'},
          createLauncher({onFocus: onFocusSpy, onBlur: onBlurSpy})
        );
        launcher = subject.find('launcher');
        onFocusSpy.calls.reset();
        onBlurSpy.calls.reset();
      });

      it('triggers on focus', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);

        launcher.simulate('focus');

        expect(subject.find('tether-enabled')).toBeDefined();

        launcher.simulate('blur');

        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      });

      it('calls the callbacks', () => {
        launcher.simulate('focus');
        expect(onFocusSpy).toHaveBeenCalled();

        launcher.simulate('blur');
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
        launcher = subject.find('launcher');

        launcher.simulate('click');

        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        document.documentElement.dispatchEvent(evt);

        expect(subject.find('tether-enabled')).toBeDefined();
      });
    });

    describe('with disableScrim false', () => {
      beforeEach(() => {
        subject = renderComponent({
          trigger: 'click',
          disableScrim: false,
          overlay: tooltip
        });
        launcher = subject.find('launcher');
      });

      it('allows clicking on the trigger to still work', () => {
        launcher.simulate('click');
        expect(subject.find('tether-enabled')).toBeDefined();
      });

      it('closes the tooltip when clicking on the body', () => {
        launcher.simulate('click');

        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        document.documentElement.dispatchEvent(evt);

        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'tether-enabled')).toHaveLength(0);
      });

      it('does not close when clicking on the launcher', () => {
        $('.launcher').simulate('click');

        expect(subject.find('.tether-enabled').exists()).toBeTruthy();
      });
    });
  });

  describe('theme', () => {
    it('adds an appropriate class if theme === light', () => {
      subject = renderIntoDom({theme: 'light', overlay: tooltip, display: true});
      expect($('.tooltip-light .tooltip-text').exists()).toBeTruthy();
    });

    it('does not add a class if theme =/= light', () => {
      subject = renderIntoDom({theme: 'dark', overlay: tooltip, display: true});
      expect($('.tooltip-light')).not.toExist();
    });
  });
});