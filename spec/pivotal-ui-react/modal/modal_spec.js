import '../spec_helper';
import {Modal} from '../../../src/react/modal';
import {Dialog} from '../../../src/react/dialog';
import {Icon} from '../../../src/react/iconography';
import React from 'react';

describe('Modal', () => {
  let onHide, subject;

  beforeEach(() => {
    spyOnRender(Dialog).and.callThrough();
    spyOnRender(Icon);
    onHide = jest.fn();

    subject = shallow(
      <Modal {...{
        show: true,
        onHide,
        animationDuration: 0,
        animationEasing: 'linear',
        dialogClassName: 'some-dialog-class'
      }}>
        <span id="non-focusable"/>
        <input/>
        <a href="#">a link</a>
      </Modal>,
      root
    );
  });

  it('renders a Dialog', () => {
    expect(Dialog).toHaveBeenRenderedWithProps({
      show: true,
      onHide,
      animationDuration: 0,
      animationEasing: 'linear',
      className: 'pui-modal-dialog-backdrop',
      dialogClassName: 'pui-modal-dialog some-dialog-class',
      children: jasmine.any(Object),
      ariaLabelledBy: jasmine.any(String),
      hideOnBackdropClick: true,
      hideOnEscKeyDown: true
    });
  });

  it('renders a close button', () => {
    expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-close-btn').prop('aria-label')).toBe('Close');
    expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-close-btn').hasClass('pui-btn-default-flat')).toBeTruthy();
    expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-close-btn').hasClass('pui-btn-icon')).toBeTruthy();
    expect(Icon).toHaveBeenRenderedWithProps({src: 'close', size: 'inherit', style: {}, verticalAlign: 'middle'});
  });

  it('renders the children', () => {
    expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-body #non-focusable').exists()).toBeTruthy();
    expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-body input').exists()).toBeTruthy();
    expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-body a').exists()).toBeTruthy();
  });

  it('does not render a footer', () => {
    expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-footer').exists()).toBeFalsy();
    expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-body').hasClass('pui-modal-has-footer')).toBeFalsy();
  });

  describe('when given a title', () => {
    beforeEach(() => {
      subject.setProps({title: 'This is a modal'});
    });

    it('renders the title in a heading tag', () => {
      expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-header h3.pui-modal-title').text()).toBe('This is a modal');
      expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-header h3.pui-modal-title').hasClass('em-high')).toBeTruthy();
    });

    it('sets the aria-labelledby attribute on the dialog to be the ID of the title', () => {
      const titleId = $('.pui-dialog.pui-modal-dialog .pui-modal-header h3.pui-modal-title').attr('id');
      expect(subject.find('.pui-dialog.pui-modal-dialog').prop('aria-labelledby')).toBe(titleId);
    });
  });

  describe('when given a bodyClassName', () => {
    beforeEach(() => {
      subject.setProps({bodyClassName: 'some-body-class'});
    });

    it('renders the footer in the dialog', () => {
      expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-body').hasClass('some-body-class')).toBeTruthy();
    });
  });

  describe('when given a footer', () => {
    beforeEach(() => {
      subject.setProps({footer: <h6>a footer</h6>, footerClassName: 'some-footer-class'});
    });

    it('renders the footer in the dialog', () => {
      expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-footer h6').text()).toBe('a footer');
      expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-footer').hasClass('some-footer-class')).toBeTruthy();
      expect(subject.find('.pui-dialog.pui-modal-dialog .pui-modal-body').hasClass('pui-modal-has-footer')).toBeTruthy();
    });
  });

  describe('when given a size', () => {
    describe('when size = "sm"', () => {
      beforeEach(() => {
        subject.setProps({size: 'sm'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect(subject.find('.pui-dialog.pui-modal-dialog').hasClass('pui-modal-sm')).toBeTruthy();
      });
    });

    describe('when size = "small"', () => {
      beforeEach(() => {
        subject.setProps({size: 'small'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect(subject.find('.pui-dialog.pui-modal-dialog').hasClass('pui-modal-sm')).toBeTruthy();
      });
    });

    describe('when size = "lg"', () => {
      beforeEach(() => {
        subject.setProps({size: 'lg'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect(subject.find('.pui-dialog.pui-modal-dialog').hasClass('pui-modal-lg')).toBeTruthy();
      });
    });

    describe('when size = "large"', () => {
      beforeEach(() => {
        subject.setProps({size: 'large'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect(subject.find('.pui-dialog.pui-modal-dialog').hasClass('pui-modal-lg')).toBeTruthy();
      });
    });

    describe('when size is a custom width', () => {
      beforeEach(() => {
        subject.setProps({size: '240px'});
      });

      it('does not add a className to the dialog', () => {
        expect(subject.find('.pui-dialog.pui-modal-dialog').hasClass('pui-modal-sm')).toBeFalsy();
        expect(subject.find('.pui-dialog.pui-modal-dialog').hasClass('pui-modal-lg')).toBeFalsy();
      });

      it('sets the style on the dialog', () => {
        expect(subject.find('.pui-dialog.pui-modal-dialog').prop('style')).toEqual({width: '240px'});
      });
    });
  });

  describe('when the backdrop is clicked', () => {
    beforeEach(() => {
      onHide.calls.reset();
      $('.pui-dialog-backdrop').simulate('click');
    });

    it('calls the onHide prop', () => {
      expect(onHide).toHaveBeenCalledWith();
    });
  });

  describe('when esc is pressed', () => {
    beforeEach(() => {
      onHide.calls.reset();
      const escEvent = new KeyboardEvent('keydown', {keyCode: Dialog.ESC_KEY, bubbles: true});
      document.documentElement.dispatchEvent(escEvent);
    });

    it('calls the onHide prop', () => {
      expect(onHide).toHaveBeenCalledWith();
    });
  });
});