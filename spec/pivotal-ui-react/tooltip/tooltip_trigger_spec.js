import '../spec_helper';

import {TooltipTrigger} from '../../../src/react/tooltip';

describe('TooltipTrigger Component', () => {
  const renderComponent = (props, triggerContent) => ReactDOM.render(
    <TooltipTrigger {...props}>
      <div className="trigger">{triggerContent || 'Some default message'}</div>
    </TooltipTrigger>, root);

  it('renders', () => {
    renderComponent({tooltip: 'Some default tooltip'});
    expect('.pui-tooltip').toExist();
  });

  it('renders with content', () => {
    renderComponent({tooltip: 'Some default tooltip'});
    expect('.trigger').toHaveText('Some default message');
  });

  it('renders with the tooltip text', () => {
    renderComponent({tooltip: 'Some default tooltip'});
    expect('.pui-tooltip-content').toHaveText('Some default tooltip');
  });

  it('renders node content for the trigger', () => {
    renderComponent({tooltip: 'Some tooltip content'}, <div className="inner-content">Hello World</div>);
    expect('.trigger > .inner-content').toHaveText('Hello World');
  });

  it('renders node content for the tooltip', () => {
    renderComponent({tooltip: <a href="#">Click me</a>});
    expect('.pui-tooltip a').toExist();
  });

  it('propagates classname, id, style to the wrapping tooltip', () => {
    renderComponent({
      tooltip: 'Some tooltip content',
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'rgb(255, 0, 0)'}
    });

    expect('.pui-tooltip').toHaveClass('some-classname');
    expect('.pui-tooltip').toHaveAttr('id', 'some-id');
    expect('.pui-tooltip').toHaveCss({color: 'rgb(255, 0, 0)'});
  });

  it('calls onEntered when tooltip is made visible', () => {
    const onEntered = jasmine.createSpy('onEntered');
    renderComponent({onEntered, tooltip: 'Some tooltip content'});

    $('.pui-tooltip').simulate('mouseEnter');
    jasmine.clock().tick(1);

    expect(onEntered).toHaveBeenCalledWith();
  });

  it('calls onExited when tooltip is made hidden', () => {
    const onExited = jasmine.createSpy('onExited');
    renderComponent({onExited, tooltip: 'Some tooltip content'});

    $('.pui-tooltip').simulate('mouseEnter');
    jasmine.clock().tick(1);
    $('.pui-tooltip').simulate('mouseLeave');
    jasmine.clock().tick(1);

    expect(onExited).toHaveBeenCalledWith();
  });

  describe('color', () => {
    it('renders dark version by default', () => {
      renderComponent({tooltip: 'Some tooltip content'});
      expect('.pui-tooltip').toExist();
    });

    it('allows user to specify color as "dark" (the default) but it doesnt do anything', () => {
      renderComponent({theme: 'dark', tooltip: 'Some tooltip content'});
      expect('.pui-tooltip').toExist();
    });

    it('allows user to change color to light', () => {
      renderComponent({theme: 'light', tooltip: 'Some tooltip content'});
      expect('.pui-tooltip').toHaveClass('pui-tooltip-light');
    });
  });

  describe('placement', () => {
    it('defaults to nothing, which is "top" in css', () => {
      renderComponent({tooltip: 'Some tooltip content'});
      expect('.pui-tooltip').toExist();
    });

    it('allows user to specify left, right, top, bottom', () => {
      renderComponent({placement: 'left', tooltip: 'Some tooltip content'});
      expect('.pui-tooltip-left').toExist();

      renderComponent({placement: 'right', tooltip: 'Some tooltip content'});
      expect('.pui-tooltip-right').toExist();

      renderComponent({placement: 'bottom', tooltip: 'Some tooltip content'});
      expect('.pui-tooltip-bottom').toExist();

      renderComponent({placement: 'top', tooltip: 'Some tooltip content'});
      expect('.pui-tooltip').toExist();
    });
  });

  describe('trigger is default (hover)', () => {
    it('defaults to hover', () => {
      renderComponent({tooltip: 'Some tooltip content'});
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-hidden');

      $('.pui-tooltip').simulate('mouseEnter');
      jasmine.clock().tick(1);
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-visible');

      $('.pui-tooltip').simulate('mouseLeave');
      jasmine.clock().tick(1);
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-hidden');
    });

    it('allows the user to customize the click handler when trigger is hover', () => {
      const onClick = jasmine.createSpy('onClick');
      renderComponent({tooltip: 'Some tooltip content', onClick});

      $('.pui-tooltip').simulate('click');
      jasmine.clock().tick(1);
      expect(onClick).toHaveBeenCalledWith(jasmine.any(Object));
    });

    it('does not take the display prop into account', () => {
      renderComponent({tooltip: 'Some tooltip content', display: true});
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-hidden');
    });

    describe('when the display prop changes', () => {
      beforeEach(() => {
        renderComponent({tooltip: 'Some tooltip content'});
        renderComponent({tooltip: 'Some tooltip content', display: true});
      });

      it('takes the display prop into account', () => {
        expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-visible');
      });
    });
  });

  describe('trigger is click', () => {
    it('allows user to trigger by click', () => {
      renderComponent({trigger: 'click', tooltip: 'Some tooltip content'});

      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-hidden');

      $('.pui-tooltip').simulate('click');
      jasmine.clock().tick(1);
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-visible');
    });

    it('allows the user to customize the click handler when trigger is click', () => {
      const onClick = jasmine.createSpy('onClick');
      spyOn(TooltipTrigger.prototype, 'clickHandler').and.callThrough();
      renderComponent({trigger: 'click', tooltip: 'Some tooltip content', onClick});

      $('.pui-tooltip').simulate('click');
      jasmine.clock().tick(1);
      expect(TooltipTrigger.prototype.clickHandler).toHaveBeenCalledWith(jasmine.any(Object), onClick);
      expect(onClick).toHaveBeenCalledWith(jasmine.any(Object));
    });

    it('hides the tooltip some time after clicking', () => {
      renderComponent({trigger: 'click', tooltip: 'Some tooltip content'});

      $('.pui-tooltip').simulate('click');
      jasmine.clock().tick(1);
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-visible');
      jasmine.clock().tick(6000);
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-hidden');
    });

    it('does not take the display prop into account', () => {
      renderComponent({trigger: 'click', tooltip: 'Some tooltip content', display: true});
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-hidden');
    });

    describe('when the display prop changes', () => {
      beforeEach(() => {
        renderComponent({trigger: 'click', tooltip: 'Some tooltip content'});
        renderComponent({trigger: 'click', tooltip: 'Some tooltip content', display: true});
      });

      it('takes the display prop into account', () => {
        expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-visible');
      });
    });
  });

  describe('trigger is manual', () => {
    const trigger = 'manual';
    const tooltip = 'Some tooltip content';

    it('hides the tooltip when display is false', () => {
      renderComponent({trigger, tooltip, display: false});
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-hidden');
    });

    it('shows the tooltip when display is true', () => {
      renderComponent({trigger, tooltip, display: true});
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-visible');
    });

    describe('when the trigger prop changes', () => {
      const nextTrigger = 'hover';

      beforeEach(() => {
        renderComponent({trigger, tooltip, display: true});
        renderComponent({trigger: nextTrigger, tooltip, display: true});
      });

      it('takes the trigger prop into account', () => {
        expect('.pui-tooltip-container').toHaveClass('pui-tooltip-container-hidden');
      });
    });
  });

  describe('isSticky', () => {
    it('renders the tooltip with the "isSticky" prop', () => {
      renderComponent({isSticky: true, tooltip: 'Some tooltip content'});
      expect('.pui-tooltip-container').toHaveClass('pui-tooltip-hoverable');
    });
  });
});
