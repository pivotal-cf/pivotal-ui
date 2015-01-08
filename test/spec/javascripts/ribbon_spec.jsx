'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var InlineRibbon = require('../../../src/pivotal-ui/javascripts/ribbons.jsx').InlineRibbon;

describe('InlineRibbon', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <InlineRibbon>British</InlineRibbon>, this.node
    );
  });
 afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });


  it("renders a inline ribbon", function() {
    expect($('#container .inline-ribbon')).toHaveText('British');
  });
});




