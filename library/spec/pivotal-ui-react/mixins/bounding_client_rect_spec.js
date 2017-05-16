import '../spec_helper';
import {useBoundingClientRect} from 'pui-react-mixins/components/bounding_client_rect';

describe('BoundingClientRect', () => {
  const width = 100;
  const height = 200;
  let Klass, subject, resizeSpy;
  beforeEach(() => {
    class Base extends React.Component {
      render() {
        return (<div className="klass" style={{width, height}}/>);
      }
    }
    spyOn(Base.prototype, 'render').and.callThrough();
    Klass = Base;
    const Component = useBoundingClientRect(Klass);
    subject = ReactDOM.render(<Component/>, root);
    resizeSpy = spyOn(subject, 'resize').and.callThrough();
  });

  it('renders the component with a bounding rect and container', () => {
    expect(Klass).toHaveBeenRenderedWithProps({container: $('.klass')[0], boundingClientRect: jasmine.any(Object), containerReady: jasmine.any(Promise)});
  });

  describe('containerReady', () => {
    describe('when some time has passed', () => {
      beforeEach(() => {
        MockNextTick.next();
      });

      it('returns a promise with the container', () => {
        const containerReadySpy = jasmine.createSpy('containerReady');
        subject.state.containerReady.then(containerReadySpy);
        MockPromises.tick();
        expect(containerReadySpy).toHaveBeenCalledWith(subject.state.container);
      });
    });
  });

  describe('when the props change', () => {
    beforeEach(() => {
      subject::setProps({someProp: 'changed'});
    });

    it('calls resize', () => {
      expect(resizeSpy).toHaveBeenCalled();
    });

    it('does not do call forceUpdate if unmounted', () => {
      ReactDOM.render(<div/>, root);
      expect(() => MockRaf.next()).not.toThrow();
    });
  });

  describe('when a window resize event is triggered', () => {
    describe('when the bounding rect changes', () => {
      const width = 200;
      const height = 400;
      beforeEach(() => {
        Klass.prototype.render.calls.reset();
        const el = ReactDOM.findDOMNode(subject);
        $(el).css({width, height});
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
        MockRaf.next();
      });

      it('re-renders the component', () => {
        expect(Klass.prototype.render).toHaveBeenCalled();
      });
    });

    describe('when the bounding rect does not change', () => {
      let boundingClientRect;
      beforeEach(() => {
        boundingClientRect = subject.props.boundingClientRect;
        Klass.prototype.render.calls.reset();
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
        MockRaf.next();
      });

      it('does not re-renders the component', () => {
        expect(Klass.prototype.render).not.toHaveBeenCalled();
      });

      it('does not create a different bounding client rect', () => {
        expect(subject.props.boundingClientRect).toBe(boundingClientRect);
      });
    });
  });
});
