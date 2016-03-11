require('../spec_helper');

describe('Tabs', function() {
  const tabType = 'simple';

  let Tab, Tabs, LeftTabs, EventEmitter, itPropagatesAttributes;
  beforeEach(() => {
    Tab = require('../../../src/pivotal-ui-react/tabs/tabs').Tab;
    Tabs = require('../../../src/pivotal-ui-react/tabs/tabs').Tabs;
    LeftTabs = require('../../../src/pivotal-ui-react/tabs/tabs').LeftTabs;
    EventEmitter = require('node-event-emitter');
    itPropagatesAttributes = require('../support/shared_examples')
  });

  const triggerResize = function() {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, true );
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
                largeScreenClassName="large-class">
          </Tabs>,
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
        $(`.tab-title a:eq(0)`).simulate('click');
        expect(onSelectSpy).toHaveBeenCalled();
      });
    });

    xdescribe('actions', () => {
      beforeEach(() => {
        ReactDOM.render(
          <Tabs>
            tabType={tabType}
            actions={
              <div>
                <button>=)</button>
                <button>=|</button>
                <button>=(</button>
              </div>}
          </Tabs>,
          root
        );
      });

      it('renders the actions', () => {
        expect($('.nav-tabs .actions')).toContain('=)');
        expect($('.nav-tabs .actions')).toContain('=|');
        expect($('.nav-tabs .actions')).toContain('=(');
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
    })
  });

  describe('tab behavior', function() {
    let emitter;

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
              <Tab eventKey={1} title="Tab1">Content1</Tab>
              <Tab eventKey={2} title="Tab2">Content2</Tab>
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
        expect(`.tab-${tabType} .tab-content`).toHaveCss({opacity: 0.5});

        MockNow.tick(Tabs.ANIMATION_TIME / 2);
        MockRaf.next();
        expect(`.tab-${tabType} .tab-content`).toContainText('Content1');
        expect(`.tab-${tabType} .tab-content`).toHaveCss({opacity: 0.5});

        MockNow.tick(Tabs.ANIMATION_TIME / 4);
        MockRaf.next();
        expect(`.tab-${tabType} .tab-content`).toContainText('Content1');
        expect(`.tab-${tabType} .tab-content`).toHaveCss({opacity: 1.0});

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
        expect('.panel-group .tab-collapse:eq(1)').toContainText('Content2');
        expect('.panel-group .tab-collapse:eq(1)').toHaveClass('in');
      });

      it('switches tabs on click with animation', function() {
        $('.tab-heading:eq(0) a').simulate('click');

        MockNow.tick(Tabs.ANIMATION_TIME / 4);
        MockRaf.next();
        expect(`.tab-${tabType}-small-screen`).toContainText('Content2');

        MockNow.tick(Tabs.ANIMATION_TIME / 2);
        MockRaf.next();
        expect(`.tab-${tabType}-small-screen`).toContainText('Content1');
        expect('.tab-heading a[aria-expanded=true]').toContainText('Tab1');

        MockNow.tick(Tabs.ANIMATION_TIME / 4);
        MockRaf.next();
        expect(`.tab-${tabType}-small-screen`).toContainText('Content1');

        $('.tab-heading:eq(1) a').simulate('click');
        MockNow.tick(Tabs.ANIMATION_TIME);
        MockRaf.next();
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
                onSelect={onSelect}>
      </LeftTabs>
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
