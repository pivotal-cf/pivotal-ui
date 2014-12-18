'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Heading = React.createFactory(require('../../../src/pivotal-ui/javascripts/typography.jsx').Heading);
var createTypographyClass = require('../../../src/pivotal-ui/javascripts/typography.jsx').createTypographyClass;

describe('Heading', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe("when the Heading has no properties passed in", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "foo",
        children: "Heading text here"
      }),
      this.node
      );
    });

    it("creates a p tag", function() {
      expect($('#container p')).toContainText("Heading text here");
    });

    it("sets no additional classes", function() {
      expect($('#container p').prop('className')).toEqual("");
    });
  });

  describe("when the Heading has a specified h1 - h6 element", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h1",
        children: "Heading text here"
      }),
      this.node
      );
    });

    it("creates an element of the specified heading", function() {
      expect($('#container h1')).toContainText("Heading text here");
    });
  });

  describe("when the Heading has a className provided", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h1",
        allcaps: true,
        className: "myClass",
        children: "Heading text here"
      }),
      this.node
      );
    });

    it("creates an element with the className AND default classes", function() {
      expect($('#container h1')).toHaveClass('myClass');
      expect($('#container h1')).toHaveClass('em-alt');
    });
  });

  describe("when the Heading has valid size provided", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h1",
        size: 'small'
      }),
      this.node
      );
    });

    it("creates an element with the size class set", function() {
      expect($('#container h1')).toHaveClass('small');
    });
  });

  describe("when the Heading has invalid size provided", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h1",
        size: "fop"
      }),
      this.node
      );
    });

    it("creates an element with the size class set", function() {
      expect($('#container h1')).not.toHaveClass('fop');
    });
  });


  describe("when the Heading has allcaps set", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h2",
        allcaps: true,
        children: "Heading text here"
      }),
      this.node
      );
    });

    it("creates an element with the em-alt class", function() {
      expect($('#container h2')).toHaveClass('em-alt');
    });
  });

  describe("when the Heading has a valid bold set", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h2",
        bold: "high",
        children: "Heading text here"
      }),
      this.node
      );
    });

    it("creates an element with the em-{bold} class", function() {
      expect($('#container h2')).toHaveClass('em-high');
    });
  });

  describe("when the Heading has an invalid bold set", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h2",
        bold: "superbold",
        children: "Heading text here"
      }),
      this.node
      );
    });

    it("creates an element without the em-{bold} class", function() {
      expect($('#container h2')).not.toHaveClass('em-superbold');
    });
  });

  describe("when the Heading has color set", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h2",
        color: "purple",
        children: "Heading text here"
      }),
      this.node
      );
    });

    it("creates an element with the color class", function() {
      expect($('#container h2')).toHaveClass('purple');
    });
  });

  describe("when Heading has many properties set", function() {
    beforeEach(function() {
      React.render(
        Heading({
        element: "h2",
        size: "h4",
        color: "purple",
        bold: "max",
        allcaps: true,
        children: "Heading text here"
      }),
      this.node
      );
    });

    it("creates an element all the necessary classes", function() {
      expect($('#container h2')).toHaveClass('purple');
      expect($('#container h2')).toHaveClass('em-alt');
      expect($('#container h2')).toHaveClass('em-max');
      expect($('#container h2')).toHaveClass('h4');
    });
  });
});

describe('createTypographyClass', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    var MyClass = React.createFactory(createTypographyClass({
      element: 'h4',
      color: 'type-dark-1',
      size: 'h5',
      bold: 'high'
    }));

    React.render(MyClass({children: 'Hi there!'}), this.node);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it('creates a typography class with the default properties and the appropriate element', function() {
    expect($('#container h4')).toHaveClass('type-dark-1');
    expect($('#container h4')).toHaveClass('h5');
    expect($('#container h4')).toHaveClass('em-high');
  });
});
