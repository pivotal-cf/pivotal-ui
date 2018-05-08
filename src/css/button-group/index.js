require('../common');
require('../buttons');
try {
  require('./button-group.css')
} catch (e) {
  require('./button-group.scss');
}