var packageTemplate = function(name, overrides) {
  const packageJsonContents = Object.assign({
    name: `pui-css-${name}`,
    style: `${name}.css`,
    version: '0.0.1',
    description: `${name} css component for Pivotal UI based on Bootstrap`,
    repository: {
      type: 'git',
      url: 'https://github.com/pivotal-cf/pivotal-ui.git'
    },
    keywords: [
      'bootstrap',
      'pivotal ui',
      'pivotal ui modularized',
      'css'
    ],
    author: 'Pivotal Software, Inc',
    license: 'MIT',
    bugs: {
      url: "https://github.com/pivotal-cf/pivotal-ui/issues"
    },
    homepage: "https://github.com/pivotal-cf/pivotal-ui"
  }, overrides);

  if (!packageJsonContents.style) {
    delete packageJsonContents.style;
  }

  return JSON.stringify(packageJsonContents, null, 2);
};

module.exports = packageTemplate;
