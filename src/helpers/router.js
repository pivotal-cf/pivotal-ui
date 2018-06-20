import {getRouteContent} from '../routes';

let handlers;

const Router = {
  init() {
    handlers = [];
    window.addEventListener('popstate', Router.onPopState, false);
  },

  destroy() {
    handlers = undefined;
    window.removeEventListener('popstate', Router.onPopState);
  },

  onRouteChange(callback) {
    if (!handlers) Router.init();
    handlers.push(callback);
  },

  onPopState(evt) {
    Router.navigate(evt.currentTarget.location.pathname, true);
  },

  navigate(newRoute, skipPushState) {
    const newRouteContent = getRouteContent(newRoute);
    document.getElementById('content').scrollTop = 0;
    skipPushState || window.history.pushState({}, '', newRoute);
    handlers.forEach(handler => handler(newRoute, newRouteContent));
  },

  getHandlers() {
    return handlers;
  }
};

export default Router;