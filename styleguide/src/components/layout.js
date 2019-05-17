import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import SiteHeader from './site-header';
import SkipToContent from './skip-to-content';
import '../../stylesheets/layout.scss';
import '../../stylesheets/prism-theme.scss';

const requirePuiCss = require.context('../../../src/css/', true, /\.scss$/);
requirePuiCss
  .keys()
  .map(requirePuiCss);

const requirePuiReact = require.context('../../../src/react/', true, /index\.js$/);
const puiModules = requirePuiReact
  .keys()
  .map(file => Object.entries(requirePuiReact(file)));

if (typeof window !== 'undefined') {
  window.React = React;
  window.ReactDOM = ReactDOM;

  puiModules.forEach(puiModule =>
    puiModule.forEach(([key, value]) =>
      window[key] = value));
}


const Layout = ({children}) => (
  <div className="sg-wrapper">
    <SkipToContent/>
    <SiteHeader/>
    <Main>
      {children}
    </Main>
  </div>
);

export default Layout;
