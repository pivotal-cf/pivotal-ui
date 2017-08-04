const footer = require('../readme-footer');

function defaultDescription(name) {
  return `A CSS ${name} component that can be installed via this npm package.
This package provides all of the CSS you need to use the component.`;
}

function usageSection(usage, name, homepage) {
  if (usage.length) {
    return `
## Usage

${usage}

You can find more examples of the ${name} component in the [pui style guide](${homepage})`;
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

  return `# pui-css-${name}

${description}

${additionalIntro}

## Installation

To install the package from the command line:

\`\`\`
npm install pui-css-${name}
\`\`\`
${usageSection(usage, name, homepage)}

${footer()}`;
};

module.exports = readmeTemplate;
