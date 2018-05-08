require('../typography');
try {
  require('./lists.css');
} catch (e) {
  require('./lists.scss');
}