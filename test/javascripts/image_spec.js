'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Image = require('../../src/pivotal-ui/javascripts/images.jsx').Image;

describe('Image', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <Image
        src="http://placehold.it/20x20"
        href="http://google.com"
        className='my-img-class'
        responsive={true} />,
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe('when the href is set', function() {
    it("wraps the image in an link", function() {
      expect($('#container a')).toContainElement('img');
    });
  });

  describe('when image responsive is set to true', function() {
    it("adds the image-responsive class to the image", function() {
      expect($('#container img')).toHaveClass('img-responsive');
    });
  });

  describe("when className is provided", function() {
    it("adds the provided className to the img", function() {
      expect($('#container img')).toHaveClass('my-img-class');
    });
  });

  it("adds the gutter class to the row", function() {
    expect($('#container img').attr('src')).toEqual('http://placehold.it/20x20');
  });
});
