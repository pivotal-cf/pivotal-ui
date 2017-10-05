require('babel-polyfill');

const specs = require.context('.', true, /_spec\.js/);
specs.keys().forEach(specs);