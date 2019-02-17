import React from 'react';
import ReactDOM from 'react-dom';
import {BasePane, Pane} from '../../../src/react/panes';

describe('BasePane', () => {
  const renderComponent = props => ReactDOM.render(<BasePane {...props}>Pane content here</BasePane>, root);

  it('renders a pane and container', () => {
    renderComponent();
    expect('.pane .container').toHaveText('Pane content here');
  });

  describe('pass-through attributes', () => {
    beforeEach(() => {
      renderComponent({
        className: 'bg-dark-gray more-outer',
        innerClassName: 'bg-glow',
        id: 'outer-id',
        'data-foo': 'baz',
        style: {opacity: '0.5'}
      });
    });

    it('add classes, id, and styles to the pane and container', () => {
      expect('.pane').toHaveClass('bg-dark-gray');
      expect('.pane').toHaveAttr('id', 'outer-id');
      expect('.pane').toHaveCss({opacity: '0.5'});
      expect('.pane').toHaveAttr('data-foo', 'baz');

      expect('.pane .container').toHaveClass('bg-glow');
    });
  });
});

describe('Pane', () => {
  const renderComponent = props => ReactDOM.render(<Pane {...props}>Pane content here</Pane>, root);

  it('renders a pane and container', () => {
    renderComponent();
    expect('.pane .container').toHaveText('Pane content here');
  });

  describe('pass-through attributes', () => {
    beforeEach(() => {
      renderComponent({
        className: 'bg-dark-gray more-outer',
        innerClassName: 'bg-glow',
        id: 'outer-id',
        'data-foo': 'baz',
        style: {opacity: '0.5'}
      });
    });

    it('add classes, id, and styles to the pane and container', () => {
      expect('.pane').toHaveClass('bg-dark-gray');
      expect('.pane').toHaveAttr('id', 'outer-id');
      expect('.pane').toHaveCss({opacity: '0.5'});
      expect('.pane').toHaveAttr('data-foo', 'baz');

      expect('.pane .container').toHaveClass('bg-glow');
    });
  });
});
