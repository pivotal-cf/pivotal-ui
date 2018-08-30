import '../spec_helper';
import {Dialog} from '../../../src/react/dialog';
import React from 'react';
import DomHelpers from '../../../src/react/helpers/dom-helpers';
import {Icon} from '../../../src/react/iconography';

describe('Dialog', () => {
  let onHide, button, subject;

  beforeEach(() => {
    spyOn(DomHelpers, 'clearTimeout').and.callThrough();
    spyOn(DomHelpers, 'disableBodyScrolling').and.callThrough();
    spyOn(DomHelpers, 'enableBodyScrolling').and.callThrough();
    spyOn(DomHelpers, 'findTabbableElements').and.callThrough();
    spyOn(DomHelpers, 'getActiveElement').and.callThrough();
    spyOn(DomHelpers, 'setTimeout').and.callThrough();
    spyOn(document.body, 'appendChild').and.callThrough();
    spyOn(document.body, 'removeChild').and.callThrough();
    onHide = jest.fn().mockName('onHide');

    button = document.createElement('button');
    button.setAttribute('id', 'some-button');
    document.body.appendChild(button);
    document.body.appendChild.mockReset();

    subject = shallow(<Dialog {...{onHide}}>
      <span id="non-focusable"/>
      <input/>
      <a href="#">a link</a>
    </Dialog>);
  });

  afterEach(() => document.body.removeChild(button));

  it('renders a hidden backdrop', () => {
    expect(subject.find('.pui-dialog-backdrop').hasClass('pui-dialog-show')).toBeFalsy();
    expect(subject.find('.pui-dialog-backdrop').prop('style')).toEqual({
      visibility: 'hidden',
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0s',
      transitionProperty: 'opacity'
    });
    expect(subject.find('.pui-dialog-backdrop').prop('aria-hidden')).toBe('true');
  });

  it('renders a hidden dialog', () => {
    expect(subject.find('.pui-dialog').hasClass('pui-dialog-show')).toBeFalsy();
    expect(subject.find('.pui-dialog').prop('style')).toEqual({
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0s',
      transitionProperty: 'transform'
    });
  });

  it('does not render the children', () => {
    expect(subject.find('.pui-dialog #non-focusable').exists()).toBeFalsy();
    expect(subject.find('.pui-dialog input').exists()).toBeFalsy();
    expect(subject.find('.pui-dialog a').exists()).toBeFalsy();
  });

  it('does not update the parent z-index', () => {
    expect(subject.find('#root').prop('style')).toEqual({});
  });

  describe('when updateParentZIndex is true and modal becomes visible', () => {
    beforeEach(() => {
      subject.setProps({updateParentZIndex: true, animationDuration: 0, show: true});
    });

    it('updates the parent z-index', () => {
      expect(subject.find('#root').prop('style')).toEqual({zIndex: '1000'});
    });

    describe('when the modal is closed', () => {
      beforeEach(() => {
        subject.setProps({show: false});
      });

      it('updates the parent z-index', () => {
        expect(subject.find('#root').prop('style')).toEqual({zIndex: '-1000'});
      });
    });
  });

  describe('when the modal becomes visible', () => {
    beforeEach(() => {
      spyOn(global.document, 'addEventListener').and.callThrough();
      spyOn(global.document, 'removeEventListener').and.callThrough();
      subject.closingTimeout = -1;
      document.body.style.overflow = 'scroll';
      subject.find('#some-button').focus();
      subject.setProps({show: true});
    });

    it('does not update the parent z-index', () => {
      expect(subject.find('#root').prop('style')).toEqual({});
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
      expect(subject.find('.pui-dialog-backdrop').prop('style')).toEqual({
        visibility: 'visible',
        transitionDuration: '200ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0s',
        transitionProperty: 'opacity'
      });
      expect(subject.find('.pui-dialog-backdrop').hasClass('pui-dialog-show')).toBeTruthy();
    });

    it('renders the dialog', () => {
      expect(subject.find('.pui-dialog').hasClass('pui-dialog-show')).toBeTruthy();
      expect(subject.find('.pui-dialog').prop('role')).toBe('dialog');
    });

    it('renders the children', () => {
      expect(subject.find('.pui-dialog #non-focusable').exists()).toBeTruthy();
      expect(subject.find('.pui-dialog input').exists()).toBeTruthy();
      expect(subject.find('.pui-dialog a').exists()).toBeTruthy();
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
          subject.setProps({hideOnEscKeyDown: true});
          onHide.mockReset();
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
          onHide.mockReset();
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
          subject.setProps({hideOnBackdropClick: true});
          onHide.mockReset();
          subject.find('.pui-dialog-backdrop').simulate('click');
        });

        it('calls the onHide prop', () => {
          expect(onHide).toHaveBeenCalledWith();
        });
      });

      describe('when hideOnBackdropClick is false', () => {
        beforeEach(() => {
          onHide.mockReset();
          subject.find('.pui-dialog-backdrop').simulate('click');
        });

        it('does not call the onHide prop', () => {
          expect(onHide).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the dialog is clicked', () => {
      beforeEach(() => {
        onHide.mockReset();
        subject.find('.pui-dialog').simulate('click');
      });

      it('does not call onHide', () => {
        expect(onHide).not.toHaveBeenCalled();
      });

      describe('tab with shift, when focused on the body', () => {
        let tabEvent;

        beforeEach(() => {
          DomHelpers.getActiveElement.mockReturnValue(document.body);
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
        subject.find('.pui-dialog .pui-modal-close-btn').focus();
        event = new KeyboardEvent('keydown', {keyCode: -1, bubbles: true});
        spyOn(event, 'preventDefault');
        DomHelpers.findTabbableElements.mockReset();
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
          subject.find('.pui-dialog a').focus();
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
          subject.find('.pui-dialog input').focus();
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
        subject.setProps({show: false});
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
        subject.setProps({animationDuration: 0, show: false});
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
        // ReactDOM.unmountComponentAtNode(root); // TODO: remove?
      });

      it('re-enables scrolling on the document body', () => {
        expect(DomHelpers.enableBodyScrolling).toHaveBeenCalledWith({overflow: 'scroll', document});
      });
    });
  });

  describe('when the modal is initially rendered with show=true', () => {
    beforeEach(() => {
      spyOn(global.document, 'addEventListener').and.callThrough();
      // ReactDOM.unmountComponentAtNode(root); // TODO: remove?
      subject.find('#some-button').focus();
      subject = shallow(<Dialog {...{show: true, onHide}}>
        <span id="non-focusable"/>
        <input/>
        <a href="#">a link</a>
      </Dialog>);
    });

    it('sets a keydown event listener', () => {
      expect(global.document.addEventListener).toHaveBeenCalledWith('keydown', subject.onKeyDown);
    });

    it('sets the last focused element', () => {
      expect(subject.lastFocusedElement).toBe(document.getElementById('some-button'));
    });

    it('renders the children', () => {
      expect(subject.find('.pui-dialog #non-focusable').exists()).toBeTruthy();
      expect(subject.find('.pui-dialog input').exists()).toBeTruthy();
      expect(subject.find('.pui-dialog a').exists()).toBeTruthy();
    });
  });

  describe('when animationDuration is 0', () => {
    beforeEach(() => {
      subject.setProps({animationDuration: 0});
    });

    it('does not give a transition to the backdrop', () => {
      expect(subject.find('.pui-dialog-backdrop').prop('style')).toEqual({visibility: 'hidden'});
    });

    it('does not give a transition to the dialog', () => {
      expect(subject.find('.pui-dialog').prop('style')).toEqual({});
    });
  });

  describe('when given an ariaLabelledby', () => {
    beforeEach(() => {
      subject.setProps({ariaLabelledBy: 'non-focusable', show: true});
    });

    it('sets the aria-labelledby attribute on the dialog', () => {
      expect(subject.find('.pui-dialog').prop('aria-labelledby')).toBe('non-focusable');
    });
  });

  describe('when given a className', () => {
    beforeEach(() => {
      subject.setProps({className: 'custom-modal-class'});
    });

    it('applies the className to the modal backdrop', () => {
      expect(subject.find('.pui-dialog-backdrop').hasClass('custom-modal-class')).toBeTruthy();
    });
  });

  describe('when given a dialogClassName', () => {
    beforeEach(() => {
      subject.setProps({dialogClassName: 'custom-dialog-class'});
    });

    it('applies it as a className to the modal dialog', () => {
      expect(subject.find('.pui-dialog').hasClass('custom-dialog-class')).toBeTruthy();
    });
  });

  describe('when given a width', () => {
    beforeEach(() => {
      subject.setProps({width: '240px', animationDuration: 0});
    });

    it('does not add a className to the dialog', () => {
      expect(subject.find('.pui-dialog').hasClass('pui-modal-sm')).toBeFalsy();
      expect(subject.find('.pui-dialog').hasClass('pui-modal-lg')).toBeFalsy();
    });

    it('sets the style on the dialog', () => {
      expect(subject.find('.pui-dialog').prop('style')).toEqual({width: '240px'});
    });
  });
});