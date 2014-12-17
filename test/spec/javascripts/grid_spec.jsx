'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Row = require('../../../src/pivotal-ui/javascripts/grids.jsx').Row;
var Col = require('../../../src/pivotal-ui/javascripts/grids.jsx').Col;

describe('Grid', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <Row gutter="md">
        <Col md={12}></Col>
        <Col md={12}></Col>
      </Row>,
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("doesn't crap out", function() {
    expect(true).toBeTruthy();
  });

  it("adds the gutter class to the row", function() {
    expect($('#container .row')).toHaveClass('row-gutter-md');
  });
});
