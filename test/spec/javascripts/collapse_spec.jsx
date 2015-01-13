'use strict';

var $ = require('jquery');
var BsPanel = require('react-bootstrap/Panel');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var CollapseBase = require('../../../src/pivotal-ui/javascripts/collapse.jsx').CollapseBase;
var Collapse = require('../../../src/pivotal-ui/javascripts/collapse.jsx').Collapse;
var CollapseAlt = require('../../../src/pivotal-ui/javascripts/collapse.jsx').CollapseAlt;

describe('CollapseBase', function() {
  beforeEach(function() {
    this.collapse = TestUtils.renderIntoDocument(
      <CollapseBase header="ima header">
        <h1>Child</h1>
      </CollapseBase>
    );
    this.bsPanel = TestUtils.findRenderedComponentWithType(this.collapse, BsPanel);
  });

  it("creates a react-boostrap panel that is collapsable", function() {
    var props = this.bsPanel.props;
    expect(props.expanded).toBeFalsy();
    expect(props.header).toEqual('ima header');
    expect(props.collapsable).toBeTruthy();
    expect(props.children).toEqual(this.collapse.props.children);
  });

  describe("#handleSelect", function() {
    it("updates the props of the bsPanel", function() {
      this.collapse.handleSelect();
      expect(this.bsPanel.props.expanded).toBeTruthy();
      this.collapse.handleSelect();
      expect(this.bsPanel.props.expanded).toBeFalsy();
    });
  });

  describe("when the divider property is set to true", function() {
    beforeEach(function() {
      this.collapse = TestUtils.renderIntoDocument(
        <CollapseBase header="ima header" divider>
          <h1>Child</h1>
        </CollapseBase>
      );
      this.bsPanel = TestUtils.findRenderedComponentWithType(this.collapse, BsPanel);
    });

    it("wraps the body content in the panel-body-accordion-divider class", function() {
      expect(TestUtils.findRenderedDOMComponentWithClass(this.collapse, 'panel-divider')).toBeTruthy();
    });
  });
});

describe('Collapse', function() {
  beforeEach(function() {
    this.collapse = TestUtils.renderIntoDocument(
      <Collapse header="ima header">
        <h1>Child</h1>
      </Collapse>
    );
  });

  it('contains a right-caret as its collapsed icon', function() {
    var collapsedIconContainer = TestUtils.findRenderedDOMComponentWithClass(this.collapse, 'when-collapsed-inline');
    expect(TestUtils.findRenderedDOMComponentWithClass(collapsedIconContainer, 'fa-caret-right')).toBeTruthy();
  });

  it('contains a down-caret as its collapsed icon', function() {
    var expandedIconContainer = TestUtils.findRenderedDOMComponentWithClass(this.collapse, 'when-expanded-inline');
    expect(TestUtils.findRenderedDOMComponentWithClass(expandedIconContainer, 'fa-caret-down')).toBeTruthy();
  });
});

describe('CollapseAlt', function() {
  beforeEach(function() {
    this.collapse = TestUtils.renderIntoDocument(
      <CollapseAlt header="ima header">
        <h1>Child</h1>
      </CollapseAlt>
    );
  });

  it('contains a plus as its collapsed icon', function() {
    var collapsedIconContainer = TestUtils.findRenderedDOMComponentWithClass(this.collapse, 'when-collapsed-inline');
    expect(TestUtils.findRenderedDOMComponentWithClass(collapsedIconContainer, 'fa-plus-square')).toBeTruthy();
  });

  it('contains a minus as its collapsed icon', function() {
    var expandedIconContainer = TestUtils.findRenderedDOMComponentWithClass(this.collapse, 'when-expanded-inline');
    expect(TestUtils.findRenderedDOMComponentWithClass(expandedIconContainer, 'fa-minus-square')).toBeTruthy();
  });
});

describe('CollapseBase behavior', function() {
  beforeEach(function() {
    jasmine.clock().install();
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <CollapseBase header="This is my heading">
        Collapse contents!
      </CollapseBase>,
      this.node
    );
  });

  afterEach(function() {
    jasmine.clock().uninstall();
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it('allows for expanding and collapsing of contents', function() {
    jasmine.clock().tick(500);
    expect($('#container .panel-collapse').height()).toEqual(0);
    expect($('#container a')).toHaveText('This is my heading');
    TestUtils.Simulate.click($('#container a').get(0));

    jasmine.clock().tick(500);
    expect($('#container .panel-collapse').height()).toBeGreaterThan(0);
    expect($('#container a')).toHaveText('This is my heading');
    TestUtils.Simulate.click($('#container a').get(0));

    jasmine.clock().tick(500);
    expect($('#container .panel-collapse').height()).toEqual(0);
    expect($('#container a')).toHaveText('This is my heading');
  });
});
