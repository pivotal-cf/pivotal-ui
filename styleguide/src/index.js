require('babel-polyfill');

global.$ = global.jQuery = require('jquery');
global._ = require('lodash');

global.React = require('react');
global.ReactDOM = require('react-dom');

require('pui-react-back-to-top/jquery-plugin');

require('./styleguide');
require('./styleguide-react');
require('./pivotal-ui-components');
