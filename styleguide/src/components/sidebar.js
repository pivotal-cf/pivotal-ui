import React from 'react';
import {Link} from 'gatsby';
import '../../stylesheets/sidebar.scss';

const SidebarListItem = page => (
  <li className="sg-sidebar__list-item">
    <Link
      activeClassName="sg-sidebar__list-item--active"
      to={page.route}>
      {page.title}
    </Link>
    {page.sections.length > 0 && (
      <div className="sg-sidebar__list-item-sections">
        {page.sections.map(section => (
          <div key={section.route}>
            <Link to={section.route}>{section.title}</Link>
          </div>
        ))}
      </div>
    )}
  </li>
);

const Sidebar = ({pages, groups}) => (
  <nav className="sg-sidebar">
    <ul className="sg-sidebar__list">
      {groups.map(group => {
        const pagesInGroup = pages.filter(page => page.group === group.id);

        return (
          <li className="sg-sidebar__group" key={group.id}>
            <div className="em-high mbm">{group.label}</div>
            <ul className="sg-sidebar__group-list">
              {pagesInGroup.map(page => <SidebarListItem {...page} key={page.route}/>)}
            </ul>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default Sidebar;
