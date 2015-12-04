global.$ = global.jQuery = require('jquery');
global._ = require('lodash');
require('../../../node_modules/bootstrap/js/tooltip');

require('pui-prismjs');

require('./scale')();
require('pui-react-back-to-top/jquery-plugin');

global.React = require('react');
global.ReactDOM = require('react-dom');

import UI from './components.js';

_.each(UI, function(value, key) {
    global[key] = value;
});
