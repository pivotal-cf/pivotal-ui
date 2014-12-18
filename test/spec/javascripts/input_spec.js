'use strict';

var $ = require('jquery');
var React = require('react/addons');

var SearchInput = React.createFactory(require('../../../src/pivotal-ui/javascripts/inputs.jsx').SearchInput);
var TestUtils = React.addons.TestUtils;

describe('SearchInput', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      SearchInput({}),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders a form group with the search classes", function() {
    expect($('#container .form-group')).toHaveClass('form-group-search');

    expect($('#container .form-group input')).toHaveClass('form-control');

    expect($('#container .form-group i')).toHaveClass('fa');
    expect($('#container .form-group i')).toHaveClass('fa-search');
  });

  describe("when a placeholder is provided", function() {
    beforeEach(function() {
      React.render(
        SearchInput({
          placeholder: 'Search here...'
        }),
        this.node
      );
    });

    it("renders the input with a placeholder", function() {
      expect($('#container .form-group input').attr('placeholder')).toEqual('Search here...');
    });
  });

  describe("when a className is provided", function() {
    beforeEach(function() {
      React.render(
        SearchInput({
          className: 'foo myClass'
        }),
        this.node
      );
    });

    it("adds the classes to the input", function() {
      expect($('#container .form-group input')).toHaveClass('foo');
      expect($('#container .form-group input')).toHaveClass('myClass');
    });
  });

  describe("when event handlers are provided", function() {
    beforeEach(function() {
      this.changeFn = jasmine.createSpy();

      React.render(
        SearchInput({
          onChange: this.changeFn
        }),
        this.node
      );
    });

    it("adds the handlers to the search input", function() {
      TestUtils.Simulate.change($('#container input').get(0));
      expect(this.changeFn).toHaveBeenCalled();
    });
  });
});
