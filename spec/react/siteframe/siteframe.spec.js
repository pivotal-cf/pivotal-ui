import React from 'react';
import ReactDOM from 'react-dom';
import {spyOnRender} from '../../support/jest_spy_on_render';
import {Siteframe} from '../../../src/react/siteframe';
import {Header} from '../../../src/react/siteframe/header';
import {Sidebar} from '../../../src/react/siteframe/sidebar';
import {SidebarLinks} from '../../../src/react/siteframe/sidebar_links';

jest.mock('../../../src/react/siteframe/header', () => ({
  Header: jest.fn(() => <div/>)
}));

jest.mock('../../../src/react/siteframe/sidebar', () => ({
  Sidebar: jest.fn(() => <div/>)
}));

describe('Siteframe', () => {
  let headerProps, sidebarProps;

  beforeEach(() => {
    spyOnRender(SidebarLinks);

    headerProps = {
      cols: [],
      companyName: 'some-company',
      logoOnClick: () => undefined,
      logo: null,
      productName: 'some-product'
    };
    sidebarProps = {
      primaryLinks: [{name: 'name1', href: '/href1'}, {name: 'name2', href: '/href2'}],
      secondaryLinks: [{name: 'name3', href: '/href3'}, {name: 'name4', href: '/href4'}],
      renderLink: () => null
    };
  });

  describe('with only children', () => {
    beforeEach(() => {
      ReactDOM.render(<Siteframe>
        <div className="siteframe-child">siteframe-child</div>
      </Siteframe>, root);
    });

    it('renders the siteframe', () => {
      expect('.pui-siteframe').toExist();
    });

    it('does not render the header', () => {
      expect(Header).not.toHaveBeenRendered();
    });

    it('renders the siteframe body', () => {
      expect('.pui-siteframe > div:eq(0)').toHaveClass('pui-siteframe-body');
      expect('.pui-siteframe > div:eq(0)').toHaveClass('grid');
      expect('.pui-siteframe > div:eq(0)').toHaveClass('grid-nogutter');
    });

    it('does not render the sidebar', () => {
      expect(Sidebar).not.toHaveBeenRendered();
    });

    it('renders the child', () => {
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(0) > .siteframe-child').toExist();
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(0) > .siteframe-child').toHaveText('siteframe-child');
    });
  });

  describe('with header and children', () => {
    beforeEach(() => {
      ReactDOM.render(<Siteframe {...{headerProps}}>
        <div className="siteframe-child">siteframe-child</div>
      </Siteframe>, root);
    });

    it('renders the header', () => {
      expect(Header).toHaveBeenRenderedWithProps(headerProps);
    });

    it('renders the siteframe body', () => {
      expect('.pui-siteframe > div:eq(1)').toHaveClass('pui-siteframe-body');
      expect('.pui-siteframe > div:eq(1)').toHaveClass('grid');
      expect('.pui-siteframe > div:eq(1)').toHaveClass('grid-nogutter');
    });

    it('does not render the sidebar', () => {
      expect(Sidebar).not.toHaveBeenRendered();
    });

    it('renders the child', () => {
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(0) > .siteframe-child').toExist();
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(0) > .siteframe-child').toHaveText('siteframe-child');
    });
  });

  describe('with sidebar and children', () => {
    beforeEach(() => {
      Header.mockClear();
      ReactDOM.render(<Siteframe {...{sidebarProps}}>
        <div className="siteframe-child">siteframe-child</div>
      </Siteframe>, root);
    });

    it('does not render the header', () => {
      expect(Header).not.toHaveBeenRendered();
    });

    it('renders the siteframe body', () => {
      expect('.pui-siteframe > div:eq(0)').toHaveClass('pui-siteframe-body');
      expect('.pui-siteframe > div:eq(0)').toHaveClass('grid');
      expect('.pui-siteframe > div:eq(0)').toHaveClass('grid-nogutter');
    });

    it('renders the sidebar', () => {
      expect(Sidebar).toHaveBeenRenderedWithProps(sidebarProps);
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(0)').toHaveClass('col-fixed');
    });

    it('renders the child', () => {
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(1) > .siteframe-child').toExist();
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(1) > .siteframe-child').toHaveText('siteframe-child');
    });
  });

  describe('with header, sidebar, and children', () => {
    beforeEach(() => {
      ReactDOM.render(<Siteframe {...{headerProps, sidebarProps}}>
        <div className="siteframe-child">siteframe-child</div>
      </Siteframe>, root);
    });

    it('renders the header', () => {
      expect(Header).toHaveBeenRenderedWithProps(headerProps);
    });

    it('renders the siteframe body', () => {
      expect('.pui-siteframe > div:eq(1)').toHaveClass('pui-siteframe-body');
      expect('.pui-siteframe > div:eq(1)').toHaveClass('grid');
      expect('.pui-siteframe > div:eq(1)').toHaveClass('grid-nogutter');
    });

    it('renders the sidebar', () => {
      expect(Sidebar).toHaveBeenRenderedWithProps(sidebarProps);
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(0)').toHaveClass('col-fixed');
    });

    it('renders the child', () => {
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(1) > .siteframe-child').toExist();
      expect('.pui-siteframe > .pui-siteframe-body > .col:eq(1) > .siteframe-child').toHaveText('siteframe-child');
    });
  });
});