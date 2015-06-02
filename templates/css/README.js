var readmeTemplate = function(name, usage, options = {}) {
  var {additionalIntro='', homepage='http://styleguide.pivotal.io'} = options;

  return [
    `# ${name}`,
    '',

    `A CSS ${name} component that can be installed via this npm package. The package provides all of the`,
    'CSS you need to use the component.',
    '',
    additionalIntro,
    '',
    '## Installation',
    '',
    'To install the package, from the command line, type:',
    '',
    '\`\`\`',
    `npm install pui-css-${name}`,
    '\`\`\`',
    '',
    '## Usage',
    '',
    usage,
    '',
    `You can find more examples of the ${name} component in the [pui style guide](${homepage})`,
    '',
    '*****************************************',
    '',
    'This is a component of Pivotal UI. It is a Pivotal specific implementation of Bootstrap.',
    '',
    '[Styleguide](http://styleguide.pivotal.io)',
    '[Github](https://github.com/pivotal-cf/pivotal-ui)',
    '',
    '(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.'
  ].join('\n');
};

module.exports = readmeTemplate;