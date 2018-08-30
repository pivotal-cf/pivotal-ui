import '../spec_helper';
import {Flyout} from '../../../src/react/flyout';
import {Icon} from '../../../src/react/iconography';
import {Dialog} from '../../../src/react/dialog';

describe('Flyout', () => {
  let onHide, children, header, subject;

  beforeEach(() => {
    onHide = jest.fn().mockName('onHide');
    children = (<div>some-flyout-body</div>);
    header = (<div>some-flyout-header</div>);
    subject = shallow(<Flyout {...{
      animationDuration: 0,
      animationEasing: 'linear',
      children,
      dialogClassName: 'some-dialog-class',
      header,
      iconSrc: 'chevron_left',
      onHide,
      show: true,
      width: '100px'
    }}/>);
  });

  it('renders a Dialog', () => {
    expect(subject.find(Dialog).props()).toEqual({
      show: true,
      onHide,
      animationDuration: 0,
      animationEasing: 'linear',
      className: 'pui-flyout-dialog-backdrop',
      dialogClassName: 'some-dialog-class pui-flyout-dialog',
      children: expect.any(Object),
      hideOnBackdropClick: false,
      hideOnEscKeyDown: false,
      width: '100px',
      updateParentZIndex: true
    });
  });

  it('renders an icon button', () => {
    expect(subject.find('.pui-dialog .pui-flyout-icon-btn').hasClass('pui-btn-default-flat')).toBeTruthy();
    expect(subject.find('.pui-dialog .pui-flyout-icon-btn').hasClass('pui-btn-icon')).toBeTruthy();
    expect(subject.find('.pui-dialog .pui-flyout-icon-btn').prop('aria-label')).toBe('Close');
    expect(subject.find(Icon).props()).toEqual({
      src: 'chevron_left',
      size: 'inherit',
      style: {},
      verticalAlign: 'middle'
    });
  });

  it('renders the children', () => {
    expect(subject.find('.pui-flyout-dialog .pui-flyout-body').text()).toBe('some-flyout-body');
  });

  describe('bodyClassName', () => {
    beforeEach(() => {
      subject.setProps({bodyClassName: 'some-class-name'});
    });

    it('sets the given className on the body', () => {
      expect(subject.find('.pui-flyout-body').hasClass('some-class-name')).toBeTruthy();
    });
  });

  describe('buttonAriaLabel', () => {
    beforeEach(() => {
      subject.setProps({buttonAriaLabel: 'Back'});
    });

    it('sets the aria-label on the icon button accordingly', () => {
      expect(subject.find('.pui-dialog .pui-flyout-icon-btn').prop('aria-label')).toBe('Back');
    });
  });

  describe('open prop', () => {
    beforeEach(() => {
      subject.setProps({open: true});
    });

    it('renders the flyout with the flyout-open class', () => {
      expect(subject.find('.pui-flyout-dialog').hasClass('pui-dialog-show')).toBeTruthy();
    });
  });

  describe('header', () => {
    describe('with a headerClassName prop', () => {
      beforeEach(() => {
        subject.setProps({headerClassName: 'pan'});
      });

      it('sets the given className on the header', () => {
        expect(subject.find('.pui-flyout-header').hasClass('pan')).toBeTruthy();
      });
    });

    it('renders the specified icon', () => {
      expect(subject.find(
        '.pui-flyout-header.grid > .col.col-fixed .pui-btn.pui-btn-default-flat.pui-btn-icon .icon.icon-middle .icon-chevron_left'
      ).text()).toBe('');
    });

    describe('when clicking the icon button', () => {
      beforeEach(() => {
        subject.find('.pui-flyout-icon-btn').simulate('click');
      });

      it('calls the onHide callback', () => {
        expect(onHide).toHaveBeenCalledWith(expect.any(Object));
      });
    });

    it('renders a header', () => {
      expect(subject.find('.pui-flyout-header .col').at(1).text()).toBe('some-flyout-header');
    });

    describe('when an icon src is provided', () => {
      let iconSrc;
      beforeEach(() => {
        iconSrc = 'arrow_back';
        subject.setProps({iconSrc});
      });

      it('renders that icon instead of the close icon', () => {
        expect(subject.find(
          `.pui-flyout-header.grid > .col.col-fixed .pui-btn.pui-btn-default-flat.pui-btn-icon .icon.icon-middle .icon-${iconSrc}`
        ).text()).toBe('');
      });
    });
  });
});