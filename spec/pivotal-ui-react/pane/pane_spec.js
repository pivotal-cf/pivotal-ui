import '../spec_helper';

import {BasePane, Pane} from '../../../src/react/panes';

describe('BasePane', () => {
  let subject;
  const renderComponent = props => subject = shallow(<BasePane {...props}>Pane content here</BasePane>);

  it('renders a pane and container', () => {
    subject = renderComponent();
    expect(subject.hasClass('pane')).toBeTruthy();
    expect(subject.find('.container').text()).toBe('Pane content here');
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
      expect(subject.hasClass('bg-dark-2')).toBeTruthy();
      expect(subject.prop('id')).toBe('outer-id');
      expect(subject.prop('style')).toEqual({opacity: '0.5'});
      expect(subject.prop('data-foo')).toBe('baz');

      expect(subject.find('.container').hasClass('bg-glow')).toBeTruthy();
    });
  });
});

describe('Pane', () => {
  let subject;
  const renderComponent = props => subject = shallow(<Pane {...props}>Pane content here</Pane>);

  it('renders a pane and container', () => {
    subject = renderComponent();
    expect(subject.find(BasePane).props()).toEqual({children: 'Pane content here', className: undefined});
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
      expect(subject.find(BasePane).props()).toEqual({
        children: 'Pane content here',
        className: 'bg-dark-2 more-outer',
        'data-foo': 'baz',
        id: 'outer-id',
        innerClassName: 'bg-glow',
        style: {opacity: '0.5'}
      });
    });
  });
});
