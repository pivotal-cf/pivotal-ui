var packageTemplate = function(name, ...overrides) {
  return JSON.stringify(Object.assign({
    name: `pui-react-${name}`,
    version: '0.0.1',
    description: name,
    main: `${name}.js`,
    repository: {
      type: 'git',
      url: 'https://github.com/pivotal-cf/pivotal-ui.git'
    },
    keywords: [
      'bootstrap',
      'react',
      'pivotal ui',
      'pivotal ui modularized'
    ],
    author: 'Pivotal Software, Inc',
    license: 'MIT',
    bugs: {
      url: "https://github.com/pivotal-cf/pivotal-ui/issues"
    },
    homepage: "https://github.com/pivotal-cf/pivotal-ui",
    peerDependencies: {
      react: '^0.13.0'
    }
  }, ...overrides), null, 2);
};

module.exports = packageTemplate;
