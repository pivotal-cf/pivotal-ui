import markdownFileToComponent from './helpers/markdown_to_component';

const routes = {};

const collectRouteData = (category, requireFunc) => file => {
  const json = requireFunc(file);
  const {pageMetadata, PageComponent} = markdownFileToComponent(file, json, category);
  const route = file.toLowerCase().replace(/\.md$/, '').split('/').pop();

  routes[route] = {file, category, href: route, pageMetadata, PageComponent};
};

const requirePages = require.context('../docs', false, /\.md$/);
requirePages.keys().forEach(collectRouteData('page', requirePages));

const requireComponents = require.context('../docs/components', false, /\.md$/);
requireComponents.keys().forEach(collectRouteData('component', requireComponents));

const requireModifiers = require.context('../docs/modifiers', false, /\.md$/);
requireModifiers.keys().forEach(collectRouteData('modifier', requireModifiers));

routes[''] = {...routes.getstarted};

export default routes;