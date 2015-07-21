require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

var Icon = require('../../../src/pivotal-ui-react/iconography/iconography').Icon;
var {toBeValid} = require('../support/matchers');

describe('iconography', function() {
  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('works', function() {
    React.render(<Icon name='plus'/>, root);
    expect('.fa.fa-plus').toExist();
  });

  describe('when a size is given', function() {
    beforeEach(function() {
      jasmine.addMatchers({toBeValid});
    });

    it('does not fail prop-validation', function() {
      for (var size of ['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sm', 'xs', 'lg', '2x', '3x', '4x', '5x']) {
        expect(<Icon name='plus' size={size}/>, root).toBeValid();
      }
    });

    it('adds the size class to the icon', function() {
      for (var size of ['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sm', 'xs', 'lg', '2x', '3x', '4x', '5x']) {
        React.render(<Icon name='plus' size={size}/>, root);
        expect('.fa.fa-plus').toHaveClass(`fa-${size}`);
        React.unmountComponentAtNode(root);
      }
    });

    describe('attributes', () => {
      beforeEach( () => {
        React.render(<Icon name='plus' size='h1' className='test-class' id='test-id' style={{opacity: '0.5'}}/>, root);
      });
      afterEach(() => {
        React.unmountComponentAtNode(root);
      });
      itPropagatesAttributes('.fa.fa-plus', {className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});
    });

    describe('when a className and a size are given', function() {
      it('adds the size class to the icon and includes the given className also', function() {
        React.render(<Icon name='plus' className='a-class-name' size='h6'/>, root);
        expect('.fa.fa-plus.a-class-name.fa-h6').toExist();
      });
    });
  });
});
