import React, {useState} from 'react';
import {Link} from 'gatsby';
import {Icon} from '../../../src/react/iconography';
import {BrandButton} from '../../../src/react/buttons';
import {siteMetadata} from '../../gatsby-config';
import SearchWrapper from './search-wrapper';
import SidebarWrapper from './sidebar-wrapper';
import '../../stylesheets/site-header.scss';

const SiteHeader = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sg-header">
      <Link to="/" className="sg-header__link" onClick={() => setShowMobileMenu(false)}>
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
      <div className="sg-header__search-container">
        <SearchWrapper/>
      </div>
      <div className="sg-header__mobile-menu-wrapper">
        <BrandButton
          className="sg-header__mobile-menu-btn"
          iconOnly
          icon={<Icon src={showMobileMenu ? 'close' : 'menu'}/>}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label={`${showMobileMenu ? 'hide' : 'show'} menu`}
        />
        {showMobileMenu && (
          <div className="sg-header__mobile-menu">
            <SidebarWrapper/>
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
