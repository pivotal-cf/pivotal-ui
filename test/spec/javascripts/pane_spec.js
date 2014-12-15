'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var BasePane = React.createFactory(require('../../../src/pivotal-ui/javascripts/panes.jsx').BasePane);

describe('BasePane', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      BasePane({
        children: "Pane content here"
      }),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("creates a pane and container", function() {
    expect($('#container .pane .container')).toContainText('Pane content here');
  });

  describe("when inner and outer classes are provided", function() {
     beforeEach(function() {
      React.render(
        BasePane({
          outerClass: "bg-dark-1",
          innerClass: "bg-glow"
        }),
        this.node
      );
    });

    it("add classes to the pane and container", function() {
      expect($('#container .pane')).toHaveClass('bg-dark-1');
      expect($('#container .container')).toHaveClass('bg-glow');
    });
  });

  describe("when data-attributes are provided", function() {
    beforeEach(function() {
      React.render(
        BasePane({
          "data-foo": "baz"
        }),
        this.node
      );
    });

    it("attaches the attributes to the .pane", function() {
      expect($('#container .pane').attr('data-foo')).toEqual('baz');
    });
  });
});
