'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Ribbon = require('../../../src/pivotal-ui/javascripts/ribbons.jsx').Ribbon;
var PrimaryRibbon = require('../../../src/pivotal-ui/javascripts/ribbons.jsx').PrimaryRibbon;
var Banner = require('../../../src/pivotal-ui/javascripts/ribbons.jsx').Banner;

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

  it("renders a inline ribbon", function() {
    expect($('#container .inline-ribbon')).toHaveText('British');
    expect($('#container .inline-ribbon')).not.toHaveClass('ribbon-primary');
  });
});

describe("PrimaryRibbon", function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <PrimaryRibbon>British</PrimaryRibbon>, this.node
    )
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it('adds the ribbon-primary class', function () {
    expect($('#container .inline-ribbon')).toHaveText('British');
    expect($('#container .inline-ribbon')).toHaveClass('ribbon-primary');
  });
});


describe('Banner', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <Banner>British</Banner>, this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders a Banner", function() {
    expect($('#container .ribbon-banner')).toHaveText('British');
    expect($('#container .ribbon-banner')).not.toHaveClass('ribbon-primary');
  });
});
