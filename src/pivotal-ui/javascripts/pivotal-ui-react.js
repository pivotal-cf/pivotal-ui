global.$ = global.jQuery = require('jquery');
require('bootstrap');
require('modernizr');
require('prism');

require('./scale')();
require('./back-to-top')();

global.React = require('react');
global.TableSortable = require('./table-sortable.jsx');
