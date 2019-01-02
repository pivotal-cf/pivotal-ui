import '../spec_helper';
import {FlexCol} from '../../../src/react/flex-grids';
import {Header} from '../../../src/react/siteframe/header';

describe('Header', () => {
  describe('with a string companyName', () => {
    beforeEach(() => {
      ReactDOM.render(<Header {...{companyName: 'Pivotal'}}/>, root);
    });

    it('renders a grid with one column', () => {
      expect('.pui-siteframe-header').toHaveClass('grid');
      expect('.pui-siteframe-header > .col.pui-siteframe-header-title').toHaveLength(1);
    });

    it('renders a fixed column with the company name', () => {
      expect('.pui-siteframe-header .col.pui-siteframe-header-title').toHaveClass('col-fixed');
      expect('.pui-siteframe-header .col.pui-siteframe-header-title h4').toContainText('Pivotal');
    });

    it('does not render a span containing the product name', () => {
      expect('.pui-siteframe-header .col.pui-siteframe-header-title h4 span').not.toExist();
    });
  });

  describe('with a node companyName', () => {
    beforeEach(() => {
      ReactDOM.render(<Header {...{companyName: <a href="#">Pivotal</a>}}/>, root);
    });

    it('renders a grid with one column', () => {
      expect('.pui-siteframe-header').toHaveClass('grid');
      expect('.pui-siteframe-header > .col.pui-siteframe-header-title').toHaveLength(1);
    });

    it('renders a fixed column with the company name', () => {
      expect('.pui-siteframe-header .col.pui-siteframe-header-title').toHaveClass('col-fixed');
      expect('.pui-siteframe-header .col.pui-siteframe-header-title h4 a').toContainText('Pivotal');
    });

    it('does not render a span containing the product name', () => {
      expect('.pui-siteframe-header .col.pui-siteframe-header-title h4 span').not.toExist();
    });
  });

  describe('with props', () => {
    let companyName, onClick, logoSrc, productName, cols, logo;

    beforeEach(() => {
      companyName = 'some-company-name';
      onClick = jasmine.createSpy('onClick');
      logoSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      logo = <a {...{onClick}}><img src={logoSrc}/></a>;
      productName = <a href="#">some-product-name</a>;
      cols = [<FlexCol>first custom column</FlexCol>, <FlexCol>second custom column</FlexCol>];

      ReactDOM.render(<Header {...{cols, companyName, logo, productName}}/>, root);
    });

    it('renders a grid with four columns', () => {
      expect('.pui-siteframe-header').toHaveClass('grid');
      expect('.pui-siteframe-header > .col').toHaveLength(4);
    });

    it('renders a fixed first column with the logo', () => {
      expect('.pui-siteframe-header .col:eq(0)').toHaveClass('col-fixed');
      expect('.pui-siteframe-header .col:eq(0) a img').toHaveAttr('src', logoSrc);
    });

    it('renders a fixed second column with the company and product names', () => {
      expect('.pui-siteframe-header .col:eq(1)').toHaveClass('col-fixed');
      expect('.pui-siteframe-header .col:eq(1) h4').toContainText(companyName);
      expect('.pui-siteframe-header .col:eq(1) h4 span.em-high a').toHaveText('some-product-name');
    });

    it('renders the first custom column', () => {
      expect('.pui-siteframe-header .col:eq(2)').toHaveText('first custom column');
    });

    it('renders the second custom column', () => {
      expect('.pui-siteframe-header .col:eq(3)').toHaveText('second custom column');
    });
  });
});