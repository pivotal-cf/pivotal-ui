import '../spec_helper';

import {BasePane, Pane} from 'pui-react-panes';

let subject;
describe('BasePane', () => {
  const renderComponent = props => ReactDOM.render(<BasePane {...props}>Pane content here</BasePane>, root);

  it('renders a pane and container', () => {
    subject = renderComponent();
    const pane = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pane');

    expect(pane.getElementsByClassName('container')).toHaveText('Pane content here');
  });

  describe('pass-through attributes', () => {
    beforeEach(() => {
      subject = renderComponent({
        className: 'bg-dark-2 more-outer',
        innerClassName: 'bg-glow',
        id: 'outer-id',
        'data-foo': 'baz',
        style: {opacity: '0.5'}
      });
    });

    it('add classes, id, and styles to the pane and container', () => {
      const pane = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pane');
      expect(pane).toHaveClass('bg-dark-2');
      expect(pane).toHaveAttr('id', 'outer-id');
      expect(pane).toHaveCss({opacity: '0.5'});
      expect(pane).toHaveAttr('data-foo', 'baz');

      expect(pane.getElementsByClassName('container')).toHaveClass('bg-glow');
    });
  });
});

describe('Pane', () => {
  const renderComponent = props => ReactDOM.render(<Pane {...props}>Pane content here</Pane>, root);

  it('renders a pane and container', () => {
    subject = renderComponent();
    const pane = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pane');

    expect(pane.getElementsByClassName('container')).toHaveText('Pane content here');
  });

  describe('pass-through attributes', () => {
    beforeEach(() => {
      subject = renderComponent({
        className: 'bg-dark-2 more-outer',
        innerClassName: 'bg-glow',
        id: 'outer-id',
        'data-foo': 'baz',
        style: {opacity: '0.5'}
      });
    });

    it('add classes, id, and styles to the pane and container', () => {
      const pane = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pane');
      expect(pane).toHaveClass('bg-dark-2');
      expect(pane).toHaveAttr('id', 'outer-id');
      expect(pane).toHaveCss({opacity: '0.5'});
      expect(pane).toHaveAttr('data-foo', 'baz');

      expect(pane.getElementsByClassName('container')).toHaveClass('bg-glow');
    });
  });
});
