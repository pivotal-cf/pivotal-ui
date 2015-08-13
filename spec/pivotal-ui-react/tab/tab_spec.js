require('../spec_helper');
describe('Tabs', function() {
  var Tab;
  beforeEach(function() {
    Tab = require('../../../src/pivotal-ui-react/tabs/tabs').Tab;
  });

  describe('SimpleTabs', function() {
    let SimpleTabs = require('../../../src/pivotal-ui-react/tabs/tabs').SimpleTabs;

    beforeEach(function() {
      React.render(
        (
          <SimpleTabs defaultActiveKey={1}>
            <Tab eventKey={1} title="Tab1">Content1</Tab>
            <Tab eventKey={2} title="Tab2"/>
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

    describe('when no ID is given to the Tabs component', function() {
      beforeEach(function() {
        React.render(
          (
            <SimpleTabs defaultActiveKey={1}>
              <Tab eventKey={1} title="Tab1">Content1</Tab>
              <Tab eventKey={2} title="Tab2"/>
            </SimpleTabs>
          ),
          root
        );
      });

      it('sets up the correct aria-controls relationship', function() {
        let pane1 = $(root).find('.tab-simple .tab-pane:first');
        expect(pane1.length).toEqual(1);
        expect(pane1.attr('id')).toBeTruthy();
        expect('.tab-simple nav ul.nav.nav-tabs li:first a').toHaveAttr('aria-controls', pane1.attr('id'));
      });
    });

    describe('when an ID is given to the Tabs component', function() {
      beforeEach(function() {
        React.render(
          (
            <SimpleTabs defaultActiveKey={1} id="tabs-id" >
              <Tab eventKey={1} title="Tab1">Content1</Tab>
              <Tab eventKey={2} title="Tab2"/>
            </SimpleTabs>
          ),
          root
        );
      });

      it('uses the given id for the tabs element in the DOM', function() {
        expect('.tab-simple > #tabs-id').toExist();
      });

      it('sets up the correct aria-controls relationship', function() {
        let pane1 = $(root).find('.tab-simple .tab-pane:first');
        expect(pane1.length).toEqual(1);
        expect(pane1.attr('id')).toBeTruthy();
        expect('.tab-simple nav ul.nav.nav-tabs li:first a').toHaveAttr('aria-controls', pane1.attr('id'));
      });
    });
  });

  describe('SimpleAltTabs', function() {
    let SimpleAltTabs = require('../../../src/pivotal-ui-react/tabs/tabs').SimpleAltTabs;

    beforeEach(function() {
      React.render((
          <SimpleAltTabs defaultActiveKey={1}>,
            <Tab eventKey={1} title="Tab1">Content1</Tab>
            <Tab eventKey={2} title="Tab2"/>
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

    describe('when no ID is given to the Tabs component', function() {
      beforeEach(function() {
        React.render(
          (
            <SimpleAltTabs defaultActiveKey={1}>
              <Tab eventKey={1} title="Tab1">Content1</Tab>
              <Tab eventKey={2} title="Tab2"/>
            </SimpleAltTabs>
          ),
          root
        );
      });

      it('sets up the correct aria-controls relationship', function() {
        let pane1 = $(root).find('.tab-simple-alt .tab-pane:first');
        expect(pane1.length).toEqual(1);
        expect(pane1.attr('id')).toBeTruthy();
        expect('.tab-simple-alt nav ul.nav.nav-tabs li:first a').toHaveAttr('aria-controls', pane1.attr('id'));
      });
    });

    describe('when an ID is given to the Tabs component', function() {
      beforeEach(function() {
        React.render(
          (
            <SimpleAltTabs defaultActiveKey={1} id="tabs-id" >
              <Tab eventKey={1} title="Tab1">Content1</Tab>
              <Tab eventKey={2} title="Tab2"/>
            </SimpleAltTabs>
          ),
          root
        );
      });

      it('uses the given id for the tabs element in the DOM', function() {
        expect('.tab-simple-alt > #tabs-id').toExist();
      });

      it('sets up the correct aria-controls relationship', function() {
        let pane1 = $(root).find('.tab-simple-alt .tab-pane:first');
        expect(pane1.length).toEqual(1);
        expect(pane1.attr('id')).toBeTruthy();
        expect('.tab-simple-alt nav ul.nav.nav-tabs li:first a').toHaveAttr('aria-controls', pane1.attr('id'));
      });
    });
  });
});
