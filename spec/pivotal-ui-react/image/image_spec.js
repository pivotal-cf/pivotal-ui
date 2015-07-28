require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

var Image = require('../../../src/pivotal-ui-react/images/images').Image;
function renderImage(responsive){
  React.render(
    <Image
      src="http://placehold.it/20x20"
      href="http://google.com"
      className="my-img-class"
      id="my-img-id"
      style={{opacity: '0.5'}}
      responsive={responsive}/>,
    root
  );
}
describe('Image', function() {
  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('when responsive', function() {
    beforeEach(function() {
      renderImage(true);
    });
  describe('when the href is set', function() {
    it('wraps the image in an link', function() {
      expect('a img').toExist();
    });
  });

  it('adds the image-responsive class to the image', function() {
    expect('img').toHaveClass('img-responsive');
  });

  itPropagatesAttributes('img', {className: 'my-img-class', id: 'my-img-id', style: {opacity: '0.5'}});

  it('adds the gutter class to the row', function() {
    expect('img').toHaveAttr('src', 'http://placehold.it/20x20');
  });
});


  describe('when image responsive is not set to true', function() {
    beforeEach(function() {
      renderImage(false);
    });

    it('does not add the image-responsive class to the image', function() {
      expect('img').not.toHaveClass('img-responsive');
    });
  });
});
