process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./tasks/css_components');
require('./tasks/react_components');
require('./tasks/dev');
require('./tasks/release');
