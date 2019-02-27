process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('@babel/register');
require('@babel/polyfill');

require('./tasks/css-build');
require('./tasks/react-build');
require('./tasks/build');
require('./tasks/release');