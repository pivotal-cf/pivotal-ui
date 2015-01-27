'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Dropdown = React.createFactory(require('../../src/pivotal-ui/javascripts/dropdowns.jsx').Dropdown);
var LinkDropdown = React.createFactory(require('../../src/pivotal-ui/javascripts/dropdowns.jsx').LinkDropdown);
var DefaultAltDropdown = React.createFactory(require('../../src/pivotal-ui/javascripts/dropdowns.jsx').DefaultAltDropdown);
var PrimaryDropdown = React.createFactory(require('../../src/pivotal-ui/javascripts/dropdowns.jsx').PrimaryDropdown);
var LowlightDropdown = React.createFactory(require('../../src/pivotal-ui/javascripts/dropdowns.jsx').LowlightDropdown);
var DangerDropdown = React.createFactory(require('../../src/pivotal-ui/javascripts/dropdowns.jsx').DangerDropdown);
var HighlightDropdown = React.createFactory(require('../../src/pivotal-ui/javascripts/dropdowns.jsx').HighlightDropdown);
var HighlightAltDropdown = React.createFactory(require('../../src/pivotal-ui/javascripts/dropdowns.jsx').HighlightAltDropdown);

describe('Dropdowns', function() {
  describe('Dropdown', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        Dropdown({
          title: 'Dropping'
        }),
        this.node
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it("creates a dropdown", function () {
      expect($('#container button.dropdown-toggle.btn.btn-default')).toContainText('Dropping');
    });
  });

  describe('LinkDropdown', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        LinkDropdown({
          title: 'Dropping'
        }),
        this.node
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it("creates a dropdown", function () {
      expect($('#container button.dropdown-toggle.btn.btn-link')).toContainText('Dropping');
    });
  });

  describe('DefaultAltDropdown', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DefaultAltDropdown({
          title: 'Dropping'
        }),
        this.node
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it("creates a dropdown", function () {
      expect($('#container button.dropdown-toggle.btn.btn-default-alt')).toContainText('Dropping');
    });
  });

  describe('PrimaryDropdown', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        PrimaryDropdown({
          title: 'Dropping'
        }),
        this.node
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it("creates a dropdown", function () {
      expect($('#container button.dropdown-toggle.btn.btn-primary')).toContainText('Dropping');
    });
  });


  describe('LowlightDropdown', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        LowlightDropdown({
          title: 'Dropping'
        }),
        this.node
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it("creates a dropdown", function () {
      expect($('#container button.dropdown-toggle.btn.btn-lowlight')).toContainText('Dropping');
    });
  });

  describe('DangerDropdown', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DangerDropdown({
          title: 'Dropping'
        }),
        this.node
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it("creates a dropdown", function () {
      expect($('#container button.dropdown-toggle.btn.btn-danger')).toContainText('Dropping');
    });
  });

  describe('HighlightDropdown', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        HighlightDropdown({
          title: 'Dropping'
        }),
        this.node
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it("creates a dropdown", function () {
      expect($('#container button.dropdown-toggle.btn.btn-highlight')).toContainText('Dropping');
    });
  });

  describe('HighlightAltDropdown', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        HighlightAltDropdown({
          title: 'Dropping'
        }),
        this.node
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it("creates a dropdown", function () {
      expect($('#container button.dropdown-toggle.btn.btn-highlight-alt')).toContainText('Dropping');
    });
  });
});
