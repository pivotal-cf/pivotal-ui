import markdownFileToComponent from './helpers/markdown_to_component';

const routes = {};

const collectRouteData = (category, directory, requireFunc) => fileName => {
  const json = requireFunc(fileName);
  const routeData = markdownFileToComponent({directory, fileName, json, category});
  routes[routeData.href] = routeData;
};

const requirePages = require.context('../docs', false, /\.md$/);
requirePages.keys().forEach(collectRouteData('pages', '', requirePages));
routes['/'] = {...routes['/getstarted']};

const requireComponents = require.context('../docs/components', false, /\.md$/);
requireComponents.keys().forEach(collectRouteData('components', 'components/', requireComponents));

const requireModifiers = require.context('../docs/modifiers', false, /\.md$/);
requireModifiers.keys().forEach(collectRouteData('modifiers', 'modifiers/', requireModifiers));

export const getRouteContent = (route = '') => {
  const firstRoutePart = route.split('/').filter(Boolean)[0] || '';
  return routes['/' + firstRoutePart] || routes['/404'];
};

export default routes;