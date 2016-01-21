const GITHUB = 'https://github.com/pivotal-cf/pivotal-ui';
const NPM = 'https://www.npmjs.com/browse/keyword/pivotal%20ui%20modularized';

var readme = function(name, options={}) {
  const {description='', homepage='http://styleguide.pivotal.io'} = options;

  return [
    `# pui-react-${name}`,
    description,
    `Pivotal UI ([GitHub](${GITHUB}), [npm](${NPM})) is a collection of [React](https://facebook.github.io/react/) and CSS components for rapidly building and prototyping UIs.`,
    `This component requires React`,
    `See the [Pivotal UI Styleguide](${homepage}) for fully rendered examples.`,
    `*****************************************\n\n(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.\n`
  ].join('\n\n');
};

module.exports = readme;
