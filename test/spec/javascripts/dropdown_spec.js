'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Dropdown = React.createFactory(require('../../../src/pivotal-ui/javascripts/dropdowns.jsx').Dropdown);
var DropdownLink = React.createFactory(require('../../../src/pivotal-ui/javascripts/dropdowns.jsx').DropdownLink);
var DropdownDefaultAlt = React.createFactory(require('../../../src/pivotal-ui/javascripts/dropdowns.jsx').DropdownDefaultAlt);
var DropdownPrimary = React.createFactory(require('../../../src/pivotal-ui/javascripts/dropdowns.jsx').DropdownPrimary);
var DropdownLowlight = React.createFactory(require('../../../src/pivotal-ui/javascripts/dropdowns.jsx').DropdownLowlight);
var DropdownDanger = React.createFactory(require('../../../src/pivotal-ui/javascripts/dropdowns.jsx').DropdownDanger);
var DropdownHighlight = React.createFactory(require('../../../src/pivotal-ui/javascripts/dropdowns.jsx').DropdownHighlight);
var DropdownHighlightAlt = React.createFactory(require('../../../src/pivotal-ui/javascripts/dropdowns.jsx').DropdownHighlightAlt);
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

  describe('DropdownLink', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DropdownLink({
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

  describe('DropdownDefaultAlt', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DropdownDefaultAlt({
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

  describe('DropdownPrimary', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DropdownPrimary({
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


  describe('DropdownLowlight', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DropdownLowlight({
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

  describe('DropdownDanger', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DropdownDanger({
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

  describe('DropdownHighlight', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DropdownHighlight({
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

  describe('DropdownHighlightAlt', function () {
    beforeEach(function () {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        DropdownHighlightAlt({
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
