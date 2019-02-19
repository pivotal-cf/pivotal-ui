import React from 'react';
import {Link} from 'gatsby';
import '../../stylesheets/sidebar.scss';

const SidebarListItem = ({route, title, sections}) => (
  <li className="sg-sidebar__list-item">
    <Link
      activeClassName="sg-sidebar__list-item--active"
      to={route}>
      {title}
    </Link>
    {sections.length > 0 && (
      <ul className="sg-sidebar__list-item-sections" aria-label="page sections">
        {sections.map(section => (
          <li key={section.route}>
            <Link to={section.route}>{section.title}</Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const Sidebar = ({pages, groups}) => (
  <nav className="sg-sidebar" aria-label="pages">
    <ul className="sg-sidebar__list">
      {groups.map(group => {
        const pagesInGroup = pages.filter(page => page.group === group.id);

        return (
          <li className="sg-sidebar__group" key={group.id}>
            <div className="em-high mbl type-lg">{group.label}</div>
            <ul className="sg-sidebar__group-list" aria-label={group.label}>
              {pagesInGroup.map(page => <SidebarListItem {...page} key={page.route}/>)}
            </ul>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default Sidebar;
