require('./browser-support');

global.$ = global.jQuery = require('jquery');
global._ = require('lodash');
require('bootstrap');
require('prism');

require('./scale')();
require('./back-to-top')();
