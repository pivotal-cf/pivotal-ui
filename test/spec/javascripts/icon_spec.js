'use strict';

var $ = require('jquery');
var React = require('react');

var Icon = React.createFactory(require('../../../src/pivotal-ui/javascripts/icons.jsx').Icon);

describe('Icon', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      Icon({
        style: "chevron-up"
      }),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders an icon with the appropriate font awesome classes", function() {
    expect($('#container i')).toHaveClass('fa');
    expect($('#container i')).toHaveClass('fa-chevron-up');
  });

  describe("when additional classes are provided", function() {
    beforeEach(function() {
      React.render(
        Icon({
          style: "check",
          className: "foo myClass"
        }),
      this.node);
    });

    it("sets the provided classes on the icon", function() {
      expect($('#container i.fa')).toHaveClass('foo');
      expect($('#container i.fa')).toHaveClass('myClass');
    });
  });

  describe("when style is not provided", function() {
    beforeEach(function() {
      React.render(
        Icon({}),
      this.node);
    });

    it("does not set the fa-undefined class", function() {
      expect($('#container i.fa')).not.toHaveClass('fa-');
      expect($('#container i.fa')).not.toHaveClass('fa-undefined');
      expect($('#container i.fa')).not.toHaveClass('undefined');
    });
  });
});
