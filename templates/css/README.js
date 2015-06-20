function defaultDescription(name) {
  return [
    `A CSS ${name} component that can be installed via this npm package. The package provides all of the`,
    'CSS you need to use the component.'
  ].join('\n');
}

function usageSection(usage, name, homepage) {
  if (usage.length) {
    return [
      '',
      '## Usage',
      '',
      usage,
      '',
      `You can find more examples of the ${name} component in the [pui style guide](${homepage})`
    ].join('\n');
  }
  else {
    return '';
  }
}

const readmeTemplate = function(name, options = {}) {
  const {additionalIntro='',
    usage='',
    description=defaultDescription(name),
    homepage='http://styleguide.pivotal.io'} = options;

  return [
    `# pui-css-${name}`,
    '',
    description,
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
    usageSection(usage, name, homepage),
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
