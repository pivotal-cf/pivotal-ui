import '../spec_helper';
import {BaseModal, ModalBody, ModalFooter} from '../../../src/react/modals';
import DomHelpers from '../../../src/react/helpers/dom-helpers';

describe('BaseModal', () => {
  let subject;

  beforeEach(() => {
    spyOn(DomHelpers, 'disableBodyScrolling').and.callThrough();
    spyOn(DomHelpers, 'enableBodyScrolling').and.callThrough();
    spyOn(DomHelpers, 'findTabbableElements').and.callThrough();
    spyOn(document.body, 'appendChild').and.callThrough();
    spyOn(document.body, 'removeChild').and.callThrough();

    subject = ReactDOM.render(
      <BaseModal>
        <span id="non-focusable"/>
        <input/>
        <a href="#">a link</a>
      </BaseModal>,
      root
    );
  });

  it('creates a modal root div and appends it to the body node', () => {
    expect(document.body.appendChild).toHaveBeenCalledWith(subject.modalRoot);
  });

  it('renders a hidden backdrop', () => {
    expect('.pui-modal-backdrop').not.toHaveClass('pui-modal-show');
    expect('.pui-modal-backdrop').toHaveCss({
      visibility: 'hidden', transition: 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s'
    });
    expect('.pui-modal-backdrop').toHaveAttr('aria-hidden', 'true');
  });

  it('renders a hidden dialog', () => {
    expect('.pui-modal-dialog').not.toHaveClass('pui-modal-show');
    expect('.pui-modal-dialog').toHaveCss({transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s'});
  });

  it('renders a close button', () => {
    expect('.pui-modal-dialog .pui-modal-close-btn').toHaveAttr('aria-label', 'Close');
  });

  it('does not render the children', () => {
    expect('.pui-modal-dialog #non-focusable').not.toExist();
    expect('.pui-modal-dialog input').not.toExist();
    expect('.pui-modal-dialog a').not.toExist();
  });

  describe('when the modal becomes visible', () => {
    let onHide, oldActiveElement;

    beforeEach(() => {
      oldActiveElement = document.body;
      document.body.style.paddingRight = '24px';
      document.body.style.overflow = 'scroll';
      onHide = jasmine.createSpy('onHide');
      subject::setProps({show: true, onHide});
    });

    it('renders a modal', () => {
      expect('.pui-modal-backdrop').toHaveCss({visibility: 'visible'});
      expect('.pui-modal-backdrop').toHaveClass('pui-modal-show');
    });

    it('renders the dialog', () => {
      expect('.pui-modal-dialog').toHaveClass('pui-modal-show');
      expect('.pui-modal-dialog').toHaveAttr('role', 'dialog');
    });

    it('renders the children', () => {
      expect('.pui-modal-dialog #non-focusable').toExist();
      expect('.pui-modal-dialog input').toExist();
      expect('.pui-modal-dialog a').toExist();
    });

    it('focuses the first focusable child', () => {
      expect('.pui-modal-dialog input').toBeFocused();
    });

    it('disables scrolling on the document body', () => {
      expect(DomHelpers.disableBodyScrolling).toHaveBeenCalledWith(document);
      expect(subject.savedPadding).toBe('24px');
      expect(subject.savedOverflow).toBe('scroll');
    });

    describe('when the x icon is clicked', () => {
      beforeEach(() => {
        onHide.calls.reset();
        $('.pui-modal-close-btn').simulate('click');
      });

      it('calls the onHide prop', () => {
        expect(onHide).toHaveBeenCalledWith();
      });
    });

    describe('when esc is pressed', () => {
      beforeEach(() => {
        onHide.calls.reset();
        const escEvent = new KeyboardEvent('keydown', {keyCode: BaseModal.ESC_KEY, bubbles: true});
        document.documentElement.dispatchEvent(escEvent);
      });

      it('calls the onHide prop', () => {
        expect(onHide).toHaveBeenCalledWith();
      });
    });

    describe('when the backdrop is clicked', () => {
      beforeEach(() => {
        onHide.calls.reset();
        $('.pui-modal-backdrop').simulate('click');
      });

      it('calls the onHide prop', () => {
        expect(onHide).toHaveBeenCalledWith();
      });
    });

    describe('when the dialog is clicked', () => {
      beforeEach(() => {
        onHide.calls.reset();
        $('.pui-modal-dialog').simulate('click');
      });

      it('does not call onHide', () => {
        expect(onHide).not.toHaveBeenCalled();
      });
    });

    describe('when tab is pressed', () => {
      let tabEvent;

      describe('tab without shift, when focused on last tabbable element', () => {
        beforeEach(() => {
          $('.pui-modal-dialog .pui-modal-close-btn').focus();
          tabEvent = new KeyboardEvent('keydown', {keyCode: BaseModal.TAB_KEY, bubbles: true});
          document.activeElement.dispatchEvent(tabEvent);
        });

        it('finds the tabbable elements within the modal', () => {
          expect(DomHelpers.findTabbableElements).toHaveBeenCalledWith(subject.modalRoot);
        });

        it('redirects focus to the first tabbable element within the modal', () => {
          expect('.pui-modal-dialog input').toBeFocused();
        });
      });

      describe('tab with shift, when focused on first tabbable element', () => {
        beforeEach(() => {
          $('.pui-modal-dialog input').focus();
          tabEvent = new KeyboardEvent('keydown', {keyCode: BaseModal.TAB_KEY, shiftKey: true, bubbles: true});
          document.activeElement.dispatchEvent(tabEvent);
        });

        it('finds the tabbable elements within the modal', () => {
          expect(DomHelpers.findTabbableElements).toHaveBeenCalledWith(subject.modalRoot);
        });

        it('redirects focus to the last tabbable element within the modal', () => {
          expect('.pui-modal-dialog .pui-modal-close-btn').toBeFocused();
        });
      });
    });

    describe('when show becomes false', () => {
      beforeEach(() => {
        subject::setProps({show: false, getActiveElement: () => oldActiveElement});
        jasmine.clock().tick(BaseModal.defaultProps.animationDuration);
      });

      it('re-enables scrolling on the document body', () => {
        expect(DomHelpers.enableBodyScrolling).toHaveBeenCalledWith({
          paddingRight: '24px', overflow: 'scroll', document
        });
      });

      it('sets focus back to previously-focused element', () => {
        expect(document.activeElement).toBe(oldActiveElement);
      });
    });
  });

  describe('when disableAnimation is true', () => {
    beforeEach(() => {
      subject::setProps({disableAnimation: true});
    });

    it('does not give a transition to the backdrop', () => {
      expect('.pui-modal-backdrop').not.toHaveCss('transition');
    });

    it('does not give a transition to the dialog', () => {
      expect('.pui-modal-dialog').not.toHaveCss('transition');
    });
  });

  describe('when given a title', () => {
    beforeEach(() => {
      subject::setProps({title: 'This is a modal', show: true});
    });

    it('renders the title in a heading tag', () => {
      expect('.pui-modal-dialog .pui-modal-header h3.pui-modal-title').toHaveText('This is a modal');
      expect('.pui-modal-dialog .pui-modal-header h3.pui-modal-title').toHaveClass('em-high');
    });

    it('sets the aria-labelledby attribute on the dialog to be the ID of the title', () => {
      const titleId = $('.pui-modal-dialog .pui-modal-header h3.pui-modal-title').attr('id');
      expect('.pui-modal-dialog').toHaveAttr('aria-labelledby', titleId);
    });
  });

  describe('when given a className', () => {
    beforeEach(() => {
      subject::setProps({className: 'custom-modal-class'});
    });

    it('applies the className to the modal backdrop', () => {
      expect('.pui-modal-backdrop').toHaveClass('custom-modal-class');
    });
  });

  describe('when given a dialogClassName', () => {
    beforeEach(() => {
      subject::setProps({dialogClassName: 'custom-dialog-class'});
    });

    it('applies it as a className to the modal dialog', () => {
      expect('.pui-modal-dialog').toHaveClass('custom-dialog-class');
    });
  });

  describe('when given a size', () => {
    describe('when size = "sm"', () => {
      beforeEach(() => {
        subject::setProps({size: 'sm'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect('.pui-modal-dialog').toHaveClass('pui-modal-sm');
      });
    });

    describe('when size = "small"', () => {
      beforeEach(() => {
        subject::setProps({size: 'small'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect('.pui-modal-dialog').toHaveClass('pui-modal-sm');
      });
    });

    describe('when size = "lg"', () => {
      beforeEach(() => {
        subject::setProps({size: 'lg'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect('.pui-modal-dialog').toHaveClass('pui-modal-lg');
      });
    });

    describe('when size = "large"', () => {
      beforeEach(() => {
        subject::setProps({size: 'large'});
      });

      it('adds the corresponding className to the dialog', () => {
        expect('.pui-modal-dialog').toHaveClass('pui-modal-lg');
      });
    });

    describe('when size is a custom width', () => {
      beforeEach(() => {
        subject::setProps({size: '240px'});
      });

      it('does not add a className to the dialog', () => {
        expect('.pui-modal-dialog').not.toHaveClass('pui-modal-sm');
        expect('.pui-modal-dialog').not.toHaveClass('pui-modal-lg');
      });

      it('sets the style on the dialog', () => {
        expect('.pui-modal-dialog').toHaveCss({width: '240px'});
      });
    });
  });
});

describe('ModalBody', () => {
  beforeEach(() => {
    ReactDOM.render(<ModalBody className="custom-modal-body-class"/>, root);
  });

  it('renders a div with the correct classes', () => {
    expect('div.pui-modal-body').toHaveClass('custom-modal-body-class');
  });
});

describe('ModalFooter', () => {
  beforeEach(() => {
    ReactDOM.render(<ModalFooter className="custom-modal-footer-class"/>, root);
  });

  it('renders a div with the correct classes', () => {
    expect('div.pui-modal-footer').toHaveClass('custom-modal-footer-class');
  });
});