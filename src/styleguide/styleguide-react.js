
$(document).ready(() => {
  var StyleguideNav = require('./styleguide-nav');

  React.render(
    <StyleguideNav navTree={nav} defaultLanguage={'React'} />,
    document.getElementById('styleguide-navbar')
  )
});
