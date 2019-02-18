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

const year = new Date().getFullYear();

const Layout = ({children}) => (
  <div className="sg-wrapper">
    <SkipToContent/>
    <SiteHeader/>
    <Main>
      {children}
      <footer className="mtxxxl pvxl border-top">
        © {year} <a href="https://pivotal.io" target="_blank">Pivotal Software</a>, Inc. All Rights Reserved.
        <span className="pln">
          <span className="mll">
            <a href="https://pivotal.io/privacy-policy" target="_blank">Privacy Policy</a>
          </span>
          <span className="mll">
            <a href="https://pivotal.io/terms-of-use" target="_blank">Terms of Use</a>
          </span>
          <span className="mll" id="teconsent"/>
        </span>
      </footer>
    </Main>
  </div>
);

export default Layout;
