require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

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
          <SimpleTabs
            className="testSimpleTabsClass"
            id="testId"
            style={{opacity: '0.5'}}
            defaultActiveKey={1}>
            <Tab eventKey={1} className="tabPaneClass" id="tabPaneId" style={{opacity: 0.5}} tab="Tab1">Content1</Tab>
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

    itPropagatesAttributes('#root .tab-simple', {
      className: 'testSimpleTabsClass',
      id: 'testId',
      style: {opacity: '0.5'}
    });

    describe('Tab', function() {
      it('passes className to the tab-pane', function() {
        expect('#root .tab-pane:nth(0)').toHaveClass('tabPaneClass');
      });

      it('passes id to the tab-pane', function() {
        expect('#root .tab-pane:nth(0)').toHaveAttr('id', 'tabPaneId');
      });

      it('passes style to the tab-pane', function() {
        expect('#root .tab-pane:nth(0)').toHaveCss({opacity: '0.5'});
      });
    });
  });

  describe('SimpleAltTabs', function() {
    beforeEach(function() {
      var SimpleAltTabs = require('../../../src/pivotal-ui-react/tabs/tabs').SimpleAltTabs;

      React.render((
          <SimpleAltTabs
            className="testSimpleAltTabsClass"
            id="testId"
            style={{opacity: '0.5'}}
            defaultActiveKey={1}>,
            <Tab eventKey={1} className="tabPaneClass" tab="Tab1">Content1</Tab>
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

    itPropagatesAttributes('#root .tab-simple-alt', {
      className: 'testSimpleAltTabsClass',
      id: 'testId',
      style: {opacity: '0.5'}
    });

    describe('Tab', function() {
      it('passes className to the tab-pane', function() {
        expect('#root .tab-pane:nth(0)').toHaveClass('tabPaneClass');
      });
    });
  });
});
