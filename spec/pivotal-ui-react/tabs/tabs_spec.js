import '../spec_helper';
import {Tab, LeftTabs, Tabs} from '../../../src/react/tabs';
import MediaSize from '../../../src/react/tabs/media-size';

import {findAllByClass, findByClass, findAllByTag, clickOn} from '../spec_helper';

describe('Tabs', () => {
  let subject, onEnterSpy, onExitSpy;

  const renderComponent = props => {
    const mergedProps = {
      tabType: 'simple',
      ...props
    };
    onEnterSpy = jest.fn().mockName('onEnter');
    onExitSpy = jest.fn().mockName('onExit');

    const component = subject = shallow(<Tabs {...mergedProps}>
      <Tab eventKey={1} title="Tab1" tabClassName="tab-class" className="tab-content-class" onEntered={onEnterSpy}
           onExited={onExitSpy} aria-labelledby="provided-aria-label">Content1</Tab>
      <Tab eventKey={2} title="Tab2" onEntered={onEnterSpy} onExited={onExitSpy}>Content2</Tab>
      <Tab eventKey={3} disabled title="DisabledTab">DisabledContent</Tab>
    </Tabs>);
    onEnterSpy.mockReset();
    onExitSpy.mockReset();

    return component;
  };

  const triggerResize = () => {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, true);
    window.dispatchEvent(evt);
  };

  beforeEach(() => {
    spyOn(MediaSize, 'matches').mockReturnValue(true);
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
          MediaSize.matches.mockReturnValue(false);
          triggerResize();
        });

        it('switches tabs on click with animation, and calls onEntered/onExited when animation is done', () => {
          let tabContent = findAllByClass(subject, 'tab-content');
          expect(subject.find(tabContent[0]).hasClass('in')).toBeFalsy();
          expect(subject.find(tabContent[1]).hasClass('in')).toBeTruthy();

          const firstTab = findAllByTag(subject, 'a')[0];
          firstTab.simulate('click', fakeEvent);

          expect(onEnterSpy).not.toHaveBeenCalled();
          expect(onExitSpy).not.toHaveBeenCalled();

          MockNow.tick(Tabs.ANIMATION_TIME);
          MockRaf.next();

          expect(onEnterSpy).toHaveBeenCalledWith(1);
          expect(onExitSpy).toHaveBeenCalledWith(2);

          tabContent = findAllByClass(subject, 'tab-content');

          expect(subject.find(tabContent[0]).hasClass('in')).toBeTruthy();
          expect(subject.find(tabContent[1]).hasClass('in')).toBeFalsy();
        });

        it('renders an accordion', () => {
          expect(subject.find('.panel-group')).toBeTruthy();
          expect(findAllByClass(subject, 'tab-simple').length).toEqual(0);
        });

        it('passes small-screen classes', () => {
          const panelGroup = subject.find('.panel-group');
          expect(subject.find(panelGroup).hasClass('small-class')).toBeTruthy();
        });
      });

      describe('when screen size is greater than breakpoint', () => {
        it('switches tabs on click with animation, and calls onEntered/onExited when animation is done', () => {
          let tabContent = subject.find('.tab-content');
          expect(subject.find(tabContent).text()).toBe('Content2');
          expect(tabContent.getElementsByClassName('tab-pane')[0].style.opacity).toEqual('');

          const clickable = findAllByTag(subject, 'a')[0];
          expect(subject.find(clickable).text()).toBe('Tab1');
          clickable.simulate('click', fakeEvent);
          jasmine.clock().tick(1);

          MockNow.tick(Tabs.ANIMATION_TIME / 4);
          MockRaf.next();
          tabContent = subject.find('.tab-content');
          expect(subject.find(tabContent).text()).toBe('Content2');
          expect(subject.find(tabContent.getElementsByClassName('tab-pane')[0]).prop('style')).toEqual({opacity: '0.5'});

          MockNow.tick(Tabs.ANIMATION_TIME / 2);
          MockRaf.next();
          tabContent = subject.find('.tab-content');
          expect(subject.find(tabContent).text()).toBe('Content1');
          expect(subject.find(tabContent.getElementsByClassName('tab-pane')[0]).prop('style')).toEqual({opacity: '0.5'});
          expect(onEnterSpy).not.toHaveBeenCalled();
          expect(onExitSpy).not.toHaveBeenCalled();

          MockNow.tick(Tabs.ANIMATION_TIME / 2);
          MockRaf.next();
          expect(onEnterSpy).toHaveBeenCalledWith(1);
          expect(onExitSpy).toHaveBeenCalledWith(2);
          tabContent = subject.find('.tab-content');
          expect(subject.find(tabContent).text()).toBe('Content1');
          expect(tabContent.getElementsByClassName('tab-pane')[0].style.opacity).toEqual('');
        });

        it('renders a tabs', () => {
          expect(subject.find('.tab-simple')).toBeTruthy();
          expect(findAllByClass(subject, 'panel-group').length).toEqual(0);
        });

        it('passes large-screen classes', () => {
          const panelGroup = subject.find('.tab-simple');
          expect(subject.find(panelGroup).hasClass('large-class')).toBeTruthy();
        });
      });
    });

    describe('onSelect', () => {
      let onSelectSpy;

      beforeEach(() => {
        onSelectSpy = jest.fn().mockName('onSelectSpy');

        subject = renderComponent({
          defaultActiveKey: 2,
          onSelect: onSelectSpy
        });
      });

      it('uses the supplied onSelect method when clicking on large-screen tabs', () => {
        MediaSize.matches.mockReturnValue(true);
        triggerResize();

        const clickable = findAllByTag(subject, 'a')[0];
        expect(subject.find(clickable).text()).toBe('Tab1');
        clickable.simulate('click', fakeEvent);

        expect(onSelectSpy).toHaveBeenCalled();
      });

      it('uses the supplied onSelect method when clicking on small-screen tabs', () => {
        MediaSize.matches.mockReturnValue(false);
        triggerResize();

        const clickable = findAllByTag(subject, 'a')[0];
        expect(subject.find(clickable).text()).toBe('Tab1');
        clickable.simulate('click', fakeEvent);
        jasmine.clock().tick(1);

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
        const actionTabs = subject.find('.tabs-action');

        expect(subject.find(actionTabs.parentNode).hasClass('tab-simple')).toBeTruthy();
        expect(actionTabs.childNodes[0].className).toEqual('my-actions');
        expect(subject.find(actionTabs.childNodes[0]).text()).toBe('=)=|=(');
      });

      it('renders the actions for small screens', () => {
        MediaSize.matches.mockReturnValue(false);
        triggerResize();

        const actionTabs = subject.find('.tabs-action');

        expect(subject.find(actionTabs.parentNode).hasClass('tab-simple-small-screen')).toBeTruthy();
        expect(actionTabs.childNodes[0].className).toEqual('my-actions');
        expect(subject.find(actionTabs.childNodes[0]).text()).toBe('=)=|=(');
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
        const tab = subject.find('.tab-simple');
        expect(subject.find(tab).hasClass('test-class')).toBeTruthy();
        expect(subject.find(tab).prop('style')).toEqual({opacity: '0.5'});
      });
    });

    describe('tabType', () => {
      beforeEach(() => {
        subject = renderComponent({
          tabType: 'simple-alt'
        });
      });

      it('attaches it as a class to the tabs', () => {
        const tab = subject.find('.tab-simple-alt');
        expect(subject.find(tab.childNodes[0]).hasClass('nav-tabs')).toBeTruthy();
      });
    });

    describe('tabClassName', () => {
      beforeEach(() => {
        subject = renderComponent({defaultActiveKey: 1});
      });

      it('applies the tabClassName to the clickable tab element', () => {
        const tab = findAllByTag(subject, 'a')[0];

        expect(subject.find(tab.parentNode.parentNode).hasClass('nav-tabs')).toBeTruthy();
        expect(subject.find(tab).hasClass('tab-class')).toBeTruthy();
      });

      it('applies the className on the tab to the tab content pane', () => {
        const tabContent = subject.find('.tab-content');

        expect(subject.find(tabContent).hasClass('tab-content-class')).toBeTruthy();
        expect(subject.find(tabContent).text()).toBe('Content1');
      });
    });

    describe('animation: false', () => {
      beforeEach(() => {
        subject = renderComponent({defaultActiveKey: 1, animation: false});
      });

      it('calls onEntered and onExited immediately', () => {
        const secondTab = findAllByTag(subject, 'a')[1];
        secondTab.simulate('click', fakeEvent);
        jasmine.clock().tick(1);

        expect(onEnterSpy).toHaveBeenCalledWith(2);
        expect(onExitSpy).toHaveBeenCalledWith(1);
      });

      it('changes tabs immediately, without animation', () => {
        let activeTab = findAllByClass(subject, 'active')[0];
        let tabContent = subject.find('.tab-content');

        expect(subject.find(activeTab).text()).toBe('Tab1');
        expect(subject.find(tabContent).text()).toBe('Content1');

        const secondTab = findAllByTag(subject, 'a')[1];
        secondTab.simulate('click', fakeEvent);
        jasmine.clock().tick(1);

        activeTab = findAllByClass(subject, 'active')[0];
        tabContent = subject.find('.tab-content');

        expect(subject.find(activeTab).text()).toBe('Tab2');
        expect(subject.find(tabContent).text()).toBe('Content2');
      });
    });
  });

  describe('tab props', () => {
    beforeEach(() => {
      subject = renderComponent({defaultActiveKey: 1, animation: false, id: 'foo'});
    });

    describe('with small tabs', () => {
      beforeEach(() => {
        MediaSize.matches.mockReturnValue(false);
        triggerResize();
      });

      it('respects disabled tabs', () => {
        const disabledTab = findAllByTag(subject, 'a')[2];
        expect(subject.find(disabledTab).hasClass('disabled')).toBeTruthy();

        disabledTab.simulate('click', fakeEvent);
        jasmine.clock().tick(1);

        const activeTab = subject.find('.in');
        expect(subject.find(activeTab).text()).toBe('Content1');
      });

      describe('aria-labelledby', () => {
        it('uses the provided value, if given', () => {
          const tabPane = subject.find('.in');
          expect(subject.find(tabPane).prop('aria-labelledby')).toBe('provided-aria-label');
        });

        it('generates a default value', () => {
          // // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove? // TODO: remove?
          subject = renderComponent({defaultActiveKey: 2, id: 'foo'});

          const tabPane = subject.find('.in');
          expect(subject.find(tabPane).prop('aria-labelledby')).toBe('foo-tab-1');
        });
      });
    });

    describe('with regular tabs', () => {
      beforeEach(() => {
        MediaSize.matches.mockReturnValue(true);
        triggerResize();
      });

      describe('aria-labelledby', () => {
        it('uses the provided value, if given', () => {
          const tabPane = subject.find('.tab-pane');
          expect(subject.find(tabPane).prop('aria-labelledby')).toBe('provided-aria-label');
        });

        it('generates a default value', () => {
          // // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove? // TODO: remove?
          subject = renderComponent({defaultActiveKey: 2, id: 'foo'});

          const tabPane = subject.find('.tab-pane');
          expect(subject.find(tabPane).prop('aria-labelledby')).toBe('foo-tab-1');
        });
      });

      it('sets up the correct aria-controls relationship and aria-selected value', () => {
        const tabPane = subject.find('.tab-pane');
        const links = findAllByTag(subject, 'a');
        const activeTabLink = links[0];

        expect(subject.find(activeTabLink.parentNode).hasClass('active')).toBeTruthy();
        expect(subject.find(activeTabLink).prop('aria-controls')).toBe(tabPane.id);
        expect(subject.find(activeTabLink).prop('aria-selected')).toBe('true');

        const nonActiveTabLink = links[1];
        expect(subject.find(nonActiveTabLink.parentNode).hasClass('active')).toBeFalsy();
        expect(subject.find(nonActiveTabLink).prop('aria-controls')).not.toBe(tabPane.id);
        expect(subject.find(nonActiveTabLink).prop('aria-selected')).toBe('false');
      });

      it('sets tabIndex on each link', () => {
        const links = findAllByTag(subject, 'a');
        links.forEach(link => expect(subject.find(link).prop('tabIndex')).toBe('0'));
      });

      it('sets aria-expanded to the correct values on the list items', () => {
        const listItems = findAllByTag(subject, 'li');

        const activeListItem = listItems[0];
        expect(subject.find(activeListItem).hasClass('active')).toBeTruthy();
        expect(subject.find(activeListItem).prop('aria-expanded')).toBe('true');

        const nonActiveListItem = listItems[1];
        expect(subject.find(nonActiveListItem).hasClass('active')).toBeFalsy();
        expect(subject.find(nonActiveListItem).prop('aria-expanded')).toBe('false');
      });

      it('respects disabled tabs', () => {
        const disabledTab = findAllByTag(subject, 'li')[2];
        expect(subject.find(disabledTab).hasClass('disabled')).toBeTruthy();

        disabledTab.getElementsByTagName('a')[0].simulate('click', fakeEvent);
        jasmine.clock().tick(1);

        const activeTab = findAllByClass(subject, 'active')[0];
        expect(subject.find(activeTab).text()).toBe('Tab1');
      });
    });
  });
});

describe('LeftTabs', () => {
  let subject;

  const renderComponent = props => subject = shallow(<LeftTabs {...props}>
    <Tab eventKey={1} title="Tab1">Content1</Tab>
    <Tab eventKey={2} title="Tab2">Content2</Tab>
  </LeftTabs>);

  it('passes all properties', () => {
    const onSelectSpy = jest.fn();
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
    expect(subject.find('.grid > .col > .nav').exists()).toBeTruthy();
    expect(subject.find('.grid > .col > .nav').hasClass('nav-stacked')).toBeTruthy();
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