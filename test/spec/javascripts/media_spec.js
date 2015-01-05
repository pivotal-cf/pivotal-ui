'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Media = React.createFactory(require('../../../src/pivotal-ui/javascripts/media.jsx').Media);
var Flag = React.createFactory(require('../../../src/pivotal-ui/javascripts/media.jsx').Flag);
var Image = React.createFactory(require('../../../src/pivotal-ui/javascripts/images.jsx').Image);

describe('Media', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe("Creates a basic media component", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20" />;

      React.render(
        Media({
          children: "fop",
          leftImage: image
        }),
        this.node
      );
    });

    it("creates a Media component", function() {
      expect($('#container .media .media-body')).toContainText('fop');
    });
  });



  describe("when left image src is set", function() {
    describe("when left image src is set", function() {
      beforeEach(function() {
        var image = <img src="http://placehold.it/20x20" alt="my fancy image description" height='50px' width='40px'/>;
        React.render(
          Media({
            children: "fop",
            leftImage: image
          }),
          this.node
        );
      });

      it("displays the media-left link with an image inside", function() {
        expect($('#container .media .media-left img').attr('src')).toEqual('http://placehold.it/20x20');
      });
 
      it("sets an alt on the left image when the leftAlt property is set", function() {
        expect($('#container .media .media-left img').attr('alt')).toEqual('my fancy image description');
      });

      it("displays an image with a certain height and width when set", function() {
        expect($('#container .media .media-left img').attr('height')).toEqual('50px');
        expect($('#container .media .media-left img').attr('width')).toEqual('40px');
      });
    });


    describe("When default image padding is modified to large", function() {
      beforeEach(function() {
        var image = <img src="http://placehold.it/20x20" />;

        React.render(
          Media({
            children: "fop",
            leftImage: image,
            leftMediaSpacing: 'large'
          }),
          this.node
        );
      });

      it("adds the prl class to the left image", function(){
        expect($('#container .media .media-left')).toHaveClass('prl');
      });

      it("does not add the prl class to the right image", function() {
        expect($('#container .media .media-right')).not.toHaveClass('prl');
      });
    });
  });

  describe("when right image src is set", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20"/>;

      React.render(
        Media({
          children: "fop",
          rightImage: image
        }),
        this.node
      );
    });

    it("displays the media-right with an image inside", function() {
      expect($('#container .media .media-right img').attr('src')).toEqual('http://placehold.it/20x20');
    });
  });

  describe("when image alignment is set to middle", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20"/>;

      React.render(
        Media({
          children: "fop",
          vAlign:'middle',
          leftImage: image
        }),
        this.node
      );
    });

    it("displays the media-middle class", function() {
      expect($('#container .media .media-body')).toHaveClass('media-middle');
    });

    it("displays the media-middle class", function() {
      expect($('#container .media .media-left')).toHaveClass('media-middle');
    });
  });

  describe("when image alignment is set to bottom", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20"/>;
      React.render(
        Media({
          children: "fop",
          vAlign: 'bottom',
          leftImage: image
        }),
        this.node
      );
    });

    it("displays the media-middle class", function() {
      expect($('#container .media .media-left')).toHaveClass('media-bottom');
    });
  });

  describe("when media block is set to stack on small screens", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20"/>;

      React.render(
        Media({
          children: "fop",
          leftImage: image,
          stackSize: "small"
        }),
        this.node
      );
    });

    it("the media-stackable-sm class is applied to the media element", function() {
      expect($('#container .media')).toHaveClass('media-stackable-sm');
    });
  });

  describe("when media block is set to stack on medium screens", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20" />;

      React.render(
        Media({
          children: "fop",
          leftImage: image,
          stackSize: "medium"
        }),
        this.node
      );
    });

    it("the media-stackable-md class is applied to the media element", function() {
      expect($('#container .media')).toHaveClass('media-stackable-md');
    });
  });

  describe("Flag", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20"/>;

      React.render(
        Flag({
          children: "fop",
          leftImage: image,
          rightImage: image
        }),
        this.node
      );
    });

    it("adds the class media-middle to the media-body, media-left, and media-right", function() {
      expect($('#container .media-body')).toHaveClass('media-middle');
      expect($('#container .media-left')).toHaveClass('media-middle');
      expect($('#container .media-right')).toHaveClass('media-middle');
    });
  });

});
