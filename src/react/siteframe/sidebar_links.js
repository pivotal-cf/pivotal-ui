import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class SidebarLinks extends React.PureComponent {
  static propTypes = {
    links: PropTypes.array,
    renderLink: PropTypes.func,
    className: PropTypes.string
  };

  render() {
    const {links, renderLink, className} = this.props;
    return (
      <ul className={className}>
        {links.map((link, key) => (
          <li {...{key, className: classnames({'pui-sidebar-li-active': link.active})}}>
            <div className="pui-sidebar-li-content">{renderLink(link)}</div>
          </li>
        ))}
      </ul>
    );
  }
}