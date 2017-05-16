import '../spec_helper';
import {Ribbon, PrimaryRibbon, Banner} from 'pui-react-ribbons';
import {findByClass} from '../spec_helper';

let subject;

describe('Ribbon', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Ribbon {...props}>British</Ribbon>);

  describe('basic Ribbon', () => {
    it('renders a ribbon', () => {
      subject = renderComponent();
      const ribbon = findByClass(subject, 'ribbon');
      expect(ribbon).toHaveText('British');
      expect(ribbon).not.toHaveClass('ribbon-primary');
    });
  });

  describe('Ribbon with custom attributes', () => {
    it('renders a ribbon with custom attributes', () => {
      subject = renderComponent({className: '1234', id: 'test', style: {color: 'red'}});
      const ribbon = findByClass(subject, 'ribbon');

      expect(ribbon).toHaveClass('1234');
      expect(ribbon).toHaveAttr('id', 'test');
      expect(ribbon).toHaveCss({color: 'red'});
    });
  });
});

describe('PrimaryRibbon', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<PrimaryRibbon {...props}>British</PrimaryRibbon>);

  describe('basic PrimaryRibbon', () => {
    it('adds the ribbon-primary class', () => {
      subject = renderComponent();
      const ribbon = findByClass(subject, 'ribbon');
      expect(ribbon).toHaveText('British');
      expect(ribbon).toHaveClass('ribbon-primary');
    });
  });

  describe('PrimaryRibbon with custom attributes', () => {
    it('renders a ribbon with custom attributes', () => {
      subject = renderComponent({className: '1234', id: 'test', style: {color: 'red'}});
      const ribbon = findByClass(subject, 'ribbon');

      expect(ribbon).toHaveClass('1234');
      expect(ribbon).toHaveAttr('id', 'test');
      expect(ribbon).toHaveCss({color: 'red'});
    });
  });
});

describe('Banner', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Banner {...props}>British</Banner>);

  describe('basic banner', () => {
    it('has the ribbon-banner class', () => {
      subject = renderComponent();
      const ribbon = findByClass(subject, 'ribbon-banner');
      expect(ribbon).toHaveText('British');
      expect(ribbon).not.toHaveClass('ribbon');
    });
  });

  describe('Banner with custom attributes', () => {
    it('renders a banner with custom attributes', () => {
      subject = renderComponent({className: '1234', id: 'test', style: {color: 'red'}});
      const ribbon = findByClass(subject, 'ribbon-banner');

      expect(ribbon).toHaveClass('1234');
      expect(ribbon).toHaveAttr('id', 'test');
      expect(ribbon).toHaveCss({color: 'red'});
    });
  });
});
