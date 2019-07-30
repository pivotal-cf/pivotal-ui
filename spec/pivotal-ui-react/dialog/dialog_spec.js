import '../spec_helper';
import {Dialog} from '../../../src/react/dialog';
import React from 'react';
import DomHelpers from '../../../src/react/helpers/dom-helpers';
import {Icon} from '../../../src/react/iconography';

describe('Dialog', () => {
  let onHide, button, subject;

  beforeEach(() => {
    spyOnRender(Icon);
    spyOn(DomHelpers, 'clearTimeout').and.callThrough();
    spyOn(DomHelpers, 'disableBodyScrolling').and.callThrough();
    spyOn(DomHelpers, 'enableBodyScrolling').and.callThrough();
    spyOn(DomHelpers, 'findTabbableElements').and.callThrough();
    spyOn(DomHelpers, 'getActiveElement').and.callThrough();
    spyOn(DomHelpers, 'setTimeout').and.callThrough();
    spyOn(document.body, 'appendChild').and.callThrough();
    spyOn(document.body, 'removeChild').and.callThrough();
    onHide = jasmine.createSpy('onHide');

    button = document.createElement('button');
    button.setAttribute('id', 'some-button');
    document.body.appendChild(button);
    document.body.appendChild.calls.reset();

    subject = ReactDOM.render(
      <Dialog {...{onHide}}>
        <span id="non-focusable"/>
        <input/>
        <a href="#">a link</a>
      </Dialog>,
      root
    );
  });

  afterEach(() => document.body.removeChild(button));

  it('renders a hidden backdrop', () => {
    expect('.pui-dialog-backdrop').not.toHaveClass('pui-dialog-show');
    expect('.pui-dialog-backdrop').toHaveStyle({
      visibility: 'hidden',
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0s',
      transitionProperty: 'opacity'
    });
    expect('.pui-dialog-backdrop').toHaveAttr('aria-hidden', 'true');
  });

  it('renders a hidden dialog', () => {
    expect('.pui-dialog').not.toHaveClass('pui-dialog-show');
    expect('.pui-dialog').toHaveStyle({
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0s',
      transitionProperty: 'transform'
    });
  });

  it('does not render the children', () => {
    expect('.pui-dialog #non-focusable').not.toExist();
    expect('.pui-dialog input').not.toExist();
    expect('.pui-dialog a').not.toExist();
  });

  it('does not update the parent z-index', () => {
    expect('#root').toHaveStyle({});
  });

  describe('when updateParentZIndex is true and modal becomes visible', () => {
    beforeEach(() => {
      subject::setProps({updateParentZIndex: true, animationDuration: 0, show: true});
    });

    it('updates the parent z-index', () => {
      expect('#root').toHaveStyle({zIndex: '1000'});
    });

    describe('when the modal is closed', () => {
      beforeEach(() => {
        subject::setProps({show: false});
      });

      it('updates the parent z-index', () => {
        expect('#root').toHaveStyle({zIndex: '-1000'});
      });
    });
  });

  describe('when the modal becomes visible', () => {
    beforeEach(() => {
      spyOn(global.document, 'addEventListener').and.callThrough();
      spyOn(global.document, 'removeEventListener').and.callThrough();
      subject.closingTimeout = -1;
      document.body.style.overflow = 'scroll';
      $('#some-button').focus();
      subject::setProps({show: true});
    });

    it('does not update the parent z-index', () => {
      expect('#root').toHaveStyle({});
    });

    it('sets a keydown event listener', () => {
      expect(global.document.addEventListener).toHaveBeenCalledWith('keydown', subject.onKeyDown);
    });

    it('sets the last focused element', () => {
      expect(subject.lastFocusedElement).toBe(document.getElementById('some-button'));
    });

    it('clears the timeout', () => {
      expect(DomHelpers.clearTimeout).toHaveBeenCalledWith(-1);
    });

    it('renders a modal', () => {
      expect('.pui-dialog-backdrop').toHaveStyle({
        visibility: 'visible',
        transitionDuration: '200ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0s',
        transitionProperty: 'opacity'
      });
      expect('.pui-dialog-backdrop').toHaveClass('pui-dialog-show');
    });

    it('renders the dialog', () => {
      expect('.pui-dialog').toHaveClass('pui-dialog-show');
      expect('.pui-dialog').toHaveAttr('role', 'dialog');
    });

    it('renders the children', () => {
      expect('.pui-dialog #non-focusable').toExist();
      expect('.pui-dialog input').toExist();
      expect('.pui-dialog a').toExist();
    });

    it('focuses the first focusable child', () => {
      expect('.pui-dialog input').toBeFocused();
    });

    it('disables scrolling on the document body', () => {
      expect(DomHelpers.disableBodyScrolling).toHaveBeenCalledWith(document);
      expect(subject.savedOverflow).toBe('scroll');
    });

    describe('when esc is pressed', () => {
      let escEvent;

      describe('when hideOnEscKeyDown is true', () => {
        beforeEach(() => {
          subject::setProps({hideOnEscKeyDown: true});
          onHide.calls.reset();
          escEvent = new KeyboardEvent('keydown', {keyCode: Dialog.ESC_KEY, bubbles: true});
          spyOn(escEvent, 'preventDefault');
          document.documentElement.dispatchEvent(escEvent);
        });

        it('calls the onHide prop', () => {
          expect(onHide).toHaveBeenCalledWith();
        });

        it('does not prevent default', () => {
          expect(escEvent.preventDefault).not.toHaveBeenCalled();
        });
      });

      describe('when hideOnEscKeyDown is false', () => {
        beforeEach(() => {
          onHide.calls.reset();
          escEvent = new KeyboardEvent('keydown', {keyCode: Dialog.ESC_KEY, bubbles: true});
          spyOn(escEvent, 'preventDefault');
          document.documentElement.dispatchEvent(escEvent);
        });

        it('does not call the onHide prop', () => {
          expect(onHide).not.toHaveBeenCalled();
        });

        it('does not prevent default', () => {
          expect(escEvent.preventDefault).not.toHaveBeenCalled();
        });
      });

    });

    describe('when the backdrop is clicked', () => {
      describe('when hideOnBackdropClick is true', () => {
        beforeEach(() => {
          subject::setProps({hideOnBackdropClick: true});
          onHide.calls.reset();
          $('.pui-dialog-backdrop').simulate('mouseDown');
        });

        it('calls the onHide prop', () => {
          expect(onHide).toHaveBeenCalledWith();
        });
      });

      describe('when hideOnBackdropClick is false', () => {
        beforeEach(() => {
          onHide.calls.reset();
          $('.pui-dialog-backdrop').simulate('mouseDown');
        });

        it('does not call the onHide prop', () => {
          expect(onHide).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the dialog is clicked', () => {
      beforeEach(() => {
        onHide.calls.reset();
        $('.pui-dialog').simulate('click');
      });

      it('does not call onHide', () => {
        expect(onHide).not.toHaveBeenCalled();
      });

      describe('tab with shift, when focused on the body', () => {
        let tabEvent;

        beforeEach(() => {
          DomHelpers.getActiveElement.and.returnValue(document.body);
          tabEvent = new KeyboardEvent('keydown', {keyCode: Dialog.TAB_KEY, shiftKey: true, bubbles: true});
          spyOn(tabEvent, 'preventDefault');
          document.activeElement.dispatchEvent(tabEvent);
        });

        it('finds the tabbable elements within the modal', () => {
          expect(DomHelpers.findTabbableElements).toHaveBeenCalledWith(subject.dialog);
        });

        it('prevents default', () => {
          expect(tabEvent.preventDefault).toHaveBeenCalled();
        });

        it('redirects focus to the last tabbable element', () => {
          expect('.pui-dialog a').toBeFocused();
        });
      });
    });

    describe('when a key that is neither tab nor esc is pressed', () => {
      let event;

      beforeEach(() => {
        $('.pui-dialog .pui-modal-close-btn').focus();
        event = new KeyboardEvent('keydown', {keyCode: -1, bubbles: true});
        spyOn(event, 'preventDefault');
        DomHelpers.findTabbableElements.calls.reset();
        document.activeElement.dispatchEvent(event);
      });

      it('does not hide', () => {
        expect(onHide).not.toHaveBeenCalled();
      });

      it('does not find tabbable elements', () => {
        expect(DomHelpers.findTabbableElements).not.toHaveBeenCalled();
      });

      it('does not prevent default', () => {
        expect(event.preventDefault).not.toHaveBeenCalled();
      });
    });

    describe('when tab is pressed', () => {
      let tabEvent;

      describe('tab without shift, when focused on last tabbable element', () => {
        beforeEach(() => {
          $('.pui-dialog a').focus();
          tabEvent = new KeyboardEvent('keydown', {keyCode: Dialog.TAB_KEY, bubbles: true});
          spyOn(tabEvent, 'preventDefault');
          document.activeElement.dispatchEvent(tabEvent);
        });

        it('finds the tabbable elements within the modal', () => {
          expect(DomHelpers.findTabbableElements).toHaveBeenCalledWith(subject.dialog);
        });

        it('prevents default', () => {
          expect(tabEvent.preventDefault).toHaveBeenCalledWith();
        });

        it('redirects focus to the first tabbable element within the modal', () => {
          expect('.pui-dialog input').toBeFocused();
        });
      });

      describe('tab with shift, when focused on first tabbable element', () => {
        beforeEach(() => {
          $('.pui-dialog input').focus();
          tabEvent = new KeyboardEvent('keydown', {keyCode: Dialog.TAB_KEY, shiftKey: true, bubbles: true});
          spyOn(tabEvent, 'preventDefault');
          document.activeElement.dispatchEvent(tabEvent);
        });

        it('finds the tabbable elements within the modal', () => {
          expect(DomHelpers.findTabbableElements).toHaveBeenCalledWith(subject.dialog);
        });

        it('prevents default', () => {
          expect(tabEvent.preventDefault).toHaveBeenCalledWith();
        });

        it('redirects focus to the last tabbable element within the modal', () => {
          expect('.pui-dialog a').toBeFocused();
        });
      });
    });

    describe('when show becomes false and animation is enabled', () => {
      beforeEach(() => {
        subject::setProps({show: false});
        jasmine.clock().tick(Dialog.defaultProps.animationDuration);
      });

      it('removes the keydown event listener', () => {
        expect(global.document.removeEventListener).toHaveBeenCalledWith('keydown', subject.onKeyDown);
      });

      it('sets focus back to previously-focused element', () => {
        expect('#some-button').toBeFocused();
      });

      it('sets a timeout to close the dialog after animationDuration', () => {
        expect(DomHelpers.setTimeout).toHaveBeenCalledWith(subject.closeDialog, Dialog.defaultProps.animationDuration);
      });

      it('re-enables scrolling on the document body', () => {
        expect(DomHelpers.enableBodyScrolling).toHaveBeenCalledWith({overflow: 'scroll', document});
      });
    });

    describe('when show becomes false and animation is disabled', () => {
      beforeEach(() => {
        subject::setProps({animationDuration: 0, show: false});
      });

      it('removes the keydown event listener', () => {
        expect(global.document.removeEventListener).toHaveBeenCalledWith('keydown', subject.onKeyDown);
      });

      it('sets focus back to previously-focused element', () => {
        expect('#some-button').toBeFocused();
      });

      it('re-enables scrolling on the document body', () => {
        expect(DomHelpers.enableBodyScrolling).toHaveBeenCalledWith({overflow: 'scroll', document});
      });
    });

    describe('when unmounting', () => {
      beforeEach(() => {
        ReactDOM.unmountComponentAtNode(root);
      });

      it('re-enables scrolling on the document body', () => {
        expect(DomHelpers.enableBodyScrolling).toHaveBeenCalledWith({overflow: 'scroll', document});
      });
    });
  });

  describe('when the modal is initially rendered with show=true', () => {
    beforeEach(() => {
      spyOn(global.document, 'addEventListener').and.callThrough();
      ReactDOM.unmountComponentAtNode(root);
      $('#some-button').focus();
      subject = ReactDOM.render(
        <Dialog {...{show: true, onHide}}>
          <span id="non-focusable"/>
          <input/>
          <a href="#">a link</a>
        </Dialog>,
        root
      );
    });

    it('sets a keydown event listener', () => {
      expect(global.document.addEventListener).toHaveBeenCalledWith('keydown', subject.onKeyDown);
    });

    it('sets the last focused element', () => {
      expect(subject.lastFocusedElement).toBe(document.getElementById('some-button'));
    });

    it('renders the children', () => {
      expect('.pui-dialog #non-focusable').toExist();
      expect('.pui-dialog input').toExist();
      expect('.pui-dialog a').toExist();
    });
  });

  describe('when animationDuration is 0', () => {
    beforeEach(() => {
      subject::setProps({animationDuration: 0});
    });

    it('does not give a transition to the backdrop', () => {
      expect('.pui-dialog-backdrop').toHaveStyle({visibility: 'hidden'});
    });

    it('does not give a transition to the dialog', () => {
      expect('.pui-dialog').toHaveStyle({});
    });
  });

  describe('when given an ariaLabelledby', () => {
    beforeEach(() => {
      subject::setProps({ariaLabelledBy: 'non-focusable', show: true});
    });

    it('sets the aria-labelledby attribute on the dialog', () => {
      expect('.pui-dialog').toHaveAttr('aria-labelledby', 'non-focusable');
    });
  });

  describe('when given a className', () => {
    beforeEach(() => {
      subject::setProps({className: 'custom-modal-class'});
    });

    it('applies the className to the modal backdrop', () => {
      expect('.pui-dialog-backdrop').toHaveClass('custom-modal-class');
    });
  });

  describe('when given a dialogClassName', () => {
    beforeEach(() => {
      subject::setProps({dialogClassName: 'custom-dialog-class'});
    });

    it('applies it as a className to the modal dialog', () => {
      expect('.pui-dialog').toHaveClass('custom-dialog-class');
    });
  });

  describe('when given a width', () => {
    beforeEach(() => {
      subject::setProps({width: '240px', animationDuration: 0});
    });

    it('does not add a className to the dialog', () => {
      expect('.pui-dialog').not.toHaveClass('pui-modal-sm');
      expect('.pui-dialog').not.toHaveClass('pui-modal-lg');
    });

    it('sets the style on the dialog', () => {
      expect('.pui-dialog').toHaveStyle({width: '240px'});
    });
  });
});