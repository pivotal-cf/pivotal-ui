'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var InlineRibbon = require('../../../src/pivotal-ui/javascripts/ribbons.jsx').InlineRibbon;
var BannerRibbon = require('../../../src/pivotal-ui/javascripts/ribbons.jsx').BannerRibbon;

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
    expect($('#container .inline-ribbon')).not.toHaveClass('ribbon-primary');
  });

  describe("When primary is truthy", function() {
    beforeEach(function() {
      React.render(
        <InlineRibbon primary='true'>British</InlineRibbon>, this.node
      )
    });

    it('adds the ribbon-primary class', function () {
      expect($('#container .inline-ribbon')).toHaveClass('ribbon-primary');
    });
  });
});

describe('BannerRibbon', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <BannerRibbon>British</BannerRibbon>, this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders a Banner ribbon", function() {
    expect($('#container .ribbon-banner')).toHaveText('British');
    expect($('#container .ribbon-banner')).not.toHaveClass('ribbon-primary');
  });

  describe("When primary is truthy", function() {
    beforeEach(function() {
      React.render(
        <BannerRibbon primary>British</BannerRibbon>, this.node
      )
    });

    it('adds the ribbon-primary class', function () {
      expect($('#container .ribbon-banner')).toHaveClass('ribbon-primary');
    });
  });
});
