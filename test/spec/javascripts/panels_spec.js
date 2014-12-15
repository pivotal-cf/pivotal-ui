'use strict';

var $ = require('jquery');
var React = require('react/addons');

var Panel = React.createFactory(require('../../../src/pivotal-ui/javascripts/panels.jsx').Panel);
var ShadowPanel = React.createFactory(require('../../../src/pivotal-ui/javascripts/panels.jsx').ShadowPanel);

describe('Panel', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      Panel({
        children: 'Sup'
      }),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it('creates a panel', function() {
    expect($('#container .panel .panel-body')).toContainText('Sup');
  });

  describe("when a type is provided", function() {
    beforeEach(function() {
      React.render(
        Panel({
          children: 'Sup',
          type: 'panel-basic'
        }),
        this.node
      );
    });

    it("sets the type as a class on the panel", function() {
      expect($('#container .panel')).toHaveClass('panel-basic');
    });
  });

  describe("when a className is provided", function() {
    beforeEach(function() {
      React.render(
        Panel({
          children: 'Sup',
          className: 'foo myClass'
        }),
        this.node
      );
    });

    it("sets the className as a class on the panel", function() {
      expect($('#container .panel')).toHaveClass('foo');
      expect($('#container .panel')).toHaveClass('myClass');
    });
  });

  describe("when padding is provided", function() {
    beforeEach(function() {
      React.render(
        Panel({
          children: 'Sup',
          padding: 'ptl'
        }),
        this.node
      );
    });

    it("sets the padding as a class on the panel-body", function() {
      expect($('#container .panel .panel-body')).toHaveClass('ptl');
    });
  });

  describe("when scrollable is set to a truthy value", function() {
    beforeEach(function() {
      React.render(
        Panel({
          children: 'Sup',
          scrollable: 'oui'
        }),
        this.node
      );
    });

    it('adds the class "panel-scrollable"', function() {
      expect($('#container .panel')).toHaveClass('panel-scrollable');
    });

    describe("when it is set to a number", function() {
      beforeEach(function() {
        React.render(
          Panel({
            children: 'Sup',
            scrollable: '1337'
          }),
          this.node
        );
      });

      it("sets the max-height of the panel-body to to the supplied numerical value", function() {
        expect($('#container .panel')).toHaveCss({maxHeight: '1337px'});
      });
    });
  });
});

describe('ShadowPanel', function () {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      ShadowPanel({
        children: 'Sup'
      }),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it('creates a panel with the default shadow class', function() {
    expect($('#container .panel .panel-body')).toContainText('Sup');
    expect($('#container .panel')).toHaveClass('panel-shadow-1');
  });

  describe('when the shadowLevel property is set to an acceptable value', function() {
    beforeEach(function() {
      React.render(
        ShadowPanel({
          children: 'Sup',
          shadowLevel: '3'
        }),
        this.node
      );
    });

    it('creates a shadow panel with the corresponding level', function() {
      expect($('#container .panel')).toHaveClass('panel-shadow-3');
    });
  });

  describe('when the shadowLevel property is set to an unacceptable value', function() {
    beforeEach(function() {
      React.render(
        ShadowPanel({
          children: 'Sup',
          shadowLevel: 'bananas'
        }),
        this.node
      );
    });

    it('adds the default shadow level class', function() {
      expect($('#container .panel')).toHaveClass('panel-shadow-1');
    });
  });
});
