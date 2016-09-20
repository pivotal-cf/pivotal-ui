require('../spec_helper');

describe('Media', function() {
  var media, Media, Flag;
  beforeEach(function() {
    media = require('../../../src/pivotal-ui-react/media/media');
    Media = media.Media;
    Flag = media.Flag;
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  describe('Creates a basic media component', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      ReactDOM.render((<Media className="media-class" image={image}>fop</Media>), root);
    });

    it('creates a Media component', function() {
      expect('.media .media-body').toContainText('fop');
    });

    it('passes the provided className onto the .media element', function() {
      expect('.media').toHaveClass('media-class');
    });
  });

  describe('when media is left aligned', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20" alt="my fancy image description" height="50px" width="40px"/>);
      ReactDOM.render((<Media image={image} placement="left">fop</Media>), root);
    });

    it('displays the media-left link with an image inside', function() {
      expect('.media .media-left img').toHaveAttr('src', 'http://placehold.it/20x20');
    });

    it('sets an alt on the left image when the leftAlt property is set', function() {
      expect('.media .media-left img').toHaveAttr('alt', 'my fancy image description');
    });

    it('displays an image with a certain height and width when set', function() {
      expect('.media .media-left img').toHaveAttr('height', '50px');
      expect('.media .media-left img').toHaveAttr('width', '40px');
    });


    describe('When default image padding is modified to large', function() {
      it('adds the prl class to the left aligned image', function() {
        var image = (<img src="http://placehold.it/20x20"/>);
        ReactDOM.render((<Media image={image} placement="left" mediaSpacing="large">fop</Media>), root);
        expect('.media .media-left').toHaveClass('prl');
      });

      it('adds the pll class to the right image', function() {
        var image = (<img src="http://placehold.it/20x20"/>);
        ReactDOM.render((<Media image={image} placement="right" mediaSpacing="large">fop</Media>), root);
        expect('.media .media-right').toHaveClass('pll');
      });
    });
  });

  describe('when media is right aligned', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      ReactDOM.render((<Media image={image} placement="right">fop</Media>), root);
    });

    it('displays the media-right with an image inside', function() {
      expect('.media .media-right img').toHaveAttr('src', 'http://placehold.it/20x20');
    });

    describe('When default image padding is modified to large', function() {
      it('adds the pll class to the right image', function(){
        var image = (<img src="http://placehold.it/20x20"/>);
        ReactDOM.render((<Media image={image} placement="right" mediaSpacing="large">fop</Media>), root);
        expect('.media .media-right').toHaveClass('pll');
      });
    });
  });

  describe('when image alignment is set to middle', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      ReactDOM.render((<Media image={image} placement="left" vAlign="middle">fop</Media>), root);
    });

    it('displays the media-middle class', function() {
      expect('.media .media-body').toHaveClass('media-middle');
    });

    it('displays the media-middle class', function() {
      expect('.media .media-left').toHaveClass('media-middle');
    });
  });

  describe('when image alignment is set to bottom', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      ReactDOM.render((<Media image={image} vAlign="bottom">fop</Media>), root);
    });

    it('displays the media-bottom class', function() {
      expect('.media .media-left').toHaveClass('media-bottom');
    });
  });

  describe('when media block is set to stack on small screens', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      ReactDOM.render((<Media image={image} stackSize="small">fop</Media>), root);
    });

    it('the media-stackable-sm class is applied to the media element', function() {
      expect('.media').toHaveClass('media-stackable-sm');
    });
  });

  describe('when media block is set to stack on medium screens', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20" />);
      ReactDOM.render((<Media image={image} stackSize="medium">fop</Media>), root);
    });

    it('the media-stackable-md class is applied to the media element', function() {
      expect('.media').toHaveClass('media-stackable-md');
    });
  });

  describe('when custom attributes are set on media', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20" />);
      ReactDOM.render((<Media image={image} stackSize="medium" innerClassName="inner-test-class" className="test-class" id="test-id" style={{opacity: 0.5}}>fop</Media>), root);
    });

    it('the class, id, and style are passed through', function() {
      expect('.media').toHaveClass('test-class');
      expect('.media-body').toHaveClass('inner-test-class');
      expect('.media').toHaveAttr('id', 'test-id');
      expect('.media').toHaveCss({opacity: '0.5'});
    });
  });
});
