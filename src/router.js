import routes, {getRouteContent} from './routes';

const Router = {
  init(onRouteChange) {
    const navigate = newRoute => {
      document.getElementById('content').scrollTop = 0;
      window.history.pushState({}, '', newRoute);
      onRouteChange(newRoute, getRouteContent(newRoute));
    };

    window.addEventListener('popstate', evt => {
      navigate(evt.currentTarget.location.pathname);
    }, false);

    return {navigate};
  }
};

export default Router;