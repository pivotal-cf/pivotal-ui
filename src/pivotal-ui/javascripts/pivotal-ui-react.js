global.$ = global.jQuery = require('jquery');
require('bootstrap');
require('modernizr');
require('prism');

require('./scale')();
require('./back-to-top')();

global.React = require('react');
global.TableSortable = global.React.createFactory(require('./table-sortable.jsx'));

global.Heading = require('./typography.jsx').Heading;

global.AlternateH1 = require('./typography.jsx').AlternateH1;
global.AlternateH2 = require('./typography.jsx').AlternateH2;
global.AlternateH3 = require('./typography.jsx').AlternateH3;

global.DefaultH1 = require('./typography.jsx').DefaultH1;
global.DefaultH2 = require('./typography.jsx').DefaultH2;
global.DefaultH3 = require('./typography.jsx').DefaultH3;

global.BasePane = require('./panes.jsx').BasePane;
global.Pane = require('./panes.jsx').Pane;

global.UIButton = require('./buttons.jsx').UIButton;
