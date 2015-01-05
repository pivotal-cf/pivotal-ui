require('./browser-support');

global.$ = global.jQuery = require('jquery');
global._ = require('lodash');
require('bootstrap');
require('prism');

require('./scale')();
require('./back-to-top')();

global.React = require('react');
global.TableSortable = global.React.createFactory(require('./table-sortable.jsx'));

global.DefaultH1 = require('./typography.jsx').DefaultH1;
global.DefaultH2 = require('./typography.jsx').DefaultH2;
global.DefaultH3 = require('./typography.jsx').DefaultH3;
global.DefaultH4 = require('./typography.jsx').DefaultH4;
global.DefaultH5 = require('./typography.jsx').DefaultH5;
global.DefaultH6 = require('./typography.jsx').DefaultH6;

global.AlternateH1 = require('./typography.jsx').AlternateH1;
global.AlternateH2 = require('./typography.jsx').AlternateH2;
global.AlternateH3 = require('./typography.jsx').AlternateH3;
global.AlternateH4 = require('./typography.jsx').AlternateH4;
global.AlternateH5 = require('./typography.jsx').AlternateH5;
global.AlternateH6 = require('./typography.jsx').AlternateH6;

global.MarketingH1 = require('./typography.jsx').MarketingH1;
global.MarketingH2 = require('./typography.jsx').MarketingH2;
global.MarketingH3 = require('./typography.jsx').MarketingH3;
global.MarketingH4 = require('./typography.jsx').MarketingH4;
global.MarketingH5 = require('./typography.jsx').MarketingH5;
global.MarketingH6 = require('./typography.jsx').MarketingH6;

global.Heading = require('./typography.jsx').Heading;

global.BasePane = require('./panes.jsx').BasePane;
global.Pane = require('./panes.jsx').Pane;

global.UIButton = require('./buttons.jsx').UIButton;
global.DefaultButton = require('./buttons.jsx').DefaultButton;
global.DefaultAltButton = require('./buttons.jsx').DefaultAltButton;
global.PrimaryButton = require('./buttons.jsx').PrimaryButton;
global.LowlightButton = require('./buttons.jsx').LowlightButton;
global.DangerButton = require('./buttons.jsx').DangerButton;
global.HighlightButton = require('./buttons.jsx').HighlightButton;
global.HighlightAltButton = require('./buttons.jsx').HighlightAltButton;

global.SearchInput = require('./inputs.jsx').SearchInput;

global.Divider = require('./dividers.jsx').Divider;
global.DividerInverse = require('./dividers.jsx').DividerInverse;

global.Row = require('./grids.jsx').Row;
global.Col = require('./grids.jsx').Col;

global.Media = require('./media.jsx').Media;

global.PivnetHomepage = require('./pivnet_homepage.jsx').PivnetHomepage;

global.Panel = require('./panels.jsx').Panel;
global.SimplePanel = require('./panels.jsx').SimplePanel;
global.ClickablePanel = require('./panels.jsx').ClickablePanel;
global.ClickableAltPanel = require('./panels.jsx').ClickableAltPanel;
global.BasicPanel = require('./panels.jsx').BasicPanel;
global.ShadowPanel = require('./panels.jsx').ShadowPanel;
global.HighlightPanel = require('./panels.jsx').HighlightPanel;
