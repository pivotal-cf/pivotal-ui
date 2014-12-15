'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Divider = React.createFactory(require('../../../src/pivotal-ui/javascripts/dividers.jsx').Divider);

describe('Divider', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      Divider({}),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("creates a divider", function() {
    expect($('#container hr')).toHaveClass('divider-alternate-1');
  });

  describe("when large is set to true", function() {
    beforeEach(function() {
      React.render(
        Divider({
          size: "large"
        }),
        this.node
      );
    });

    it("creates a divider with -2 appended to the classname", function() {
      expect($('#container hr')).toHaveClass('divider-alternate-2');
    });
  });

  describe("when the divider goes on a dark background, inverse: true", function() {
    beforeEach(function() {
      React.render(
        Divider({
          inverse: "true"
        }),
        this.node
      );
    });

    it("creates a divider without the -alternate in the class", function() {
      expect($('#container hr')).toHaveClass('divider-1');
    });
  });

  describe("when a large divider goes on a dark background, inverse: true", function() {
    beforeEach(function() {
      React.render(
        Divider({
          inverse: "true",
          size: "large"
        }),
        this.node
      );
    });

    it("creates a divider without the -alternate in the class", function() {
      expect($('#container hr')).toHaveClass('divider-2');
    });
  });

  describe("setting a custom className", function() {
    beforeEach(function() {
      React.render(
        Divider({
          inverse: "true",
          className: "myClass"
        }),
        this.node
      );
    });

    it("passes the class through to the divider", function() {
      expect($('#container hr')).toHaveClass('divider-1');
      expect($('#container hr')).toHaveClass('myClass');
    });
  });

  describe("setting a custom data attribute", function() {
    beforeEach(function() {
      React.render(
        Divider({
          "data-behavior": "myAttr"
        }),
        this.node
      );
    });

    it("passes the data attribute through to the divider", function() {
      expect($('#container hr').attr('data-behavior')).toEqual('myAttr');
    });
  });
});
