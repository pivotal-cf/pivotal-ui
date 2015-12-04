const GITHUB = 'https://github.com/pivotal-cf/pivotal-ui-react';
const NPM = 'https://www.npmjs.com/browse/keyword/pivotal%20ui%20modularized';

var readme = function(name, docs, options={}) {
  const {description='', homepage='http://styleguide.pivotal.io'} = options;

  return [
    `# pui-react-${name}`,
    description,
    `Pivotal UI React ([GitHub](${GITHUB}), [npm](${NPM})) is a collection of [React](https://facebook.github.io/react/) components for rapidly building and prototyping UIs.`,
    `This component requires React v0.13`,
    `See the [Pivotal UI Styleguide](${homepage}) for fully rendered examples.`,
    docs,
    `*****************************************\n\n(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.\n`
  ].join('\n\n');
}

module.exports = readme;