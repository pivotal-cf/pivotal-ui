import '../spec_helper';
import {findByClass, findAllByClass, clickOn} from '../spec_helper';
import {Modal, BaseModal} from 'pui-react-modals';

let result;

describe('Modals', () => {
  const renderComponent = props => ReactDOM.render(<Modal {...props}>Hi</Modal>, root);

  beforeEach(() => {
    result = renderComponent({className: 'myModal', animation: false});
  });

  it('is closed by default', () => {
    expect(findAllByClass(result, 'myModal')).toHaveLength(0);
  });

  describe('#open', () => {
    it('opens the modal', () => {
      result.open();

      expect(findByClass(result, 'myModal')).toBeDefined();
    });
  });

  describe('#close', () => {
    beforeEach(() => {
      result.open();
    });

    it('closes the modal', () => {
      result.close();

      expect(findAllByClass(result, 'myModal')).toHaveLength(0);
    });
  });

  describe('animations', () => {
    describe('with animations true', () => {
      const delay = BaseModal.ANIMATION_TIME;
      beforeEach(() => {
        result = renderComponent({animation: true});
        result.open();
      });

      it('animates the modal in (with easeOutQuad)', () => {
        const modalDialog = findByClass(result, 'modal-dialog');
        const modalBackdrop = findByClass(result, 'modal-backdrop');

        expect(modalDialog).toHaveCss({'margin-top': '0px'});
        expect(modalBackdrop).toHaveCss({opacity: 0});

        MockNow.tick(delay / 2);
        MockRaf.next();

        expect(modalDialog).toHaveCss({'margin-top': '37.5px'});
        expect(modalBackdrop).toHaveCss({opacity: 0.6});

        MockNow.tick(delay / 2);
        MockRaf.next();

        expect(modalDialog).toHaveCss({'margin-top': '50px'});
        expect(modalBackdrop).toHaveCss({opacity: 0.8});
      });

      it('animates the modal out', () => {
        MockNow.tick(delay);
        MockRaf.next();

        const modalDialog = findByClass(result, 'modal-dialog');
        const modalBackdrop = findByClass(result, 'modal-backdrop');

        result.close();

        expect(modalDialog).toHaveCss({'margin-top': '50px'});
        expect(modalBackdrop).toHaveCss({opacity: 0.8});

        MockNow.tick(delay / 2);
        MockRaf.next();

        expect(modalDialog).toHaveCss({'margin-top': '12.5px'});
        expect(modalBackdrop).toHaveCss({opacity: 0.2});

        MockNow.tick(delay / 2);
        MockRaf.next();

        expect(findAllByClass(result, 'modal-dialog')).toHaveLength(0);
        expect(findAllByClass(result, 'modal-backdrop')).toHaveLength(0);
      });
    });

    describe('with animations false', () => {
      it('does not animate if animation is false', () => {
        result = renderComponent({animation: false});
        result.open();

        const modalDialog = findByClass(result, 'modal-dialog');
        const modalBackdrop = findByClass(result, 'modal-backdrop');

        expect(modalDialog).toHaveCss({'margin-top': '50px'});
        expect(modalBackdrop).toHaveCss({opacity: 0.8});

        result.close();

        expect(findAllByClass(result, 'modal-dialog')).toHaveLength(0);
        expect(findAllByClass(result, 'modal-backdrop')).toHaveLength(0);
      });
    });
  });

  describe('onEntered/onExited', () => {
    describe('with animation', () => {
      let delay, onEnterSpy, onExitSpy;
      beforeEach(() => {
        delay = BaseModal.ANIMATION_TIME;
        onEnterSpy = jasmine.createSpy('onEnter');
        onExitSpy = jasmine.createSpy('onExit');
        result = renderComponent({animation: true, onExited: onExitSpy, onEntered: onEnterSpy});
        result.open();
        MockNow.tick(delay);
        MockRaf.next();
      });

      it('calls on entered when the shown animations are complete', () => {
        expect(onEnterSpy).toHaveBeenCalled();
        expect(onExitSpy).not.toHaveBeenCalled();
      });

      it('calls on exited when the closing animations are complete', () => {
        onEnterSpy.calls.reset();

        result.close();
        MockNow.tick(delay);
        MockRaf.next();

        expect(onEnterSpy).not.toHaveBeenCalled();
        expect(onExitSpy).toHaveBeenCalled();
      });
    });
  });
});

describe('BaseModal', () => {
  const renderIntoDom = props => ReactDOM.render(<BaseModal {...props}/>, root);

  it('supports dialog className', () => {
    result = renderIntoDom({className: 'myModal', show: true});
    expect(findByClass(result, 'modal')).toHaveClass('myModal');
  });

  describe('when show is true', () => {
    beforeEach(() => {
      result = renderIntoDom({show: true, className: 'myModal', title: 'hey mr modal'});
    });

    it('shows the modal', () => {
      expect(findByClass(result, 'myModal')).toBeDefined();
    });

    it('shows the title', () => {
      expect(findByClass(result, 'modal-title')).toHaveText('hey mr modal');
    });

    it('renders the modal in a dialog with a scrim', () => {
      expect(findByClass(result, 'modal-backdrop')).toHaveClass(['fade', 'in']);
      const modal = findByClass(result, 'modal');
      expect(modal).toHaveClass(['fade', 'in']);
      expect(modal).toHaveCss({display: 'block'});
    });
  });

  describe('when show is false', () => {
    beforeEach(() => {
      result = renderIntoDom({show: false, className: 'myModal'});
    });

    it('hides the modal', () => {
      expect(findAllByClass(result, 'myModal')).toHaveLength(0);
    });
  });


  describe('onHide', () => {
    let onHide;

    beforeEach(() => {
      onHide = jasmine.createSpy('onHide');
    });

    it('is triggered when close button is clicked', () => {
      result = renderIntoDom({show: true, onHide, animation: false});
      $('.modal-close .btn').click();
      expect(onHide).toHaveBeenCalledWith(jasmine.anything(), jasmine.anything());
    });

    it('is not triggered when the modal content itself is clicked', () => {
      result = renderIntoDom({show: true, onHide, animation: false});
      $('.modal-dialog').click();
      expect(onHide).not.toHaveBeenCalled();

      $('.modal-content').click();
      expect(onHide).not.toHaveBeenCalled();
    });

    it('is triggered when the backdrop is clicked', () => {
      result = renderIntoDom({show: true, onHide, animation: false});
      $('.modal').click();
      expect(onHide).toHaveBeenCalledWith(jasmine.anything());
    });

    it('is triggered on esc key down', () => {
      result = renderIntoDom({show: true, onHide, animation: false});

      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('keydown', true, true);
      evt.keyCode = BaseModal.ESC_KEY;
      document.documentElement.dispatchEvent(evt);

      expect(onHide).toHaveBeenCalledWith(jasmine.anything());
    });

    it('is not triggered on esc key down if keyboard is false', () => {
      result = renderIntoDom({show: true, onHide, animation: false, keyboard: false});

      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('keydown', true, true);
      evt.keyCode = BaseModal.ESC_KEY;
      document.documentElement.dispatchEvent(evt);

      expect(onHide).not.toHaveBeenCalled();
    });

    it('cleans up keydown listeners', () => {
      result = renderIntoDom({show: true, onHide, animation: false});
      ReactDOM.unmountComponentAtNode(root);

      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('keydown', true, true);
      evt.keyCode = BaseModal.ESC_KEY;
      document.documentElement.dispatchEvent(evt);

      expect(onHide).not.toHaveBeenCalled();
    });
  });

  describe('acquireFocus', () => {
    beforeEach(() => {
      $('body').append('<input type="text" tabIndex="-1" class="i-was-here-first">');
      $('.i-was-here-first').focus();
      expect('.i-was-here-first').toBeFocused();
    });

    afterEach(() => {
      $('.i-was-here-first').remove();
    });

    it('steals focus on open when acquireFocus is true', () => {
      renderIntoDom({show: true, animation: false, acquireFocus: true});
      jasmine.clock().tick(1);
      expect('.modal').toBeFocused();
      expect('.i-was-here-first').not.toBeFocused();
    });

    it('does not steal focus on open when acquireFocus is false', () => {
      renderIntoDom({show: true, animation: false, acquireFocus: false});
      jasmine.clock().tick(1);
      expect('.modal').not.toBeFocused();
      expect('.i-was-here-first').toBeFocused();
    });
  });


  describe('sizing', () => {
    it('can set the size', () => {
      expect(findByClass(renderIntoDom({show: true, size: 'sm'}), 'modal-dialog')).toHaveClass('modal-sm');
      expect(findByClass(renderIntoDom({show: true, size: 'small'}), 'modal-dialog')).toHaveClass('modal-sm');
      expect(findByClass(renderIntoDom({show: true, size: 'lg'}), 'modal-dialog')).toHaveClass('modal-lg');
      expect(findByClass(renderIntoDom({show: true, size: 'large'}), 'modal-dialog')).toHaveClass('modal-lg');
    });
  });

  describe('when there is no document', () => {
    it('does not throw an exception when rendered', () => {
      expect(() => {
        renderIntoDom(<BaseModal show id="mr-modal" title="hey mr modal" getDocument={() => {}}/>, root);
      }).not.toThrow();
    });
  });
});
