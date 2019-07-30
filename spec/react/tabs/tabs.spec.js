import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';
import {Tab, LeftTabs, Tabs} from '../../../src/react/tabs';
import MediaSize from '../../../src/react/tabs/media_size';

jest.useFakeTimers();

const mockGetTransitionProgress = jest.fn(() => 1);

jest.mock('../../../src/react/mixins/mixins/animation_mixin',
  () => ParentClass => class MockAnimation extends ParentClass {
    animate() {
      return mockGetTransitionProgress();
    }
  }
);

describe('Tabs', () => {
  let subject, onEnterSpy, onExitSpy;

  const renderComponent = props => {
    const mergedProps = {
      tabType: 'simple',
      ...props
    };
    onEnterSpy = jasmine.createSpy('onEnter');
    onExitSpy = jasmine.createSpy('onExit');

    const component = ReactDOM.render(
      <Tabs {...mergedProps}>
        <Tab eventKey={1} title="Tab1" tabClassName="tab-class" className="tab-content-class" onEntered={onEnterSpy}
             onExited={onExitSpy} aria-labelledby="provided-aria-label">Content1</Tab>
        <Tab eventKey={2} title="Tab2" onEntered={onEnterSpy} onExited={onExitSpy}>Content2</Tab>
        <Tab eventKey={3} disabled title="DisabledTab">DisabledContent</Tab>
      </Tabs>,
      root
    );
    onEnterSpy.calls.reset();
    onExitSpy.calls.reset();

    return component;
  };

  const triggerResize = () => {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, true);
    window.dispatchEvent(evt);
  };

  beforeEach(() => {
    mockGetTransitionProgress.mockReturnValue(1);
    spyOn(MediaSize, 'matches').and.returnValue(true);
  });

  describe('props', () => {
    describe('responsiveBreakpoint', () => {
      beforeEach(() => {
        subject = renderComponent({
          defaultActiveKey: 2,
          responsiveBreakpoint: 'xs',
          smallScreenClassName: 'small-class',
          largeScreenClassName: 'large-class'
        });
      });

      it('checks media', () => {
        expect(MediaSize.matches).toHaveBeenCalledWith('xs');
      });

      describe('when screen size is less than breakpoint', () => {
        beforeEach(() => {
          MediaSize.matches.and.returnValue(false);
          triggerResize();
        });

        it('switches tabs on click with animation, and calls onEntered/onExited when animation is done', () => {
          expect('.tab-content:eq(0)').toHaveAttr('aria-hidden', 'true');
          expect('.tab-content:eq(1)').toHaveAttr('aria-hidden', 'false');

          mockGetTransitionProgress.mockReturnValue(0);
          $('a:eq(0)').simulate('click');

          expect(onEnterSpy).not.toHaveBeenCalled();
          expect(onExitSpy).not.toHaveBeenCalled();

          mockGetTransitionProgress.mockReturnValue(1);
          subject.forceUpdate();

          expect(onEnterSpy).toHaveBeenCalledWith(1);
          expect(onExitSpy).toHaveBeenCalledWith(2);

          expect('.tab-content:eq(0)').toHaveAttr('aria-hidden', 'false');
          expect('.tab-content:eq(1)').toHaveAttr('aria-hidden', 'true');
        });

        it('renders an accordion', () => {
          expect('.panel-group').toExist();
          expect('.tab-simple').not.toExist();
        });

        it('passes small-screen classes', () => {
          expect('.panel-group').toHaveClass('small-class');
        });
      });

      describe('when screen size is greater than breakpoint', () => {
        it('switches tabs on click with animation, and calls onEntered/onExited when animation is done', () => {
          expect('.tab-content').toHaveText('Content2');
          expect($('.tab-content .tab-pane')[0].style.opacity).toEqual('');

          expect('a:eq(0)').toHaveText('Tab1');

          mockGetTransitionProgress.mockReturnValue(0);
          $('a:eq(0)').simulate('click');
          jest.advanceTimersByTime(1);

          mockGetTransitionProgress.mockReturnValue(0.25);
          subject.forceUpdate();

          expect('.tab-content').toHaveText('Content2');
          expect('.tab-content .tab-pane:eq(0)').toHaveCss({opacity: '0.5'});

          mockGetTransitionProgress.mockReturnValue(0.5);
          subject.forceUpdate();

          expect('.tab-content').toHaveText('Content1');
          expect('.tab-content .tab-pane:eq(0)').toHaveCss({opacity: '0'});

          expect(onEnterSpy).not.toHaveBeenCalled();
          expect(onExitSpy).not.toHaveBeenCalled();

          mockGetTransitionProgress.mockReturnValue(0.75);
          subject.forceUpdate();

          expect('.tab-content').toHaveText('Content1');
          expect('.tab-content .tab-pane:eq(0)').toHaveCss({opacity: '0.5'});

          mockGetTransitionProgress.mockReturnValue(1);
          subject.forceUpdate();

          expect(onEnterSpy).toHaveBeenCalledWith(1);
          expect(onExitSpy).toHaveBeenCalledWith(2);
          expect('.tab-content').toHaveText('Content1');
          expect($('.tab-content .tab-pane')[0].style.opacity).toEqual('');
        });

        it('renders a tabs', () => {
          expect('.tab-simple').toExist();
          expect('.panel-group').not.toExist();
        });

        it('passes large-screen classes', () => {
          expect('.tab-simple').toHaveClass('large-class');
        });
      });
    });

    describe('onSelect', () => {
      let onSelectSpy;

      beforeEach(() => {
        onSelectSpy = jasmine.createSpy('onSelectSpy');

        subject = renderComponent({
          defaultActiveKey: 2,
          onSelect: onSelectSpy
        });
      });

      it('uses the supplied onSelect method when clicking on large-screen tabs', () => {
        MediaSize.matches.and.returnValue(true);
        triggerResize();

        expect('a:eq(0)').toHaveText('Tab1');
        $('a:eq(0)').simulate('click');

        expect(onSelectSpy).toHaveBeenCalled();
      });

      it('uses the supplied onSelect method when clicking on small-screen tabs', () => {
        MediaSize.matches.and.returnValue(false);
        triggerResize();

        expect('a:eq(0)').toHaveText('Tab1');
        expect('a:eq(0)').toHaveAttr('href', '#');

        $('a:eq(0)').simulate('click');
        jest.advanceTimersByTime(1);

        expect(onSelectSpy).toHaveBeenCalled();
      });
    });

    describe('actions', () => {
      beforeEach(() => {
        const actions = (
          <div className="my-actions">
            <button>=)</button>
            <button>=|</button>
            <button>=(</button>
          </div>
        );
        subject = renderComponent({actions});
      });

      it('renders the actions for large screens', () => {
        const actionTabs = $('.tabs-action')[0];

        expect(actionTabs.parentNode).toHaveClass('tab-simple');
        expect(actionTabs.childNodes[0].className).toEqual('my-actions');
        expect(actionTabs.childNodes[0]).toHaveText('=)=|=(');
      });

      it('renders the actions for small screens', () => {
        MediaSize.matches.and.returnValue(false);
        triggerResize();

        const actionTabs = $('.tabs-action')[0];

        expect(actionTabs.parentNode).toHaveClass('tab-simple-small-screen');
        expect(actionTabs.childNodes[0].className).toEqual('my-actions');
        expect(actionTabs.childNodes[0]).toHaveText('=)=|=(');
      });
    });

    describe('passthroughs', () => {
      beforeEach(() => {
        subject = renderComponent({
          defaultActiveKey: 2,
          className: 'test-class',
          style: {opacity: '0.5'}
        });
      });

      it('passes through class and style', () => {
        expect('.tab-simple').toHaveClass('test-class');
        expect('.tab-simple').toHaveCss({opacity: '0.5'});
      });
    });

    describe('tabType', () => {
      beforeEach(() => {
        subject = renderComponent({
          tabType: 'simple-alt'
        });
      });

      it('attaches it as a class to the tabs', () => {
        expect('.tab-simple-alt > *:eq(0)').toHaveClass('nav-tabs');
      });
    });

    describe('tabClassName', () => {
      beforeEach(() => {
        subject = renderComponent({defaultActiveKey: 1});
      });

      it('applies the tabClassName to the clickable tab element', () => {
        const tab = $('a')[0];

        expect(tab.parentNode.parentNode).toHaveClass('nav-tabs');
        expect(tab).toHaveClass('tab-class');
      });

      it('applies the className on the tab to the tab content pane', () => {
        expect('.tab-content').toHaveClass('tab-content-class');
        expect('.tab-content').toHaveText('Content1');
      });
    });

    describe('animation: false', () => {
      beforeEach(() => {
        mockGetTransitionProgress.mockReturnValue(1);
        subject = renderComponent({defaultActiveKey: 1, animation: false});
      });

      it('calls onEntered and onExited immediately', () => {
        $('a:eq(1)').simulate('click');
        jest.advanceTimersByTime(1);

        expect(onEnterSpy).toHaveBeenCalledWith(2);
        expect(onExitSpy).toHaveBeenCalledWith(1);
      });

      it('changes tabs immediately, without animation', () => {
        expect('.active:eq(0)').toHaveText('Tab1');
        expect('.tab-content').toHaveText('Content1');

        $('a:eq(1)').simulate('click');
        jest.advanceTimersByTime(1);

        expect('.active:eq(0)').toHaveText('Tab2');
        expect('.tab-content').toHaveText('Content2');
      });
    });
  });

  describe('tab props', () => {
    beforeEach(() => {
      subject = renderComponent({defaultActiveKey: 1, animation: false, id: 'foo'});
    });

    describe('with small tabs', () => {
      beforeEach(() => {
        MediaSize.matches.and.returnValue(false);
        triggerResize();
      });

      it('respects disabled tabs', () => {
        expect('a:eq(2)').toHaveClass('disabled');

        $('a:eq(2)').simulate('click');
        jest.runAllTimers();

        expect('.in:eq(0)').toHaveText('Content1');
      });

      it('does not add a hash to the url on click', () => {
        let preventDefaultCalled = false;
        expect('.tab-heading .active').toHaveText('Tab1');

        $('h4:eq(1) a:eq(0)').simulate('click', {
          preventDefault: () => preventDefaultCalled = true
        });
        jest.advanceTimersByTime(1);

        expect(preventDefaultCalled).toBeTruthy();
        expect('.tab-heading .active').toHaveText('Tab2');
      });

      describe('aria-labelledby', () => {
        it('uses the provided value, if given', () => {
          expect('.in:eq(0)').toHaveAttr('aria-labelledby', 'provided-aria-label');
        });

        it('generates a default value', () => {
          ReactDOM.unmountComponentAtNode(root);
          subject = renderComponent({defaultActiveKey: 2, id: 'foo'});

          expect('.in:eq(1)').toHaveAttr('aria-labelledby', 'foo-tab-1');
        });
      });
    });

    describe('with regular tabs', () => {
      beforeEach(() => {
        MediaSize.matches.and.returnValue(true);
        triggerResize();
      });

      describe('aria-labelledby', () => {
        it('uses the provided value, if given', () => {
          expect('.tab-pane').toHaveAttr('aria-labelledby', 'provided-aria-label');
        });

        it('generates a default value', () => {
          ReactDOM.unmountComponentAtNode(root);
          subject = renderComponent({defaultActiveKey: 2, id: 'foo'});

          expect('.tab-pane').toHaveAttr('aria-labelledby', 'foo-tab-1');
        });
      });

      it('sets up the correct aria-controls relationship and aria-selected value', () => {
        const tabPane = $('.tab-pane')[0];
        const links = $('a');
        const activeTabLink = links[0];

        expect(activeTabLink.parentNode).toHaveClass('active');
        expect(activeTabLink).toHaveAttr('aria-controls', tabPane.id);
        expect(activeTabLink).toHaveAttr('aria-selected', 'true');
        expect(activeTabLink).toHaveAttr('href', '#');

        const nonActiveTabLink = links[1];
        expect(nonActiveTabLink.parentNode).not.toHaveClass('active');
        expect(nonActiveTabLink).not.toHaveAttr('aria-controls', tabPane.id);
        expect(nonActiveTabLink).toHaveAttr('aria-selected', 'false');
        expect(nonActiveTabLink).toHaveAttr('href', '#');
      });

      it('sets tabIndex on each link', () => {
        const links = $('a').toArray();
        links.forEach(link => expect(link).toHaveAttr('tabIndex', '0'));
      });

      it('sets aria-expanded to the correct values on the list items', () => {
        expect('li:eq(0)').toHaveClass('active');
        expect('li:eq(0)').toHaveAttr('aria-expanded', 'true');

        expect('li:eq(1)').not.toHaveClass('active');
        expect('li:eq(1)').toHaveAttr('aria-expanded', 'false');
      });

      it('respects disabled tabs', () => {
        expect('li:eq(2)').toHaveClass('disabled');

        $('li:eq(2) a:eq(0)').simulate('click');
        jest.advanceTimersByTime(1);

        expect('a:eq(0)').toHaveText('Tab1');
      });

      it('does not add a hash to the url on click', () => {
        let preventDefaultCalled = false;
        expect('.nav-tabs .active').toHaveText('Tab1');

        $('li:eq(1) a:eq(0)').simulate('click', {
          preventDefault: () => preventDefaultCalled = true
        });
        jest.advanceTimersByTime(1);

        expect(preventDefaultCalled).toBeTruthy();
        expect('.nav-tabs .active').toHaveText('Tab2');
      });
    });
  });
});

describe('LeftTabs', () => {
  let subject;

  const renderComponent = props => ReactDOM.render(
    <LeftTabs {...props}>
      <Tab eventKey={1} title="Tab1">Content1</Tab>
      <Tab eventKey={2} title="Tab2">Content2</Tab>
    </LeftTabs>,
    root
  );

  beforeEach(() => {
    jest.spyOn(MediaSize, 'matches').mockReturnValue(true);
  });

  it('passes all properties', () => {
    const onSelectSpy = jasmine.createSpy();
    subject = renderComponent({
      defaultActiveKey: 1,
      responsiveBreakpoint: 'sm',
      largeScreenClassName: 'lgclass',
      smallScreenClassName: 'smclass',
      onSelect: onSelectSpy
    });

    expect(subject.props.defaultActiveKey).toEqual(1);
    expect(subject.props.responsiveBreakpoint).toEqual('sm');
    expect(subject.props.smallScreenClassName).toEqual('smclass');
    expect(subject.props.largeScreenClassName).toEqual('lgclass');
    expect(subject.props.onSelect).toEqual(onSelectSpy);
  });

  it('renders tabs stacked', () => {
    subject = renderComponent();
    expect('.grid > .col > .nav').toExist();
    expect('.grid > .col > .nav').toHaveClass('nav-stacked');
  });

  it('renders a Tabs component with tabType="left"', () => {
    subject = renderComponent();
    const tabs = ReactTestUtils.findRenderedComponentWithType(subject, Tabs);

    expect(tabs.props.position).toEqual('left');
    expect(tabs.props.tabType).toEqual('left');
  });

  describe('when props are passed for tabWidth', () => {
    it('uses that values', () => {
      subject = renderComponent({tabWidth: 4});
      const tabs = ReactTestUtils.findRenderedComponentWithType(subject, Tabs);
      expect(tabs.props.tabWidth).toEqual(4);
    });
  });

  describe('when tabWidth is not passed', () => {
    it('passes a default size to Tabs', () => {
      subject = renderComponent();
      const tabs = ReactTestUtils.findRenderedComponentWithType(subject, Tabs);
      expect(tabs.props.tabWidth).toEqual(3);
    });
  });
});