'use strict';
require('../spec_helper');
var $ = require('jquery');
var React = require('react/addons');

var HoverMixin = require('../../../src/pivotal-ui/javascripts/mixins/hover-mixin');

describe("HoverMixin", function() {
  var subject;
  beforeEach(function() {
    $('<div id="container"></div>').appendTo('body');
    var Klass = React.createClass({
      mixins: [HoverMixin],
      render: function() { return <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}/>; }
    });
    subject = React.render(<Klass/>, container);
  });

  afterEach(function() {
    React.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it("initializes the hover state to false", function() {
    expect(subject.state.hover).toBe(false);
  });

  describe("when mouse over event is triggered on the component", function() {
    it("sets the hover state to true", function() {
      $(subject.getDOMNode()).simulate('mouseOver');
      expect(subject.state.hover).toBe(true);
    });

    describe("when the mouse out event is triggered on the component", function() {
      it("sets the hover state to false", function() {
        $(subject.getDOMNode()).simulate('mouseOut');
        expect(subject.state.hover).toBe(false);
      });
    });
  });
});
