'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Media = React.createFactory(require('../../../src/pivotal-ui/javascripts/media.jsx').Media);

describe('Media', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      Media({
        children: "fop"
      }),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("creates a Media component", function() {
    expect($('#container .media .media-body')).toContainText('fop');
  });

  describe("when left image src is set", function() {
    describe("when left image src is set and href is not", function() {
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

    describe("when left href is set", function() {
      beforeEach(function() {
        var image = <img src="http://placehold.it/20x20" href="http://www.google.com"/>;
        React.render(
          Media({
            children: "fop",
            leftImage: image
          }),
          this.node
        );
      });

      it("displays the media-left link with an image inside", function() {
        expect($('#container .media .media-left a img').attr('src')).toEqual('http://placehold.it/20x20');
      });

      it("links to it's href (google, in this case)", function() {
        expect($('#container .media .media-left a').attr('href')).toEqual('http://www.google.com');
      });
    });

    describe("When default image padding is modified to large", function() {
      beforeEach(function() {
        var image = <img src="http://placehold.it/20x20" href="http://www.google.com" spacing="large" />;

        React.render(
          Media({
            children: "fop",
            leftImage: image
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


  describe("when left image src is not set", function() {
    beforeEach(function() {
      React.render(
        Media({
          children: "fop"
        }),
        this.node
      );
    });

    it("does not display the media-left link or image inside", function() {
      expect($('#container .media')).not.toContainElement('.media-left');
    });
  });

  describe("when right image src is set", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20" href="http://www.google.com" />;

      React.render(
        Media({
          children: "fop",
          rightImage: image
        }),
        this.node
      );
    });

    it("displays the media-right link with an image inside", function() {
      expect($('#container .media .media-right img').attr('src')).toEqual('http://placehold.it/20x20');
    });

    it("links to it's href (google, in this case)", function(){
      expect($('#container .media .media-right a').attr('href')).toEqual('http://www.google.com');
    });
  });

  describe("when image alignment is set to middle", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20" href="http://www.google.com" alignment="middle" />;

      React.render(
        Media({
          children: "fop",
          leftImage: image
        }),
        this.node
      );
    });

    it("displays the media-middle class", function() {
      expect($('#container .media .media-left')).toHaveClass('media-middle');
    });
  });

  describe("when image alignment is set to bottom", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20" href="http://www.google.com" alignment="bottom" />;
      React.render(
        Media({
          children: "fop",
          leftImage: image
        }),
        this.node
      );
    });

    it("displays the media-middle class", function() {
      expect($('#container .media .media-left')).toHaveClass('media-bottom');
    });
  });

  describe("when body alignment is set to middle", function() {
    beforeEach(function() {
      React.render(
        Media({
          children: "fop",
          bodyAlignment: "middle"
        }),
        this.node
      );
    });

    it("displays the media-middle class", function() {
      expect($('#container .media .media-body')).toHaveClass('media-middle');
    });
  });

  describe("when media block is set to stack on small screens", function() {
    beforeEach(function() {
      var image = <img src="http://placehold.it/20x20" href="http://www.google.com" />;
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
      var image = <img src="http://placehold.it/20x20" href="http://www.google.com" />;
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

});
