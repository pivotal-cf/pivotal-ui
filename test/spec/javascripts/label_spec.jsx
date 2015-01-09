'use strict';

var $ = require('jquery');
var React = require('react');
var Label = require('../../../src/pivotal-ui/javascripts/labels.jsx').Label;

describe("Label", function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <Label>banans</Label>,
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders a primary colored label", function() {
    expect($('#container span')).toHaveClass('label');
    expect($('#container span')).toHaveClass('label-primary');
    expect($('#container span')).toHaveText('banans');
  });
});
