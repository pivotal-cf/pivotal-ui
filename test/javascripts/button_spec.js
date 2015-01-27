'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var UIButton = React.createFactory(require('../../src/pivotal-ui/javascripts/buttons.jsx').UIButton);

describe('UIButton', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      UIButton({
        children: "Click here"
      }),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("creates a button", function() {
    expect($('#container button.btn.btn-default')).toContainText('Click here');
  });

  describe("when href attribute is set", function() {
    beforeEach(function() {
      React.render(
        UIButton({
          href: "http://example.com",
          children: "Click here"
        }),
        this.node
      );
    });

    it("creates a link", function() {
      expect($('#container a.btn.btn-default')).toContainText('Click here');
      expect($('#container a.btn').attr('href')).toEqual('http://example.com');
    });
  });

  describe("when type attribute is set", function() {
    beforeEach(function(){
      React.render(
        UIButton({
          type: "danger"
        }),
        this.node
      );
    });

    it("adds the type class to the button", function() {
      expect($('#container button.btn')).not.toHaveClass('btn-default');
      expect($('#container button.btn')).toHaveClass('btn-danger');
    });
  });

  describe("when type attribute is invalid", function() {
    beforeEach(function(){
      React.render(
        UIButton({
          type: "fop"
        }),
        this.node
      );
    });

    it("does not add the type class to the button", function() {
      expect($('#container button.btn')).not.toHaveClass('btn-fop');
      expect($('#container button.btn')).toHaveClass('btn-default');
    });
  });

  describe("when block is true", function() {
    beforeEach(function(){
      React.render(
        UIButton({
          block: "true"
        }),
        this.node
      );
    });

    it("adds the block class", function() {
      expect($('#container button.btn')).toHaveClass('btn-block');
    });
  });

  describe("when large is true", function() {
    beforeEach(function(){
      React.render(
        UIButton({
          large: "true"
        }),
        this.node
      );
    });

    it("adds the large button class", function() {
      expect($('#container button.btn')).toHaveClass('btn-lg');
    });
  });

  describe("when data-attributes are provided", function() {
    beforeEach(function(){
      React.render(
        UIButton({
          "data-click": "myFunction",
          "data-foo": "bar"
        }),
        this.node
      );
    });

    it("passes through the data-attributes", function() {
      expect($('#container button.btn').attr("data-click")).toEqual("myFunction");
      expect($('#container button.btn').attr("data-foo")).toEqual("bar");
    });
  });
});
