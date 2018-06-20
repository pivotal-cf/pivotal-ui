import '../spec_helper';
import * as Routes from '../../src/routes';
import Router from '../../src/helpers/router';

describe('Router', () => {
  beforeEach(() => {
    spyOn(window, 'addEventListener');
    spyOn(window, 'removeEventListener');
  });

  afterEach(() => Router.destroy());

  it('has undefined handlers before being initialized', () => {
    expect(Router.getHandlers()).toBeUndefined();
  });

  describe('init', () => {
    beforeEach(() => {
      Router.init();
    });

    it('initializes handlers to an empty array', () => {
      expect(Router.getHandlers()).toEqual([]);
    });

    it('adds a popstate event listener', () => {
      expect(window.addEventListener).toHaveBeenCalledWith('popstate', Router.onPopState, false);
    });
  });

  describe('destroy', () => {
    beforeEach(() => {
      Router.init();
      Router.destroy();
    });

    it('sets handlers to be undefined', () => {
      expect(Router.getHandlers()).toBeUndefined();
    });

    it('removes the popstate event listener', () => {
      expect(window.removeEventListener).toHaveBeenCalledWith('popstate', Router.onPopState);
    });
  });

  describe('onRouteChange before initialized', () => {
    let changeHandler;

    beforeEach(() => {
      changeHandler = jasmine.createSpy('changeHandler');
      spyOn(Router, 'init').and.callThrough();
      Router.onRouteChange(changeHandler);
    });

    it('initializes Router', () => {
      expect(Router.init).toHaveBeenCalledWith();
    });

    it('adds given handler to list of handlers', () => {
      expect(Router.getHandlers()).toEqual([changeHandler]);
    });
  });

  describe('onRouteChange after initialized', () => {
    let changeHandler;

    beforeEach(() => {
      changeHandler = jasmine.createSpy('changeHandler');
      Router.init();
      spyOn(Router, 'init').and.callThrough();
      Router.onRouteChange(changeHandler);
    });

    it('does not initialize Router', () => {
      expect(Router.init).not.toHaveBeenCalled();
    });

    it('adds given handler to list of handlers', () => {
      expect(Router.getHandlers()).toEqual([changeHandler]);
    });
  });

  describe('onPopState', () => {
    let evt;

    beforeEach(() => {
      evt = {currentTarget: {location: {pathname: '/hello'}}};
      spyOn(Router, 'navigate');
      Router.onPopState(evt);
    });

    it('calls Router.navigate with new pathname', () => {
      expect(Router.navigate).toHaveBeenCalledWith('/hello', true);
    });
  });

  describe('navigate with skipPushState = undefined', () => {
    let newRoute, newRouteContent, fakeContent, handler;

    beforeEach(() => {
      newRoute = '/hello';
      newRouteContent = {route: newRoute};
      fakeContent = {scrollTop: 200};
      handler = jasmine.createSpy('handler');
      spyOn(Routes, 'getRouteContent').and.returnValue(newRouteContent);
      spyOn(document, 'getElementById').and.returnValue(fakeContent);
      spyOn(window.history, 'pushState');
      Router.onRouteChange(handler);
      Router.navigate(newRoute);
    });

    it('gets route content for new route', () => {
      expect(Routes.getRouteContent).toHaveBeenCalledWith(newRoute);
    });

    it('sets scrollTop to 0 on #content element', () => {
      expect(document.getElementById).toHaveBeenCalledWith('content');
      expect(fakeContent.scrollTop).toBe(0);
    });

    it('pushes new state onto history', () => {
      expect(window.history.pushState).toHaveBeenCalledWith({}, '', newRoute);
    });

    it('calls handlers with new route and route content', () => {
      expect(handler).toHaveBeenCalledWith(newRoute, newRouteContent);
    });
  });

  describe('navigate with skipPushState = true', () => {
    let newRoute, newRouteContent, fakeContent, handler;

    beforeEach(() => {
      newRoute = '/hello';
      newRouteContent = {route: newRoute};
      fakeContent = {scrollTop: 200};
      handler = jasmine.createSpy('handler');
      spyOn(Routes, 'getRouteContent').and.returnValue(newRouteContent);
      spyOn(document, 'getElementById').and.returnValue(fakeContent);
      spyOn(window.history, 'pushState');
      Router.onRouteChange(handler);
      Router.navigate(newRoute, true);
    });

    it('gets route content for new route', () => {
      expect(Routes.getRouteContent).toHaveBeenCalledWith(newRoute);
    });

    it('sets scrollTop to 0 on #content element', () => {
      expect(document.getElementById).toHaveBeenCalledWith('content');
      expect(fakeContent.scrollTop).toBe(0);
    });

    it('does not push new state onto history', () => {
      expect(window.history.pushState).not.toHaveBeenCalled();
    });

    it('calls handlers with new route and route content', () => {
      expect(handler).toHaveBeenCalledWith(newRoute, newRouteContent);
    });
  });
});