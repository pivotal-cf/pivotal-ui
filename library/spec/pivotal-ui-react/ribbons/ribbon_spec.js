import '../spec_helper';
import {Ribbon, PrimaryRibbon, Banner} from 'pui-react-ribbons';
import {findByClass} from '../spec_helper';

let subject;

describe('Ribbon', () => {
  const renderComponent = props => ReactDOM.render(<Ribbon {...props}>British</Ribbon>, root);

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
      subject = renderComponent({className: '1234', id: 'test', style: {color: 'rgb(255, 0, 0)'}});
      const ribbon = findByClass(subject, 'ribbon');

      expect(ribbon).toHaveClass('1234');
      expect(ribbon).toHaveAttr('id', 'test');
      expect(ribbon).toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });
});

describe('PrimaryRibbon', () => {
  const renderComponent = props => ReactDOM.render(<PrimaryRibbon {...props}>British</PrimaryRibbon>, root);

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
      subject = renderComponent({className: '1234', id: 'test', style: {color: 'rgb(255, 0, 0)'}});
      const ribbon = findByClass(subject, 'ribbon');

      expect(ribbon).toHaveClass('1234');
      expect(ribbon).toHaveAttr('id', 'test');
      expect(ribbon).toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });
});

describe('Banner', () => {
  const renderComponent = props => ReactDOM.render(<Banner {...props}>British</Banner>, root);

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
      subject = renderComponent({className: '1234', id: 'test', style: {color: 'rgb(255, 0, 0)'}});
      const ribbon = findByClass(subject, 'ribbon-banner');

      expect(ribbon).toHaveClass('1234');
      expect(ribbon).toHaveAttr('id', 'test');
      expect(ribbon).toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });
});
