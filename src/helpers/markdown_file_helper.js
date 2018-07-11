export default {
  process: ({processor, json}) => processor.stringify(processor.runSync(json)),

  getRoute: fileName => {
    const pathElements = fileName.replace(/^\./, '').replace(/\.md$/i, '').split('/');
    pathElements[pathElements.length - 1] = pathElements[pathElements.length - 1].replace(/^\d+\./, '');
    return pathElements.join('/').toLowerCase();
  },

  getTabHeaderIndex: file => parseInt(/^-?\d+/.exec(file.split('/').pop()), 10) || -1,

  getParentTitle: file => {
    const parts = file.split('/');
    return parts[parts.length - 2].replace(/_/g, ' ');
  },

  getPageTitle: file => file.split('/').pop().replace(/^-?\d+\./, '').replace(/_/g, ' ').replace(/\.md$/i, ''),

  getTabRoutes: (routes, currentRoute) => {
    const directoryPath = currentRoute.substring(0, currentRoute.lastIndexOf('/'));
    return Object.entries(routes)
      .filter(entry => entry[0].startsWith(directoryPath))
      .sort((a, b) => a[1].tabHeaderIndex - b[1].tabHeaderIndex)
      .map(entry => entry[0]);
  }
};