require('../spec_helper');

describe('Tabs', function() {
  const tabType = 'simple';

  let subject, Collapsible, Tab, Tabs, LeftTabs, EventEmitter, itPropagatesAttributes;
  beforeEach(() => {
    Collapsible = require('../../../src/pivotal-ui-react/collapse/collapse').Collapse;
    Tab = require('../../../src/pivotal-ui-react/tabs/tabs').Tab;
    Tabs = require('../../../src/pivotal-ui-react/tabs/tabs').Tabs;
    LeftTabs = require('../../../src/pivotal-ui-react/tabs/tabs').LeftTabs;
    EventEmitter = require('node-event-emitter');
    itPropagatesAttributes = require('../support/shared_examples');
  });

  const triggerResize = function() {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, true);
    window.dispatchEvent(evt);
  };

  let MediaSize;

  beforeEach(function() {
    MediaSize = require('../../../src/pivotal-ui-react/tabs/media-size');
    spyOn(MediaSize, 'matches').and.returnValue(true);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  describe('props', function() {
    describe('responsiveBreakpoint', function() {
      beforeEach(function() {
        ReactDOM.render(
          <Tabs defaultActiveKey={2}
                tabType={tabType}
                responsiveBreakpoint="xs"
                smallScreenClassName="small-class"
                largeScreenClassName="large-class"/>,
          root
        );
      });

      it('checks media', function() {
        expect(MediaSize.matches).toHaveBeenCalledWith('xs');
      });

      describe('when screen size is less than breakpoint', function() {
        beforeEach(function() {
          MediaSize.matches.and.returnValue(false);
          triggerResize();
        });

        it('renders an accordion', function() {
          expect('.panel-group').toExist();
          expect('.tab-simple').not.toExist();
        });

        it('passes small-screen classes', function() {
          expect('.panel-group').toHaveClass('small-class');
        });
      });

      describe('when screen size is greater than breakpoint', function() {
        beforeEach(function() {
          MediaSize.matches.and.returnValue(true);
          triggerResize();
        });

        it('renders a tabs', function() {
          expect('.panel-group').not.toExist();
          expect('.tab-simple').toExist();
        });

        it('passes large-screen classes', function() {
          expect('.tab-simple').toHaveClass('large-class');
        });
      });
    });

    describe('onSelect', function() {
      let onSelectSpy;

      beforeEach(function() {
        onSelectSpy = jasmine.createSpy('onSelectSpy');

        ReactDOM.render(
          <Tabs defaultActiveKey={2} tabType={tabType} onSelect={onSelectSpy}>
            <Tab eventKey={1} title="Tab1">Content1</Tab>
            <Tab eventKey={2} title="Tab2">Content2</Tab>
          </Tabs>,
          root
        );
      });

      it('uses the supplied onSelect method when clicking on large-screen tabs', function() {
        MediaSize.matches.and.returnValue(true);
        triggerResize();

        $(`.tab-${tabType} li a:eq(0)`).simulate('click');
        expect(onSelectSpy).toHaveBeenCalled();
      });

      it('uses the supplied onSelect method when clicking on small-screen tabs', function() {
        MediaSize.matches.and.returnValue(false);
        triggerResize();
        $('.tab-title a:eq(0)').simulate('click');
        expect(onSelectSpy).toHaveBeenCalled();
      });
    });

    describe('actions', () => {
      beforeEach(() => {
        const actions = (
          <div>
            <button>=)</button>
            <button>=|</button>
            <button>=(</button>
          </div>
        );
        ReactDOM.render(
          <Tabs tabType={tabType} actions={actions}>
            <Tab eventKey={1} title="Tab1">Content1</Tab>
            <Tab eventKey={2} title="Tab2">Content2</Tab>
          </Tabs>,
          root
        );
      });

      it('renders the actions for large screens', () => {
        expect('.tab-simple .tabs-action').toContainText('=)');
        expect('.tab-simple .tabs-action').toContainText('=|');
        expect('.tab-simple .tabs-action').toContainText('=(');
      });

      it('renders the actions for small screens', () => {
        MediaSize.matches.and.returnValue(false);
        triggerResize();
        expect('.tab-simple-small-screen .tabs-action').toContainText('=)');
        expect('.tab-simple-small-screen .tabs-action').toContainText('=|');
        expect('.tab-simple-small-screen .tabs-action').toContainText('=(');
      });
    });

    describe('passthroughs', function() {
      beforeEach(function() {
        ReactDOM.render(
          <Tabs defaultActiveKey={2}
                tabType={tabType}
                className="test-class"
                style={{opacity: 0.5}}/>,
          root
        );

      });
      it('passes through class and style', () => {
        expect('#root .tab-simple').toHaveClass('test-class');
        expect('#root .tab-simple').toHaveCss({opacity: '0.5'});
      });
    });

    describe('tabType', () => {
      beforeEach(function() {
        ReactDOM.render(
          <Tabs defaultActiveKey={2}
                tabType="simple-alt"
                className="test-class"
                style={{opacity: 0.5}}/>,
          root
        );
      });

      it('attaches it as a class to the tabs', () => {
        expect('.tab-simple-alt ul').toExist();
      });
    });

    describe('tabClassName', () => {
      beforeEach(function() {
        ReactDOM.render(
          <Tabs tabType={tabType} defaultActiveKey={1}>
            <Tab eventKey={1} title="Tab1" tabClassName="tab-class" className="tab-content-class">Content1</Tab>
            <Tab eventKey={2} title="Tab2">Content2</Tab>
          </Tabs>,
          root
        );
      });

      it('moves the tabClassName to the tab', () => {
        expect('.nav-tabs li:eq(0) a').toHaveClass('tab-class');
      });

      it('preserves the tab className in the tab content', () => {
        expect('.tab-content-class').toHaveText('Content1');
      });
    });

    describe('animation: false', () => {
      beforeEach(() => {
        ReactDOM.render(
          <Tabs tabType={tabType} defaultActiveKey={1} animation={false}>
            <Tab eventKey={1} title="Tab1" tabClassName="tab-class" className="tab-content-class">Content1</Tab>
            <Tab eventKey={2} title="Tab2">Content2</Tab>
          </Tabs>,
          root
        );
      });

      it('changes tabs immediately, without animation', () => {
        expect('li.active').toContainText('Tab1');
        $('.nav li:eq(1) a').simulate('click');
        expect('li.active').toContainText('Tab2');
        expect('.tab-content').toContainText('Content2');
        expect('.tab-content .tab-pane').toHaveCss({opacity: 1.0});
      });
    });
  });

  describe('tab behavior', function() {
    let emitter;
    const tabHeight = 24;

    beforeEach(function() {
      emitter = new EventEmitter();

      class TestComponent extends React.Component {
        constructor(props, context) {
          super(props, context);
          this.state = {defaultActiveKey: 2};
        }

        componentDidMount() {
          emitter.on('changeActiveKey', (key) => this.setState({defaultActiveKey: key}));
        }

        render() {
          return (
            <Tabs defaultActiveKey={this.state.defaultActiveKey} tabType={tabType}>
              <Tab eventKey={1} title="Tab1"><div style={{height: tabHeight}}>Content1</div></Tab>
              <Tab eventKey={2} title="Tab2"><div style={{height: tabHeight}}>Content2</div></Tab>
            </Tabs>
          );
        }
      }

      ReactDOM.render(<TestComponent />, root);
    });

    it('creates tabs in the correct container', function() {
      expect(`.tab-${tabType} ul.nav.nav-tabs li.active`).toContainText('Tab2');
      expect(`.tab-${tabType} .tab-content .tab-pane.fade.active.in`).toContainText('Content2');
    });

    describe('for screens greater than the responsiveBreakpoint', function() {
      beforeEach(function() {
        MediaSize.matches.and.returnValue(true);
        triggerResize();
      });
      it('displays tabs in a simple tab container', function() {
        expect(`.tab-${tabType} .nav li.active`).toContainText('Tab2');
        expect(`.tab-${tabType} .tab-content`).toContainText('Content2');
      });

      it('switches tabs on click with animation', function() {
        $('.nav li:eq(0) a').simulate('click');
        expect('li.active').toContainText('Tab1');

        MockNow.tick(Tabs.ANIMATION_TIME / 4);
        MockRaf.next();
        expect(`.tab-${tabType} .tab-content`).toContainText('Content2');
        expect(`.tab-${tabType} .tab-content .tab-pane`).toHaveCss({opacity: 0.5});

        MockNow.tick(Tabs.ANIMATION_TIME / 2);
        MockRaf.next();
        expect(`.tab-${tabType} .tab-content`).toContainText('Content1');
        expect(`.tab-${tabType} .tab-content .tab-pane`).toHaveCss({opacity: 0.5});

        MockNow.tick(Tabs.ANIMATION_TIME / 4);
        MockRaf.next();
        expect(`.tab-${tabType} .tab-content`).toContainText('Content1');
        expect(`.tab-${tabType} .tab-content .tab-pane`).toHaveCss({opacity: 1.0});

        $('.nav li:eq(1) a').simulate('click');
        expect('li.active').toContainText('Tab2');
      });

      describe('changing the defaultActiveKey props', function() {
        beforeEach(function() {
          emitter.emit('changeActiveKey', 1);
        });

        it('updates the current open tab', function() {
          expect('.nav li.active').toContainText('Tab1');
        });
      });
    });

    describe('for screens smaller than the responsiveBreakpoint', function() {
      beforeEach(function() {
        MediaSize.matches.and.returnValue(false);
        triggerResize();
      });

      afterEach(function() {
        MockRaf.next();
      });

      it('renders an accordion', function() {
        expect('.panel-group').toExist();
      });

      it('renders headers for each tab', function() {
        expect('.panel-group .tab-heading:eq(0)').toContainText('Tab1');
        expect('.panel-group .tab-heading:eq(1)').toContainText('Tab2');
        expect('.panel-group .tab-heading a:eq(1)').toHaveAttr('aria-expanded', 'true');
      });

      it('renders content for the active tab', function() {
        expect('.panel-group .tab-content.in').toContainText('Content2');
      });

      it('switches tabs on click with animation', function() {
        $('.tab-heading:eq(0) a').simulate('click');
        MockNow.tick(Collapsible.ANIMATION_TIME);
        MockRaf.next();

        expect(`.tab-${tabType}-small-screen`).toContainText('Content1');
        expect(`.tab-${tabType}-small-screen .tab-content:eq(0)`).toHaveClass('in');
        expect(`.tab-${tabType}-small-screen .tab-content:eq(1)`).not.toHaveClass('in');

        $('.tab-heading:eq(1) a').simulate('click');
        MockNow.tick(Collapsible.ANIMATION_TIME);
        MockRaf.next();

        expect(`.tab-${tabType}-small-screen`).toContainText('Content2');
        expect(`.tab-${tabType}-small-screen .tab-content:eq(0)`).not.toHaveClass('in');
        expect(`.tab-${tabType}-small-screen .tab-content:eq(1)`).toHaveClass('in');

        expect('.tab-heading a[aria-expanded=true]').toContainText('Tab2');

      });

      describe('changing the defaultActiveKey props', function() {
        beforeEach(function() {
          emitter.emit('changeActiveKey', 1);
          MockNow.tick(Tabs.ANIMATION_TIME);
          MockRaf.next();
        });

        it('updates the current open tab', function() {
          expect('.tab-heading a[aria-expanded=true]').toContainText('Tab1');
        });
      });

      describe('Tab props', () => {
        it('respects disabled tabs', () => {
          ReactDOM.render(
            <Tabs tabType={tabType} defaultActiveKey={1}>
              <Tab eventKey={1} title="Tab1">Content1</Tab>
              <Tab eventKey={2} title="Tab2" disabled>Content2</Tab>
            </Tabs>,
            root
          );

          expect('.tab-title:eq(1) > a').toHaveClass('disabled');
          $('.tab-title a:eq(1)').simulate('click');
          MockNow.tick(Tabs.ANIMATION_TIME);
          MockRaf.next();
          expect('.tab-title [aria-expanded="true"]').toContainText('Tab1');
          expect('.tab-content.in').toContainText('Content1');
        });

        it('uses custom aria-labelledby', () => {
          ReactDOM.render(
            <Tabs tabType={tabType} defaultActiveKey={1} id="foo">
              <Tab eventKey={1} title="Tab1" aria-labelledby="custom-aria-label">Content1</Tab>
              <Tab eventKey={2} title="Tab2">Content2</Tab>
            </Tabs>,
            root
          );
          expect('.tab-content.in').toHaveAttr('aria-labelledby', 'custom-aria-label');
        });

        it('generates aria-labelledby for the tab pane if not given one', () => {
          ReactDOM.render(
            <Tabs tabType={tabType} defaultActiveKey={1} id="foo">
              <Tab eventKey={1} title="Tab1">Content1</Tab>
              <Tab eventKey={2} title="Tab2">Content2</Tab>
            </Tabs>,
            root
          );
          expect('.tab-content.in').toHaveAttr('aria-labelledby', 'foo-tab-0');
        });

        describe('onEntered/onExited', () => {
          let onEnterSpy, onExitSpy;
          beforeEach(() => {
            onEnterSpy = jasmine.createSpy('onEnter');
            onExitSpy = jasmine.createSpy('onExit');
            subject = ReactDOM.render(
              <Tabs tabType={tabType} defaultActiveKey={1}>
                <Tab eventKey={1} title="Tab1" onExited={onExitSpy}>Content1</Tab>
                <Tab eventKey={2} title="Tab2" onEntered={onEnterSpy}>Content2</Tab>
              </Tabs>,
              root
            );
          });

          it('calls onEntered and onExited when the animation is done', () => {
            $('.tab-title a:eq(1)').simulate('click');
            expect(onEnterSpy).not.toHaveBeenCalled();
            expect(onExitSpy).not.toHaveBeenCalled();
            MockNow.tick(Tabs.ANIMATION_TIME);
            MockRaf.next();
            expect(onEnterSpy).toHaveBeenCalledWith(2);
            expect(onExitSpy).toHaveBeenCalledWith(1);
          });

          describe('with animation false', () => {
            beforeEach(() => {
              subject::setProps({animation: false});
            });

            it('calls onEntered and onExited immediately', () => {
              $('.tab-title a:eq(1)').simulate('click');
              expect(onEnterSpy).toHaveBeenCalledWith(2);
              expect(onExitSpy).toHaveBeenCalledWith(1);
            });
          });
        });
      });
    });

    it('sets up the correct aria-controls relationship', function() {
      let pane1 = $(root).find(`.tab-${tabType} .tab-pane:first`);
      expect(pane1.length).toEqual(1);
      expect(pane1.attr('id')).toBeTruthy();
      expect(`.tab-${tabType} ul.nav.nav-tabs li:eq(1) a`).toHaveAttr('aria-controls', pane1.attr('id'));
    });
  });

  describe('positioning', function() {
    function renderTabs(props = {}) {
      ReactDOM.render(
        <LeftTabs defaultActiveKey={1} {...props}>
          <Tab eventKey={1} title="Tab1">Content1</Tab>
          <Tab eventKey={2} title="Tab2">Content2</Tab>
        </LeftTabs>,
        root
      );
    }

    it('should render tabs stacked on the left', function() {
      renderTabs({position: 'left', tabWidth: 2, paneWidth: 7});
      expect('ul.nav').toHaveClass('nav-stacked');
    });
  });

  describe('Tab props', () => {
    it('respects disabled tabs', () => {
      ReactDOM.render(
        <Tabs tabType={tabType} defaultActiveKey={1}>
          <Tab eventKey={1} title="Tab1">Content1</Tab>
          <Tab eventKey={2} title="Tab2" disabled>Content2</Tab>
        </Tabs>,
        root
      );

      expect('.nav-tabs li:eq(1)').toHaveClass('disabled');
      $(`.tab-${tabType} li a:eq(1)`).simulate('click');
      MockNow.tick(Tabs.ANIMATION_TIME);
      MockRaf.next();
      expect('li.active').toContainText('Tab1');
      expect('.tab-content').toContainText('Content1');
    });

    it('uses custom aria-labelledby', () => {
      ReactDOM.render(
        <Tabs tabType={tabType} defaultActiveKey={1} id="foo">
          <Tab eventKey={1} title="Tab1" aria-labelledby="custom-aria-label">Content1</Tab>
          <Tab eventKey={2} title="Tab2">Content2</Tab>
        </Tabs>,
        root
      );
      expect('.tab-pane').toHaveAttr('aria-labelledby', 'custom-aria-label');
    });

    it('generates aria-labelledby for the tab pane if not given one', () => {
      ReactDOM.render(
        <Tabs tabType={tabType} defaultActiveKey={1} id="foo">
          <Tab eventKey={1} title="Tab1">Content1</Tab>
          <Tab eventKey={2} title="Tab2">Content2</Tab>
        </Tabs>,
        root
      );
      expect('.tab-pane').toHaveAttr('aria-labelledby', 'foo-tab-0');
    });

    describe('onEntered/onExited', () => {
      let onEnterSpy, onExitSpy;
      beforeEach(() => {
        onEnterSpy = jasmine.createSpy('onEnter');
        onExitSpy = jasmine.createSpy('onExit');
        subject = ReactDOM.render(
          <Tabs tabType={tabType} defaultActiveKey={1}>
            <Tab eventKey={1} title="Tab1" onExited={onExitSpy}>Content1</Tab>
            <Tab eventKey={2} title="Tab2" onEntered={onEnterSpy}>Content2</Tab>
          </Tabs>,
          root
        );
      });

      it('calls onEntered and onExited when the animation is done', () => {
        $(`.tab-${tabType} li a:eq(1)`).simulate('click');
        expect(onEnterSpy).not.toHaveBeenCalled();
        expect(onExitSpy).not.toHaveBeenCalled();
        MockNow.tick(Tabs.ANIMATION_TIME);
        MockRaf.next();
        expect(onEnterSpy).toHaveBeenCalledWith(2);
        expect(onExitSpy).toHaveBeenCalledWith(1);
      });

      describe('with animation false', () => {
        beforeEach(() => {
          subject::setProps({animation: false});
        });

        it('calls onEntered and onExited immediately', () => {
          $(`.tab-${tabType} li a:eq(1)`).simulate('click');
          expect(onEnterSpy).toHaveBeenCalledWith(2);
          expect(onExitSpy).toHaveBeenCalledWith(1);
        });
      });
    });
  });
});

describe('LeftTabs', function() {
  let LeftTabs, Tab, Tabs;
  beforeEach(() => {
    LeftTabs = require('../../../src/pivotal-ui-react/tabs/tabs').LeftTabs;
    Tab = require('../../../src/pivotal-ui-react/tabs/tabs').Tab;
    Tabs = require('../../../src/pivotal-ui-react/tabs/tabs').Tabs;

  });
  it('renders the Tabs component with tabType="left"', function() {
    const result = shallowRender(
      <LeftTabs>
        I am children
      </LeftTabs>
    );
    expect(result.type).toEqual(Tabs);
    expect(result.props.position).toEqual('left');
    expect(result.props.tabType).toEqual('left');
    expect(result.props.children).toEqual('I am children');
  });

  it('passes all properties', function() {
    const onSelect = jasmine.createSpy();
    const result = shallowRender(
      <LeftTabs defaultActiveKey={1}
                responsiveBreakpoint="sm"
                largeScreenClassName="lgclass"
                smallScreenClassName="smclass"
                onSelect={onSelect}/>
    );
    expect(result.props.defaultActiveKey).toEqual(1);
    expect(result.props.responsiveBreakpoint).toEqual('sm');
    expect(result.props.smallScreenClassName).toEqual('smclass');
    expect(result.props.largeScreenClassName).toEqual('lgclass');
    expect(result.props.onSelect).toEqual(onSelect);
  });

  describe('when props are passed for tabWidth and paneWidth', function() {
    it('passes the provided column sizes tp Tabs', function() {
      const result = shallowRender(
        <LeftTabs tabWidth={4} paneWidth={6}/>
      );
      expect(result.props.tabWidth).toEqual(4);
      expect(result.props.paneWidth).toEqual(6);
    });
  });

  describe('when tabWidth is passed and paneWidth is not', function() {
    it('passes the correct column sizes to Tabs', function() {
      const result = shallowRender(
        <LeftTabs tabWidth={4}/>
      );
      expect(result.props.tabWidth).toEqual(4);
      expect(result.props.paneWidth).toEqual(20);
    });
  });

  describe('when neither tabWidth nor paneWidth are passed', function() {
    it('passes the correct column sizes to Tabs', function() {
      const result = shallowRender(
        <LeftTabs />
      );
      expect(result.props.tabWidth).toEqual(6);
      expect(result.props.paneWidth).toEqual(18);
    });
  });
});
