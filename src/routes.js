import markdownFileToComponent from './helpers/markdown_to_component';

const requirePages = require.context('../docs', true, /\.md$/);

const routes = requirePages.keys().reduce((memo, fileName) => {
  const json = requirePages(fileName);
  const routeData = markdownFileToComponent({fileName, json});
  return {...memo, [routeData.route]: routeData};
}, {});

routes['/'] = {...routes['/getstarted']};

export const getRouteContent = (route = '') => {
  const firstRoutePart = route.split('/').filter(Boolean)[0] || '';
  return routes['/' + firstRoutePart] || routes['/404'];
};

export default routes;