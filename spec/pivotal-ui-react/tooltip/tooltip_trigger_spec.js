import '../spec_helper';

import {TooltipTrigger} from '../../../src/react/tooltip';

describe('TooltipTrigger Component', () => {
  let subject;
  const renderComponent = (props, triggerContent) => subject = shallow(<TooltipTrigger {...props}>
    <div className="trigger">{triggerContent || 'Some default message'}</div>
  </TooltipTrigger>);

  it('renders', () => {
    renderComponent({tooltip: 'Some default tooltip'});
    expect(subject.find('.tooltip').exists()).toBeTruthy();
  });

  it('renders with content', () => {
    renderComponent({tooltip: 'Some default tooltip'});
    expect(subject.find('.trigger').text()).toBe('Some default message');
  });

  it('renders with the tooltip text', () => {
    renderComponent({tooltip: 'Some default tooltip'});
    expect(subject.find('.tooltip-content').text()).toBe('Some default tooltip');
  });

  it('renders node content for the trigger', () => {
    renderComponent({tooltip: 'Some tooltip content'}, <div className="inner-content">Hello World</div>);
    expect(subject.find('.trigger > .inner-content').text()).toBe('Hello World');
  });

  it('renders node content for the tooltip', () => {
    renderComponent({tooltip: <a href="#">Click me</a>});
    expect(subject.find('.tooltip a').exists()).toBeTruthy();
  });

  it('propagates classname, id, style to the wrapping tooltip', () => {
    renderComponent({
      tooltip: 'Some tooltip content',
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'rgb(255, 0, 0)'}
    });

    expect(subject.find('.tooltip').hasClass('some-classname')).toBeTruthy();
    expect(subject.find('.tooltip').prop('id')).toBe('some-id');
    expect(subject.find('.tooltip').prop('style')).toEqual({color: 'rgb(255, 0, 0)'});
  });

  it('calls onEntered when tooltip is made visible', () => {
    const onEntered = jest.fn().mockName('onEntered');
    renderComponent({onEntered, tooltip: 'Some tooltip content'});

    subject.find('.tooltip').simulate('mouseEnter');
    jasmine.clock().tick(1);

    expect(onEntered).toHaveBeenCalledWith();
  });

  it('calls onExited when tooltip is made hidden', () => {
    const onExited = jest.fn().mockName('onExited');
    renderComponent({onExited, tooltip: 'Some tooltip content'});

    subject.find('.tooltip').simulate('mouseEnter');
    jasmine.clock().tick(1);
    subject.find('.tooltip').simulate('mouseLeave');
    jasmine.clock().tick(1);

    expect(onExited).toHaveBeenCalledWith();
  });

  describe('color', () => {
    it('renders dark version by default', () => {
      renderComponent({tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip').exists()).toBeTruthy();
    });

    it('allows user to specify color as "dark" (the default) but it doesnt do anything', () => {
      renderComponent({theme: 'dark', tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip').exists()).toBeTruthy();
    });

    it('allows user to change color to light', () => {
      renderComponent({theme: 'light', tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip').hasClass('tooltip-light')).toBeTruthy();
    });
  });

  describe('placement', () => {
    it('defaults to nothing, which is "top" in css', () => {
      renderComponent({tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip').exists()).toBeTruthy();
    });

    it('allows user to specify left, right, top, bottom', () => {
      renderComponent({placement: 'left', tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip-left').exists()).toBeTruthy();

      renderComponent({placement: 'right', tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip-right').exists()).toBeTruthy();

      renderComponent({placement: 'bottom', tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip-bottom').exists()).toBeTruthy();

      renderComponent({placement: 'top', tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip').exists()).toBeTruthy();
    });
  });

  describe('trigger is default (hover)', () => {
    it('defaults to hover', () => {
      renderComponent({tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();

      subject.find('.tooltip').simulate('mouseEnter');
      jasmine.clock().tick(1);
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-visible')).toBeTruthy();

      subject.find('.tooltip').simulate('mouseLeave');
      jasmine.clock().tick(1);
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();
    });

    it('allows the user to customize the click handler when trigger is hover', () => {
      const onClick = jest.fn().mockName('onClick');
      renderComponent({tooltip: 'Some tooltip content', onClick});

      subject.find('.tooltip').simulate('click');
      jasmine.clock().tick(1);
      expect(onClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('does not take the display prop into account', () => {
      renderComponent({tooltip: 'Some tooltip content', display: true});
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();
    });

    describe('when the display prop changes', () => {
      beforeEach(() => {
        renderComponent({tooltip: 'Some tooltip content'});
        renderComponent({tooltip: 'Some tooltip content', display: true});
      });

      it('takes the display prop into account', () => {
        expect(subject.find('.tooltip-container').hasClass('tooltip-container-visible')).toBeTruthy();
      });
    });
  });

  describe('trigger is click', () => {
    it('allows user to trigger by click', () => {
      renderComponent({trigger: 'click', tooltip: 'Some tooltip content'});

      expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();

      subject.find('.tooltip').simulate('click');
      jasmine.clock().tick(1);
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-visible')).toBeTruthy();
    });

    it('allows the user to customize the click handler when trigger is click', () => {
      const onClick = jest.fn().mockName('onClick');
      spyOn(TooltipTrigger.prototype, 'clickHandler').and.callThrough();
      renderComponent({trigger: 'click', tooltip: 'Some tooltip content', onClick});

      subject.find('.tooltip').simulate('click');
      jasmine.clock().tick(1);
      expect(TooltipTrigger.prototype.clickHandler).toHaveBeenCalledWith(expect.any(Object), onClick);
      expect(onClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('hides the tooltip some time after clicking', () => {
      renderComponent({trigger: 'click', tooltip: 'Some tooltip content'});

      subject.find('.tooltip').simulate('click');
      jasmine.clock().tick(1);
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-visible')).toBeTruthy();
      jasmine.clock().tick(6000);
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();
    });

    it('does not take the display prop into account', () => {
      renderComponent({trigger: 'click', tooltip: 'Some tooltip content', display: true});
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();
    });

    describe('when the display prop changes', () => {
      beforeEach(() => {
        renderComponent({trigger: 'click', tooltip: 'Some tooltip content'});
        renderComponent({trigger: 'click', tooltip: 'Some tooltip content', display: true});
      });

      it('takes the display prop into account', () => {
        expect(subject.find('.tooltip-container').hasClass('tooltip-container-visible')).toBeTruthy();
      });
    });
  });

  describe('trigger is manual', () => {
    const trigger = 'manual';
    const tooltip = 'Some tooltip content';

    it('hides the tooltip when display is false', () => {
      renderComponent({trigger, tooltip, display: false});
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();
    });

    it('shows the tooltip when display is true', () => {
      renderComponent({trigger, tooltip, display: true});
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-visible')).toBeTruthy();
    });

    describe('when the trigger prop changes', () => {
      const nextTrigger = 'hover';

      beforeEach(() => {
        renderComponent({trigger, tooltip, display: true});
        renderComponent({trigger: nextTrigger, tooltip, display: true});
      });

      it('takes the trigger prop into account', () => {
        expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();
      });
    });
  });

  describe('isSticky', () => {
    it('renders the tooltip with the "isSticky" prop', () => {
      renderComponent({isSticky: true, tooltip: 'Some tooltip content'});
      expect(subject.find('.tooltip-container').hasClass('tooltip-hoverable')).toBeTruthy();
    });
  });
});
