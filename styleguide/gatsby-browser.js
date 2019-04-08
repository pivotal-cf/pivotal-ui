const React = require('react');
const smoothscroll = require('smoothscroll-polyfill');
const Layout = require('./src/components/layout').default;

exports.wrapPageElement = ({element, props}) => {
  return <Layout {...props}>{element}</Layout>;
};

exports.onRouteUpdate = () => {
  const main = document.getElementById('main');

  if (main) {
    main.scrollTo(0, 0);
    main.focus();
  }
};

exports.onClientEntry = () => {
  smoothscroll.polyfill();
};