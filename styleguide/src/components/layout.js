import React from 'react';
import {Link, StaticQuery, graphql} from 'gatsby';
import {Icon} from '../../../src/react/iconography';
import {Grid, FlexCol} from '../../../src/react/flex-grids';
import {Input} from '../../../src/react/inputs';
import Main from './main';
import Header from './header';
import '../../stylesheets/layout.scss';
import '../../stylesheets/prism-theme.scss';

const requirePuiCss = require.context('../../../src/css/', true, /\.scss$/);
requirePuiCss.keys().map(requirePuiCss);

const SiteHeaderQuery = graphql`
  query SiteHeaderQuery {
    site { siteMetadata { title version } }
  }
`;

const Layout = ({children}) => (
  <StaticQuery
    query={SiteHeaderQuery}
    render={data => (
      <div className="sg-wrapper">
        <Header siteMetadata={data.siteMetadata}/>
        <Main>{children}</Main>
      </div>
    )}
  />
);

export default Layout;
