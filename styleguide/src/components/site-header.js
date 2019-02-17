import React from 'react';
import {Link} from 'gatsby';
import {Input} from '../../../src/react/inputs';
import {Icon} from '../../../src/react/iconography';
import {siteMetadata} from '../../gatsby-config';
import '../../stylesheets/site-header.scss';

const SiteHeader = () => (
  <header className="sg-header">
    <Link to="/" className="sg-header__link">
      <Icon
        src="pivotal_ui_white"
        className="sg-header__logo"
      />
      <h1 className="type-white h3 sg-header__name">
        Pivotal <span className="em-high">UI</span>
      </h1>
    </Link>
    <div style={{flexGrow: 1}}/>
    <div className="pal mrl">v{siteMetadata.version}</div>
    <div>
      <Input
        className="sg-header__search"
        type="search"
        icon="search"
        placeholder="Search..."
        aria-label="Search style guide content"
      />
    </div>
  </header>
);

export default SiteHeader;
