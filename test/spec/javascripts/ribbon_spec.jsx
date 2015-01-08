'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Ribbon = require('../../../src/pivotal-ui/javascripts/ribbons.jsx').Ribbon;

describe('Ribbon', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <Ribbon>British</Ribbon>, this.node
    );
  });
 afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });


  it("renders a ribbon", function() {
    expect($('#container .inline-ribbon')).toHaveText('British');
  });
});




