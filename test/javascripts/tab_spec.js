'use strict';

var $ = require('jquery');
var React = require('react/addons');

var Tab = React.createFactory(require('../../src/pivotal-ui/javascripts/tabs.jsx').Tab);
var SimpleTabs = React.createFactory(require('../../src/pivotal-ui/javascripts/tabs.jsx').SimpleTabs);
var SimpleAltTabs = React.createFactory(require('../../src/pivotal-ui/javascripts/tabs.jsx').SimpleAltTabs);

describe('Tabs', function() {
  describe('SimpleTabs', function() {
    beforeEach(function() {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        SimpleTabs({
          defaultActiveKey: 1,
          children: [Tab({eventKey: 1, tab: 'Tab1', children: 'Content1'}), Tab({eventKey: 2, tab: 'Tab2  '})]
        }),
        this.node
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it('creates tabs in a simpletab container', function() {
      expect($('#container .tab-simple nav ul.nav.nav-tabs li.active')).toContainText('Tab1');
      expect($('#container .tab-simple .tab-content .tab-pane.fade.active.in')).toContainText('Content1');
    });
  });

  describe('SimpleAltTabs', function() {
    beforeEach(function() {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);

      React.render(
        SimpleAltTabs({
          defaultActiveKey: 1,
          children: [Tab({eventKey: 1, tab: 'Tab1', children: 'Content1'}), Tab({eventKey: 2, tab: 'Tab2'})]
        }),
        this.node
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it('creates tabs in a simpletab container', function() {
      expect($('#container .tab-simple-alt nav ul.nav.nav-tabs li.active')).toContainText('Tab1');
      expect($('#container .tab-simple-alt .tab-content .tab-pane.fade.active.in')).toContainText('Content1');
    });
  });
});
