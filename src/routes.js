import markdownFileToComponent from './helpers/markdown_to_component';

const routes = {};

const collectRouteData = (category, directory, requireFunc) => shortFilePath => {
  const route = '/' + shortFilePath.toLowerCase().replace(/\.md$/, '').split('/').pop().split('.').join('/');
  const json = requireFunc(shortFilePath);
  const file = directory + shortFilePath.replace(/^\.\//, '');
  const {pageMetadata, PageComponent} = markdownFileToComponent({file, route, json, category});

  routes[route] = {file, category, href: route, pageMetadata, PageComponent};
};

const requirePages = require.context('../docs', false, /\.md$/);
requirePages.keys().forEach(collectRouteData('pages', '', requirePages));

const requireComponents = require.context('../docs/components', false, /\.md$/);
requireComponents.keys().forEach(collectRouteData('components', 'components/', requireComponents));

const requireModifiers = require.context('../docs/modifiers', false, /\.md$/);
requireModifiers.keys().forEach(collectRouteData('modifiers', 'modifiers/', requireModifiers));

routes['/'] = {...routes['/getstarted']};

export const getRouteContent = route => routes[route] || routes['/404'];

export default routes;