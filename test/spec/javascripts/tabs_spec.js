'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Tabs = require('../../../src/pivotal-ui/javascripts/tabs.jsx').Tabs;
var Tab = require('../../../src/pivotal-ui/javascripts/tabs.jsx').Tab;

describe("Tabs", function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe("when the active tab is not set", function() {
    beforeEach(function() {
      React.render(
        <Tabs>
          <Tab heading="My first tab" >Content for first tab</Tab>
          <Tab heading="My second tab" >Content for second tab</Tab>
        </Tabs>,
        this.node
      );
    });

    it("renders the tabs and content with first tab active", function() {
      expect($('#container .tab-simple ul.nav.nav-tabs li.active a')).toHaveText("My first tab");
      expect($('#container .tab-simple ul.nav.nav-tabs li:not(.active) a')).toHaveText("My second tab");

      expect($('#container .tab-simple .tab-content .tab-pane.in.active')).toHaveText("Content for first tab");
      expect($('#container .tab-simple .tab-content .tab-pane:not(.in.active)')).toHaveText("Content for second tab");
    });
  });

  describe("when the active tab is set", function() {
    beforeEach(function() {
      React.render(
        <Tabs activeTab={1}>
          <Tab heading="My first tab" >Content for first tab</Tab>
          <Tab heading="My second tab" >Content for second tab</Tab>
        </Tabs>,
        this.node
      );
    });

    it("renders the tabs and content with specified tab active", function() {
      expect($('#container .tab-simple ul.nav.nav-tabs li.active a')).toHaveText("My second tab");
      expect($('#container .tab-simple ul.nav.nav-tabs li:not(.active) a')).toHaveText("My first tab");

      expect($('#container .tab-simple .tab-content .tab-pane.in.active')).toHaveText("Content for second tab");
      expect($('#container .tab-simple .tab-content .tab-pane:not(.in.active)')).toHaveText("Content for first tab");
    });
  });

  describe("clicking a non-active tab", function() {
    beforeEach(function() {
      React.render(
        <Tabs>
          <Tab heading="My first tab" >Content for first tab</Tab>
          <Tab heading="My second tab" >Content for second tab</Tab>
        </Tabs>,
        this.node
      );

      TestUtils.Simulate.click($('li:not(.active) a').get(0));
    });

    it("updates the active tab and content", function() {
      expect($('#container .tab-simple ul.nav.nav-tabs li.active a')).toHaveText("My second tab");
      expect($('#container .tab-simple ul.nav.nav-tabs li:not(.active) a')).toHaveText("My first tab");

      expect($('#container .tab-simple .tab-content .tab-pane.in.active')).toHaveText("Content for second tab");
      expect($('#container .tab-simple .tab-content .tab-pane:not(.in.active)')).toHaveText("Content for first tab");
    });
  });
});
