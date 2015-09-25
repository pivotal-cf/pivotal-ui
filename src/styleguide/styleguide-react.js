
$(document).ready(() => {
  var StyleguideNav = require('./styleguide-nav');

  React.render(
    <StyleguideNav navTree={nav} defaultLanguage={'React'} />,
    document.getElementById('styleguide-navbar')
  );

  const introNode = document.getElementById('styleguide-intro');
  if(introNode) {
    var IntroPage = require('./intro-page');

    React.render(
      <IntroPage> I'm the react intro </IntroPage>,
      introNode
    );
  }
});
