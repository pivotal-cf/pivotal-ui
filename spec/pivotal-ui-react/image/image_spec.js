require('../spec_helper');
import {propagateAttributes} from '../spec_helper';

describe('Image', function() {
  beforeEach(function() {
    var Image = require('../../../src/pivotal-ui-react/images/images').Image;
    React.render(
      <Image
        src="http://placehold.it/20x20"
        href="http://google.com"
        className="my-img-class"
        id="my-img-id"
        style={{opacity: '1'}}
        responsive={true}/>,
      root
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('when the href is set', function() {
    it('wraps the image in an link', function() {
      expect('a img').toExist();
    });
  });

  describe('when image responsive is set to true', function() {
    it('adds the image-responsive class to the image', function() {
      expect('img').toHaveClass('img-responsive');
    });
  });

  propagateAttributes('img', {className: 'my-img-class', id: 'my-img-id', style: {opacity: '1'}});

  it('adds the gutter class to the row', function() {
    expect('img').toHaveAttr('src', 'http://placehold.it/20x20');
  });
});
