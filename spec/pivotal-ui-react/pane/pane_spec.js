import '../spec_helper';

import {BasePane, Pane} from '../../../src/react/panes';

let subject;
describe('BasePane', () => {
  let subject;
  const renderComponent = props => subject = shallow(<BasePane {...props}>Pane content here</BasePane>);

  it('renders a pane and container', () => {
    subject = renderComponent();
    const pane = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pane');

    expect(subject.find(pane.getElementsByClassName('container')).text()).toBe('Pane content here');
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
      expect(subject.find(pane).hasClass('bg-dark-2')).toBeTruthy();
      expect(subject.find(pane).prop('id')).toBe('outer-id');
      expect(subject.find(pane).prop('style')).toEqual({opacity: '0.5'});
      expect(subject.find(pane).prop('data-foo')).toBe('baz');

      expect(subject.find(pane.getElementsByClassName('container')).hasClass('bg-glow')).toBeTruthy();
    });
  });
});

describe('Pane', () => {
  let subject;
  const renderComponent = props => subject = shallow(<Pane {...props}>Pane content here</Pane>);

  it('renders a pane and container', () => {
    subject = renderComponent();
    const pane = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pane');

    expect(subject.find(pane.getElementsByClassName('container')).text()).toBe('Pane content here');
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
      expect(subject.find(pane).hasClass('bg-dark-2')).toBeTruthy();
      expect(subject.find(pane).prop('id')).toBe('outer-id');
      expect(subject.find(pane).prop('style')).toEqual({opacity: '0.5'});
      expect(subject.find(pane).prop('data-foo')).toBe('baz');

      expect(subject.find(pane.getElementsByClassName('container')).hasClass('bg-glow')).toBeTruthy();
    });
  });
});
