
$(document).ready(() => {
  var StyleguideNav = require('./styleguide-nav');

  React.render(
    <StyleguideNav navTree={nav} defaultLanguage={"react"} />,
    document.getElementById('styleguide-navbar')
  )
});