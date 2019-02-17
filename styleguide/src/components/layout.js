import React from 'react';
import Main from './main';
import SiteHeader from './site-header';
import SkipToContent from './skip-to-content';
import '../../stylesheets/layout.scss';
import '../../stylesheets/prism-theme.scss';

const requirePuiCss = require.context('../../../src/css/', true, /\.scss$/);
requirePuiCss.keys().map(requirePuiCss);

const Layout = ({children}) => (
  <div className="sg-wrapper">
    <SkipToContent/>
    <SiteHeader/>
    <Main>{children}</Main>
  </div>
);

export default Layout;
