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
    onHide = jasmine.createSpy('onHide');

    subject = ReactDOM.render(
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
    expect('.pui-dialog.pui-modal-dialog .pui-modal-close-btn').toHaveAttr('aria-label', 'Close');
    expect('.pui-dialog.pui-modal-dialog .pui-modal-close-btn').toHaveClass('pui-btn--default');
    expect('.pui-dialog.pui-modal-dialog .pui-modal-close-btn').toHaveClass('pui-btn--flat');
    expect('.pui-dialog.pui-modal-dialog .pui-modal-close-btn').toHaveClass('pui-btn--icon-only');
    expect(Icon).toHaveBeenRenderedWithProps({src: 'close', size: 'inherit', style: {}, verticalAlign: 'middle'});
  });

  it('renders the children', () => {
    expect('.pui-dialog.pui-modal-dialog .pui-modal-body #non-focusable').toExist();
    expect('.pui-dialog.pui-modal-dialog .pui-modal-body input').toExist();
    expect('.pui-dialog.pui-modal-dialog .pui-modal-body a').toExist();
  });

  it('does not render a footer', () => {
    expect('.pui-dialog.pui-modal-dialog .pui-modal-footer').not.toExist();
    expect('.pui-dialog.pui-modal-dialog .pui-modal-body').not.toHaveClass('pui-modal-has-footer');
  });

  describe('when given a title', () => {
    beforeEach(() => {
      subject::setProps({title: 'This is a modal'});
    });

    it('renders the title in a heading tag', () => {
      expect('.pui-dialog.pui-modal-dialog .pui-modal-header h3.pui-modal-title').toHaveText('This is a modal');
      expect('.pui-dialog.pui-modal-dialog .pui-modal-header h3.pui-modal-title').toHaveClass('em-high');
    });

    it('sets the aria-labelledby attribute on the dialog to be the ID of the title', () => {
      const titleId = $('.pui-dialog.pui-modal-dialog .pui-modal-header h3.pui-modal-title').attr('id');
      expect('.pui-dialog.pui-modal-dialog').toHaveAttr('aria-labelledby', titleId);
    });
  });

  describe('when given a bodyClassName', () => {
    beforeEach(() => {
      subject::setProps({bodyClassName: 'some-body-class'});
    });

    it('renders the footer in the dialog', () => {
      expect('.pui-dialog.pui-modal-dialog .pui-modal-body').toHaveClass('some-body-class');
    });
  });

  describe('when given a footer', () => {
    beforeEach(() => {
      subject::setProps({footer: <h6>a footer</h6>, footerClassName: 'some-footer-class'});
    });

    it('renders the footer in the dialog', () => {
      expect('.pui-dialog.pui-modal-dialog .pui-modal-footer h6').toHaveText('a footer');
      expect('.pui-dialog.pui-modal-dialog .pui-modal-footer').toHaveClass('some-footer-class');
      expect('.pui-dialog.pui-modal-dialog .pui-modal-body').toHaveClass('pui-modal-has-footer');
    });
  });

  describe('when given a size', () => {
    describe('when size = "sm"', () => {
      beforeEach(() => {
        subject::setProps({size: 'sm'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect('.pui-dialog.pui-modal-dialog').toHaveClass('pui-modal-sm');
      });
    });

    describe('when size = "small"', () => {
      beforeEach(() => {
        subject::setProps({size: 'small'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect('.pui-dialog.pui-modal-dialog').toHaveClass('pui-modal-sm');
      });
    });

    describe('when size = "lg"', () => {
      beforeEach(() => {
        subject::setProps({size: 'lg'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect('.pui-dialog.pui-modal-dialog').toHaveClass('pui-modal-lg');
      });
    });

    describe('when size = "large"', () => {
      beforeEach(() => {
        subject::setProps({size: 'large'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect('.pui-dialog.pui-modal-dialog').toHaveClass('pui-modal-lg');
      });
    });

    describe('when size is a custom width', () => {
      beforeEach(() => {
        subject::setProps({size: '240px'});
      });

      it('does not add a className to the dialog', () => {
        expect('.pui-dialog.pui-modal-dialog').not.toHaveClass('pui-modal-sm');
        expect('.pui-dialog.pui-modal-dialog').not.toHaveClass('pui-modal-lg');
      });

      it('sets the style on the dialog', () => {
        expect('.pui-dialog.pui-modal-dialog').toHaveCss({width: '240px'});
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