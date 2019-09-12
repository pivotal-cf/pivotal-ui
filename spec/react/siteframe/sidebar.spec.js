import React from 'react';
import ReactDOM from 'react-dom';
import {spyOnRender} from '../../support/jest_spy_on_render';
import {Sidebar} from '../../../src/react/siteframe/sidebar';
import {SidebarLinks} from '../../../src/react/siteframe/sidebar_links';

describe('Sidebar', () => {
  let className, primaryLinks, secondaryLinks, renderLink;

  describe('without secondary links', () => {
    beforeEach(() => {
      className = 'some-class-name';
      primaryLinks = [
        {name: 'primary-link-1'},
        {name: 'primary-link-2'}
      ];
      renderLink = () => null;
      spyOnRender(SidebarLinks);
      ReactDOM.render(<Sidebar {...{className, primaryLinks, secondaryLinks, renderLink}}/>, root);
    });

    it('renders the upper SidebarLinks component only', () => {
      expect(SidebarLinks).toHaveBeenRenderedWithProps({
        className,
        links: primaryLinks,
        renderLink,
        className: 'pui-sidebar-primary-links'
      });

      expect(SidebarLinks).toHaveBeenRenderedTimes(1);
    });

    it('adds any additional class names to the sidebar', () => {
      expect('.pui-siteframe-sidebar').toHaveClass('some-class-name');
    });
  });

  describe('with secondary links', () => {
    beforeEach(() => {
      primaryLinks = [
        {name: 'primary-link-1'},
        {name: 'primary-link-2'}
      ];
      secondaryLinks = [
        {name: 'secondary-link-1'},
        {name: 'secondary-link-2'}
      ];
      renderLink = () => null;
      spyOnRender(SidebarLinks);
      ReactDOM.render(<Sidebar {...{primaryLinks, secondaryLinks, renderLink}}/>, root);
    });

    it('renders the upper SidebarLinks component', () => {
      expect(SidebarLinks).toHaveBeenRenderedWithProps({
        links: primaryLinks,
        renderLink,
        className: 'pui-sidebar-primary-links'
      });
    });

    it('renders the lower SidebarLinks component', () => {
      expect(SidebarLinks).toHaveBeenRenderedWithProps({
        links: secondaryLinks,
        renderLink,
        className: 'pui-sidebar-secondary-links'
      });
    });
  });
});
