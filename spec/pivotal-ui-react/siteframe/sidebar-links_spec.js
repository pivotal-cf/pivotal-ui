import '../spec_helper';
import {SidebarLinks} from '../../../src/react/siteframe/sidebar-links';

describe('SidebarLinks', () => {
  let links, renderLink;

  beforeEach(() => {
    links = [
      {name: 'name-1', href: 'href-1', active: true},
      {name: 'name-2', href: 'href-2'}
    ];
    renderLink = ({href, name}) => <a {...{href}}>{name}</a>;
    const className = 'pui-sidebar-primary-links';
    ReactDOM.render(<SidebarLinks {...{links, renderLink, className}}/>, root);
  });

  it('renders a list item for each link', () => {
    expect('.pui-sidebar-primary-links li').toHaveLength(2);

    expect('.pui-sidebar-primary-links li:eq(0)').toHaveClass('pui-sidebar-li-active');
    expect('.pui-sidebar-primary-links li:eq(0) > div:eq(0)').toHaveClass('pui-sidebar-li-content');
    expect('.pui-sidebar-primary-links li:eq(0) > div:eq(0) > a').toHaveText('name-1');
    expect('.pui-sidebar-primary-links li:eq(0) > div:eq(0) > a').toHaveAttr('href', 'href-1');

    expect('.pui-sidebar-primary-links li:eq(1)').not.toHaveClass('pui-sidebar-li-active');
    expect('.pui-sidebar-primary-links li:eq(1) > div:eq(0)').toHaveClass('pui-sidebar-li-content');
    expect('.pui-sidebar-primary-links li:eq(1) > div:eq(0)> a').toHaveText('name-2');
    expect('.pui-sidebar-primary-links li:eq(1) > div:eq(0)> a').toHaveAttr('href', 'href-2');
  });
});
