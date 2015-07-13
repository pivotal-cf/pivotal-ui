global.$ = global.jQuery = require('jquery');
global._ = require('lodash');
require('bootstrap');

require('pui-prismjs');

require('./scale')();
require('pui-react-back-to-top/jquery-plugin');

global.React = require('react/addons');

global.UI = require('./components.js');
