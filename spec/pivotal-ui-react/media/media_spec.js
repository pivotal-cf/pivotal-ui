require('../spec_helper');

describe('Media', function() {
  var media, Media, Flag;
  beforeEach(function() {
    media = require('../../../src/pivotal-ui-react/media/media');
    Media = media.Media;
    Flag = media.Flag;
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('Creates a basic media component', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      React.render((<Media className="media-class" leftImage={image}>fop</Media>), root);
    });

    it('creates a Media component', function() {
      expect('.media .media-body').toContainText('fop');
    });

    it('passes the provided className onto the .media element', function() {
      expect('.media').toHaveClass('media-class');
    });
  });

  describe('when left image src is set', function() {
    describe('when default left image settings are used', function() {
      beforeEach(function() {
        var image = (<img src="http://placehold.it/20x20" alt="my fancy image description" height="50px" width="40px"/>);
        React.render((<Media leftImage={image}>fop</Media>), root);
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
    });


    describe('When default image padding is modified to large', function() {
      beforeEach(function() {
        var image = (<img src="http://placehold.it/20x20"/>);
        React.render((<Media leftImage={image} rightImage={image} leftMediaSpacing="large">fop</Media>), root);
      });

      it('adds the prl class to the left image', function(){
        expect('.media .media-left').toHaveClass('prl');
      });

      it('does not add the prl class to the right image', function() {
        expect('.media .media-right').not.toHaveClass('prl');
      });
    });
  });

  describe('when right image src is set', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      React.render((<Media rightImage={image}>fop</Media>), root);
    });

    it('displays the media-right with an image inside', function() {
      expect('.media .media-right img').toHaveAttr('src', 'http://placehold.it/20x20');
    });
  });

  describe('when image alignment is set to middle', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      React.render((<Media leftImage={image} vAlign="middle">fop</Media>), root);
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
      React.render((<Media leftImage={image} vAlign="bottom">fop</Media>), root);
    });

    it('displays the media-bottom class', function() {
      expect('.media .media-left').toHaveClass('media-bottom');
    });
  });

  describe('when media block is set to stack on small screens', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      React.render((<Media leftImage={image} stackSize="small">fop</Media>), root);
    });

    it('the media-stackable-sm class is applied to the media element', function() {
      expect('.media').toHaveClass('media-stackable-sm');
    });
  });

  describe('when media block is set to stack on medium screens', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20" />);
      React.render((<Media leftImage={image} stackSize="medium">fop</Media>), root);
    });

    it('the media-stackable-md class is applied to the media element', function() {
      expect('.media').toHaveClass('media-stackable-md');
    });
  });

  describe('Flag', function() {
    beforeEach(function() {
      var image = (<img src="http://placehold.it/20x20"/>);
      React.render((<Flag leftImage={image} rightImage={image}>fop</Flag>), root);
    });

    it('adds the class media-middle to the media-body, media-left, and media-right', function() {
      expect('.media-body').toHaveClass('media-middle');
      expect('.media-left').toHaveClass('media-middle');
      expect('.media-right').toHaveClass('media-middle');
    });
  });
});
