require('../spec_helper');
import {SimpleAltTabs, SimpleTabs, Tab} from '../../../src/pivotal-ui-react/tabs/tabs';
import EventEmitter from 'node-event-emitter';
import {itPropagatesAttributes} from '../support/shared_examples';

fdescribe('Tabs', function() {
  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  function itBehavesLikeTabs(Component, tabType) {
    let emitter;

    describe('props', function() {
      let onSelectSpy;

      beforeEach(function() {
        onSelectSpy = jasmine.createSpy('onSelectSpy');

        React.render(
          <Component defaultActiveKey={2} className="test-class" id="test-id" style={{opacity: 0.5}} responsiveBreakpoint="md" smallScreenClassName="small-class" largeScreenClassName="large-class" onSelect={onSelectSpy}>
            <Tab eventKey={1} tab="Tab1">Content1</Tab>
            <Tab eventKey={2} tab="Tab2">Content2</Tab>
          </Component>,
        root);
      });

      itPropagatesAttributes('#root > div', {className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});

      it('sets the responsive breakpoint', function() {
        expect(`.${tabType}`).toHaveClass('hidden-md');
        expect('.panel-group').toHaveClass('visible-md-block');
      });

      it('passes screen-size specific classes', function() {
        expect(`.${tabType}`).toHaveClass('large-class');
        expect('.panel-group').toHaveClass('small-class');
      });

      it('uses the supplied onSelect method when clicking on large-screen tabs', function() {
        $(`.${tabType} li a:eq(0)`).simulate('click');
        expect(onSelectSpy).toHaveBeenCalled();
      });

      it('uses the supplied onSelect method when clicking on small-screen tabs', function() {
        $(`.panel-group .panel-title a:eq(0)`).simulate('click');
        expect(onSelectSpy).toHaveBeenCalled();
      });
    });

    describe('default behavior', function() {
      beforeEach(function() {
        emitter = new EventEmitter();

        const TestComponent = React.createClass({
          getInitialState() {
            return {defaultActiveKey: 2};
          },

          componentDidMount() {
            emitter.on('changeActiveKey', (key) => this.setState({defaultActiveKey: key}));
          },

          render() {
            return (
              <Component defaultActiveKey={this.state.defaultActiveKey}>
                <Tab eventKey={1} tab="Tab1">Content1</Tab>
                <Tab eventKey={2} tab="Tab2">Content2</Tab>
              </Component>
            );
          }
        });

        React.render(<TestComponent />, root);
      });

      describe('for screens greater than the responsiveBreakpoint', function() {
        it('displays tabs in a simple tab container', function() {
          expect(`.hidden-xs.${tabType} nav li.active`).toContainText('Tab2');
          expect(`.hidden-xs.${tabType} .tab-content`).toContainText('Content2');
        });
      });

      describe('for screens smaller than the responsiveBreakpoint', function() {
        it('renders an accordion', function() {
          expect('.visible-xs-block.panel-group').toExist();
        });

        it('renders headers for each tab', function() {
          expect('.visible-xs-block.panel-group .panel-title:eq(0)').toContainText('Tab1');
          expect('.visible-xs-block.panel-group .panel-title:eq(1)').toContainText('Tab2');
          expect('.visible-xs-block.panel-group .panel-title a:eq(1)').toHaveAttr('aria-expanded', 'true');
        });

        it('renders content for each tab', function() {
          expect('.visible-xs-block.panel-group .panel-collapse:eq(0)').toContainText('Content1');
          expect('.visible-xs-block.panel-group .panel-collapse:eq(1)').toContainText('Content2');
          expect('.visible-xs-block.panel-group .panel-collapse:eq(1)').toHaveClass('in');
        });
      });

      describe('when switching tabs', function() {
        it('switches tabs in both small-screen and large-screen tabs', function() {
          $('.hidden-xs li:eq(0) a').simulate('click');
          expect('.hidden-xs li.active').toContainText('Tab1');
          expect('.visible-xs-block .panel-title a[aria-expanded=true]').toContainText('Tab1');
          $('.visible-xs-block .panel-title:eq(1) a').simulate('click');
          expect('.hidden-xs li.active').toContainText('Tab2');
          expect('.visible-xs-block .panel-title a[aria-expanded=true]').toContainText('Tab2');
        });
      });

      describe('changing the defaultActiveKey props', function() {
        beforeEach(function() {
          emitter.emit('changeActiveKey', 1);
        });

        it('updates the current open tab', function() {
          expect('.hidden-xs li.active').toContainText('Tab1');
          expect('.visible-xs-block .panel-title a[aria-expanded=true]').toContainText('Tab1');
        });
      });
    });
  }


  describe('SimpleTabs', function() {
    itBehavesLikeTabs(SimpleTabs, 'tab-simple');
  });

  describe('SimpleAltTabs', function() {
    itBehavesLikeTabs(SimpleAltTabs, 'tab-simple-alt');
  });
});
