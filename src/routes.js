import markdownFileToComponent from './helpers/markdown_to_component';

const requirePages = require.context('../docs', true, /\.md$/);

const routes = requirePages.keys().reduce((memo, fileName) => {
  const json = requirePages(fileName);
  const routeContent = markdownFileToComponent({fileName, json});
  return {...memo, [routeContent.route]: routeContent};
}, {});

const defaultRoute = '/get-started';
routes['/'] = {...routes[defaultRoute], route: '/'};

export const getRouteContent = (route = '') => {
  const firstRoutePart = route.split('/').filter(Boolean)[0] || '';
  return routes['/' + firstRoutePart] || routes['/404'];
};

export const routeData = Object.values(routes).sort((a, b) => {
  const aTitle = (a.pageMetadata.title || '').toLowerCase();
  const bTitle = (b.pageMetadata.title || '').toLowerCase();
  return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
});

export default routes;