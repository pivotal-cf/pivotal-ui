import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {SidebarLinks} from './sidebar_links';

export class Sidebar extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    primaryLinks: PropTypes.array.isRequired,
    secondaryLinks: PropTypes.array,
    renderLink: PropTypes.func.isRequired
  };

  render() {
    const {className, primaryLinks, secondaryLinks, renderLink} = this.props;
    return (
      <nav className={classnames('pui-siteframe-sidebar', className)}>
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
