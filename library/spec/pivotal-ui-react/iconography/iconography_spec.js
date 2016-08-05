require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

var Icon = require('../../../src/pivotal-ui-react/iconography/iconography').Icon;

describe('iconography', function() {
  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('works', function() {
    ReactDOM.render(<Icon name='plus'/>, root);
    expect('.fa.fa-plus').toExist();
  });

  it('does not have undefined when no className is given', function() {
    ReactDOM.render(<Icon name='warning' size='h1'/>, root);
    expect('.fa').not.toHaveClass('undefined');
  });

  it('does not have fa-undefined when no size is given', function() {
    ReactDOM.render(<Icon name='camera-retro' className='class'/>, root);
    expect('.fa').not.toHaveClass('fa-undefined');
  });

  describe('when a size is given', function() {
    it('adds the size class to the icon', function() {
      for (var size of ['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sm', 'xs', 'lg', '2x', '3x', '4x', '5x']) {
        ReactDOM.render(<Icon name='plus' size={size}/>, root);
        expect('.fa.fa-plus').toHaveClass(`fa-${size}`);
        ReactDOM.unmountComponentAtNode(root);
      }
    });

    describe('attributes', () => {
      beforeEach( () => {
        ReactDOM.render(<Icon name='plus' size='h1' className='test-class' id='test-id' style={{opacity: '0.5'}}/>, root);
      });
      afterEach(() => {
        ReactDOM.unmountComponentAtNode(root);
      });
      itPropagatesAttributes('.fa.fa-plus', {className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});
    });

    describe('when a className and a size are given', function() {
      it('adds the size class to the icon and includes the given className also', function() {
        ReactDOM.render(<Icon name='plus' className='a-class-name' size='h6'/>, root);
        expect('.fa.fa-plus.a-class-name.fa-h6').toExist();
      });
    });
  });
});
