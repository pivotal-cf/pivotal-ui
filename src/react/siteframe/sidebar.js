import React from 'react';
import PropTypes from 'prop-types';
import {SidebarLinks} from './sidebar_links';

export class Sidebar extends React.PureComponent {
  static propTypes = {
    primaryLinks: PropTypes.array.isRequired,
    secondaryLinks: PropTypes.array,
    renderLink: PropTypes.func.isRequired
  };

  render() {
    const {primaryLinks, secondaryLinks, renderLink} = this.props;
    return (
      <nav className="pui-siteframe-sidebar">
        <SidebarLinks {...{
          links: primaryLinks,
          renderLink,
          className: 'pui-sidebar-primary-links'
        }}/>
        {secondaryLinks && <SidebarLinks {...{
          links: secondaryLinks,
          renderLink,
          className: 'pui-sidebar-secondary-links'
        }}/>}
      </nav>
    );
  }
}
