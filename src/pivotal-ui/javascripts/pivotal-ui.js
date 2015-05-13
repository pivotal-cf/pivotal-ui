global.$ = global.jQuery = require('jquery');
global._ = require('lodash');
require('bootstrap');
require('modernizr');

require('prismjs');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-css');
require('prismjs/components/prism-css-extras');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-java');
require('prismjs/components/prism-php');
require('prismjs/components/prism-php-extras');
require('prismjs/components/prism-coffeescript');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-python');
require('prismjs/components/prism-http');
require('prismjs/components/prism-ruby');
require('prismjs/components/prism-go');
require('prismjs/plugins/line-highlight/prism-line-highlight');
require('prismjs/plugins/line-numbers/prism-line-numbers');

require('./scale')();
require('pui-react-back-to-top/jquery-plugin');
