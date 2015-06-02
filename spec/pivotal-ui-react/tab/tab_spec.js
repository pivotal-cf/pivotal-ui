require('../spec_helper');
describe('Tabs', function() {
  var Tab;
  beforeEach(function() {
    Tab = require('../../../src/pivotal-ui-react/tabs/tabs').Tab;
  });

  describe('SimpleTabs', function() {
    beforeEach(function() {
      var SimpleTabs = require('../../../src/pivotal-ui-react/tabs/tabs').SimpleTabs;
      React.render(
        (
          <SimpleTabs defaultActiveKey={1}>
            <Tab eventKey={1} tab="Tab1">Content1</Tab>
            <Tab eventKey={2} tab="Tab2"/>
          </SimpleTabs>
        ),
        root
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates tabs in a simpletab container', function() {
      expect('.tab-simple nav ul.nav.nav-tabs li.active').toContainText('Tab1');
      expect('.tab-simple .tab-content .tab-pane.fade.active.in').toContainText('Content1');
    });
  });

  describe('SimpleAltTabs', function() {
    beforeEach(function() {
      var SimpleAltTabs = require('../../../src/pivotal-ui-react/tabs/tabs').SimpleAltTabs;

      React.render((
          <SimpleAltTabs defaultActiveKey={1}>,
            <Tab eventKey={1} tab="Tab1">Content1</Tab>
            <Tab eventKey={2} tab="Tab2"/>
          </SimpleAltTabs>
        ),
        root
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates tabs in a simpletab container', function() {
      expect('.tab-simple-alt nav ul.nav.nav-tabs li.active').toContainText('Tab1');
      expect('.tab-simple-alt .tab-content .tab-pane.fade.active.in').toContainText('Content1');
    });
  });
});
