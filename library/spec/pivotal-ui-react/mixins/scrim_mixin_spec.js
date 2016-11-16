require('../spec_helper');

describe('ScrimMixin', () => {
  let Component, scrimClickSpy, subject;

  function click(element) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    element.dispatchEvent(event);
    return event;
  }

  beforeEach(() => {
    const mixin = require('pui-react-mixins');
    const ScrimMixin = require('../../../src/pivotal-ui-react/mixins/mixins/scrim_mixin');
    scrimClickSpy = jasmine.createSpy('scrimClick');
    class Klass extends mixin(React.Component).with(ScrimMixin) {
      render() { return <div className="component"/>; }

      scrimClick = scrimClickSpy;
    }
    Component = Klass;
    subject = ReactDOM.render(<Component/>, root);
  });

  describe('when disable scrim is true', () => {
    beforeEach(() => {
      subject::setProps({disableScrim: true});
    });

    describe('when not clicking on the component', () => {
      beforeEach(() => {
        click(document.documentElement);
      });

      it('does not call scrim click', () => {
        expect(scrimClickSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('when clicking', () => {
    describe('on the component', () => {
      beforeEach(() => {
        click(document.querySelector('.component'));
      });

      it('does not call scrim click', () => {
        expect(scrimClickSpy).not.toHaveBeenCalled();
      });
    });

    describe('anywhere but the component', () => {
      beforeEach(() => {
        click(document.documentElement);
      });

      it('calls scrim click', () => {
        expect(scrimClickSpy).toHaveBeenCalled();
      });
    });
  });

  describe('for scrimInterceptClick', () => {
    describe('when it is false and not clicking on the component', () => {
      let stopPropagationSpy;
      beforeEach(() => {
        stopPropagationSpy = spyOn(Event.prototype, 'stopPropagation').and.callThrough();
        subject::setProps({scrimInterceptClick: false});
        click(document.documentElement);
      });

      it('calls scrim click', () => {
        expect(scrimClickSpy).toHaveBeenCalled();
      });

      it('does not stop propagation', () => {
        expect(stopPropagationSpy).not.toHaveBeenCalled();
      });
    });

    describe('when it is true and not clicking on the component', () => {
      let stopPropagationSpy;
      beforeEach(() => {
        stopPropagationSpy = spyOn(Event.prototype, 'stopPropagation').and.callThrough();
        subject::setProps({scrimInterceptClick: true});
        click(document.documentElement);
      });

      it('calls scrim click', () => {
        expect(scrimClickSpy).toHaveBeenCalled();
      });

      it('stops propagation', () => {
        expect(stopPropagationSpy).toHaveBeenCalled();
      });
    });
  });
});