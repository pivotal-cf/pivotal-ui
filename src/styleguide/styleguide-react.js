
$(document).ready(() => {
  const React = global.React || require('react');

  const StyleguideNav = require('./styleguide-nav');
  const getComponentPath = require('./get-component-path');

  const {language, componentType} = getComponentPath(window.location.pathname);

  React.render(
    <StyleguideNav navTree={nav}
                   defaultLanguage={language}
                   defaultComponentType={componentType}/>,
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
