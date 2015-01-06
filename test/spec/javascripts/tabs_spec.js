'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var SimpleAltTabs = require('../../../src/pivotal-ui/javascripts/tabs.jsx').SimpleAltTabs;
var Tab = require('../../../src/pivotal-ui/javascripts/tabs.jsx').Tab;

describe('SimpleAltTabs', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe("when the active flag is not set", function() {
    beforeEach(function() {
      React.render(
        <SimpleAltTabs>
          <Tab heading="My first tab" >Content for first tab</Tab>
          <Tab heading="My second tab" >Content for second tab</Tab>
        </SimpleAltTabs>,
        this.node
      );
    });

    it("renders the correct tabs and content", function() {
      expect($('#container .tab-simple-alt ul.nav.nav-tabs li.active a')).toHaveText("My first tab");
      expect($('#container .tab-simple-alt ul.nav.nav-tabs li:not(.active) a')).toHaveText("My second tab");

      expect($('#container li.active a').attr('href')).toEqual('#' + $('#container .tab-pane.active').attr("id"));

      expect($('#container .tab-simple-alt .tab-content .tab-pane.in.active')).toHaveText("Content for first tab");
      expect($('#container .tab-simple-alt .tab-content .tab-pane:not(.in.active)')).toHaveText("Content for second tab");
    });
  });

  describe("when the active flag is set on a tab", function() {
    beforeEach(function() {
      React.render(
        <SimpleAltTabs>
          <Tab heading="My first tab" >Content for first tab</Tab>
          <Tab heading="My second tab" active="true">Content for second tab</Tab>
        </SimpleAltTabs>,
        this.node
      );
    });

    it("sets the specified tab as active", function() {
      expect($('#container .tab-simple-alt ul.nav.nav-tabs li.active a')).toHaveText("My second tab");
      expect($('#container .tab-simple-alt .tab-content .tab-pane.in.active')).toHaveText("Content for second tab");
    });
  });
});
