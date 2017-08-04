const footer = require('../readme-footer');

var readme = function(name, options={}) {
  const {description='', homepage='http://styleguide.pivotal.io'} = options;

  return `# pui-react-${name}
${description}

This component requires React

See the [Pivotal UI Styleguide](${homepage}) for fully rendered examples.

${footer()}`;
};

module.exports = readme;
