import React from 'react';
import {Link, StaticQuery, graphql} from 'gatsby';
import {Siteframe} from '../../../src/react/siteframe';
import {Icon} from '../../../src/react/iconography';
import {FlexCol} from '../../../src/react/flex-grids';
import {Input} from '../../../src/react/inputs';
import Main from './main';
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
      <div className="styleguide-siteframe-wrapper">
        <Siteframe {...{
          headerProps: {
            companyName: 'Pivotal',
            productName: 'UI',
            logo: (
              <Link className="styleguide-header-logo" to="/">
                <Icon src="pivotal_ui_white" className="styleguide-header-icon"/>
              </Link>
            ),
            cols: [
              <FlexCol/>,
              <FlexCol fixed className="prm">
                v{data.site.siteMetadata.version}
              </FlexCol>,
              <FlexCol fixed className="phl">
                <Input {...{
                  icon: 'search',
                  type: 'search',
                  placeholder: 'Search',
                  style: {width: '240px'}
                }}/>
              </FlexCol>
            ]
          },
          children: <Main>{children}</Main>
        }}/>
      </div>
    )}
  />
);

export default Layout;
