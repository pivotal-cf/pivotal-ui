import React from 'react';
import ReactDOM from 'react-dom';
import {setProps} from '../../support/jest-helpers';
import {useBoundingClientRect} from '../../../src/react/mixins/components/bounding_client_rect';

jest.mock('raf', () => callback => callback());

describe('BoundingClientRect', () => {
  const width = 100;
  const height = 200;

  let Klass, subject, resizeSpy, domNode;

  beforeEach(() => {
    domNode = {
      getBoundingClientRect: jest.fn(() => ({width: 100, height: 200}))
    };

    jest.spyOn(ReactDOM, 'findDOMNode').mockReturnValue(domNode);

    Klass = class extends React.Component {
      render() {
        return (<div className="klass" style={{width, height}}/>);
      }
    };

    jest.spyOn(Klass.prototype, 'render').mockImplementation(function() {
      return this.props.children;
    });

    const Component = useBoundingClientRect(Klass);
    subject = ReactDOM.render(<Component/>, root);
    resizeSpy = spyOn(subject, 'resize').and.callThrough();
  });

  it('renders the component with a bounding rect and container', () => {
    expect(Klass).toHaveBeenRenderedWithProps({
      container: domNode,
      boundingClientRect: jasmine.any(Object),
      containerReady: jasmine.any(Object)
    });
  });

  describe('containerReady', () => {
    describe('when some time has passed', () => {
      it('returns a promise with the container', async () => {
        const containerReadySpy = jasmine.createSpy('containerReady');
        await subject.state.containerReady.then(containerReadySpy);
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
      expect(() => ReactDOM.unmountComponentAtNode(root)).not.toThrow();
    });
  });

  describe('when a window resize event is triggered', () => {
    describe('when the bounding rect changes', () => {
      const width = 200;
      const height = 400;

      beforeEach(() => {
        Klass.prototype.render.mockClear();
        domNode.getBoundingClientRect = jest.fn(() => ({width, height}));
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      });

      it('re-renders the component', () => {
        expect(Klass).toHaveBeenRendered();
      });
    });

    describe('when the bounding rect does not change', () => {
      let boundingClientRect;

      beforeEach(() => {
        boundingClientRect = subject.props.boundingClientRect;
        Klass.prototype.render.mockClear();
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      });

      it('does not re-renders the component', () => {
        expect(Klass).not.toHaveBeenRendered();
      });

      it('does not create a different bounding client rect', () => {
        expect(subject.props.boundingClientRect).toBe(boundingClientRect);
      });
    });
  });
});
