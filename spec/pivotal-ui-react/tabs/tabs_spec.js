import '../spec_helper';
import {Tab, LeftTabs, Tabs} from '../../../src/react/tabs';
import MediaSize from '../../../src/react/tabs/media-size';

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
          expect('.tab-content:eq(0)').not.toHaveClass('in');
          expect('.tab-content:eq(1)').toHaveClass('in');

          $('#root a:eq(0)').simulate('click');

          expect(onEnterSpy).not.toHaveBeenCalled();
          expect(onExitSpy).not.toHaveBeenCalled();

          MockNow.tick(Tabs.ANIMATION_TIME);
          MockRaf.next();

          expect(onEnterSpy).toHaveBeenCalledWith(1);
          expect(onExitSpy).toHaveBeenCalledWith(2);

          expect('.tab-content:eq(0)').toHaveClass('in');
          expect('.tab-content:eq(1)').not.toHaveClass('in');
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
          expect('.tab-content .tab-pane:eq(0)').toHaveCss({opacity: '1'});

          expect('#root a:eq(0)').toHaveText('Tab1');
          $('#root a:eq(0)').simulate('click');
          jasmine.clock().tick(1);

          MockNow.tick(Tabs.ANIMATION_TIME / 4);
          MockRaf.next();
          expect('.tab-content').toHaveText('Content2');
          expect('.tab-content .tab-pane:eq(0)').toHaveCss({opacity: '0.5'});

          MockNow.tick(Tabs.ANIMATION_TIME / 2);
          MockRaf.next();
          expect('.tab-content').toHaveText('Content1');
          expect('.tab-content .tab-pane:eq(0)').toHaveCss({opacity: '0.5'});
          expect(onEnterSpy).not.toHaveBeenCalled();
          expect(onExitSpy).not.toHaveBeenCalled();

          MockNow.tick(Tabs.ANIMATION_TIME / 2);
          MockRaf.next();
          expect(onEnterSpy).toHaveBeenCalledWith(1);
          expect(onExitSpy).toHaveBeenCalledWith(2);
          expect('.tab-content').toHaveText('Content1');
          expect('.tab-content .tab-pane:eq(0)').toHaveCss({opacity: '1'});
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

        const clickable = $('#root a:eq(0)');
        expect(clickable).toHaveText('Tab1');
        clickable.simulate('click');

        expect(onSelectSpy).toHaveBeenCalled();
      });

      it('uses the supplied onSelect method when clicking on small-screen tabs', () => {
        MediaSize.matches.and.returnValue(false);
        triggerResize();

        const clickable = $('#root a:eq(0)');
        expect(clickable).toHaveText('Tab1');
        clickable.simulate('click');

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
        expect('.tab-simple > .tabs-action').toExist();
        expect('.tab-simple > .tabs-action > div:eq(0)').toHaveClass('my-actions');
        expect('.tab-simple > .tabs-action > div:eq(0)').toHaveText('=)=|=(');
      });

      it('renders the actions for small screens', () => {
        MediaSize.matches.and.returnValue(false);
        triggerResize();

        expect('.tab-simple-small-screen > .tabs-action').toExist();
        expect('.tab-simple-small-screen > .tabs-action > div:eq(0)').toHaveClass('my-actions');
        expect('.tab-simple-small-screen > .tabs-action > div:eq(0)').toHaveText('=)=|=(');
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
        expect('.tab-simple-alt > .nav-tabs').toExist();
      });
    });

    describe('tabClassName', () => {
      beforeEach(() => {
        subject = renderComponent({defaultActiveKey: 1});
      });

      it('applies the tabClassName to the clickable tab element', () => {
        expect('.nav-tabs > * > a:eq(0)').toExist();
        expect('.nav-tabs > * > a:eq(0)').toHaveClass('tab-class');
      });

      it('applies the className on the tab to the tab content pane', () => {
        expect('.tab-content').toHaveClass('tab-content-class');
        expect('.tab-content').toHaveText('Content1');
      });
    });

    describe('animation: false', () => {
      beforeEach(() => {
        subject = renderComponent({defaultActiveKey: 1, animation: false});
      });

      it('calls onEntered and onExited immediately', () => {
        $('#root a:eq(1)').simulate('click');

        expect(onEnterSpy).toHaveBeenCalledWith(2);
        expect(onExitSpy).toHaveBeenCalledWith(1);
      });

      it('changes tabs immediately, without animation', () => {
        expect('.active:eq(0)').toHaveText('Tab1');
        expect('.tab-content').toHaveText('Content1');

        $('#root a:eq(1)').simulate('click');

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
        expect('#root a:eq(2)').toHaveClass('disabled');
        $('#root a:eq(2)').simulate('click');

        expect('.in').toHaveText('Content1');
      });

      describe('aria-labelledby', () => {
        it('uses the provided value, if given', () => {
          expect('.in').toHaveAttr('aria-labelledby', 'provided-aria-label');
        });

        it('generates a default value', () => {
          ReactDOM.unmountComponentAtNode(root);
          subject = renderComponent({defaultActiveKey: 2, id: 'foo'});

          expect('.in').toHaveAttr('aria-labelledby', 'foo-tab-1');
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
        const links = $('#root a');
        const activeTabLink = links[0];

        expect(activeTabLink.parentNode).toHaveClass('active');
        expect(activeTabLink).toHaveAttr('aria-controls', 'foo-pane-0');
        expect(activeTabLink).toHaveAttr('aria-selected', 'true');

        const nonActiveTabLink = links[1];
        expect(nonActiveTabLink.parentNode).not.toHaveClass('active');
        expect(nonActiveTabLink).toHaveAttr('aria-controls', 'foo-pane-1');
        expect(nonActiveTabLink).toHaveAttr('aria-selected', 'false');
      });

      it('sets tabIndex on each link', () => {
        $('#root a').toArray().forEach(link => expect(link).toHaveAttr('tabIndex', '0'));
      });

      it('sets aria-expanded to the correct values on the list items', () => {
        const listItems = $('#root li');

        const activeListItem = listItems[0];
        expect(activeListItem).toHaveClass('active');
        expect(activeListItem).toHaveAttr('aria-expanded', 'true');

        const nonActiveListItem = listItems[1];
        expect(nonActiveListItem).not.toHaveClass('active');
        expect(nonActiveListItem).toHaveAttr('aria-expanded', 'false');
      });

      it('respects disabled tabs', () => {
        expect('#root li:eq(2)').toHaveClass('disabled');

        $('#root li:eq(2) a:eq(0)').simulate('click');
        jasmine.clock().tick(1);

        expect('.active:eq(0)').toHaveText('Tab1');
      });
    });
  });
});

describe('LeftTabs', () => {
  let subject, onSelect;

  beforeEach(() => {
    onSelect = jasmine.createSpy('onSelect');
    spyOnRender(Tabs).and.callThrough();

    subject = ReactDOM.render(
      <LeftTabs {...{
        defaultActiveKey: 1,
        responsiveBreakpoint: 'sm',
        largeScreenClassName: 'lgclass',
        smallScreenClassName: 'smclass',
        onSelect
      }}>
        <Tab eventKey={1} title="Tab1">Content1</Tab>
        <Tab eventKey={2} title="Tab2">Content2</Tab>
      </LeftTabs>,
      root
    );
  });

  it('passes all properties', () => {
    expect(subject.props.defaultActiveKey).toEqual(1);
    expect(subject.props.responsiveBreakpoint).toEqual('sm');
    expect(subject.props.smallScreenClassName).toEqual('smclass');
    expect(subject.props.largeScreenClassName).toEqual('lgclass');
    expect(subject.props.onSelect).toEqual(onSelect);
  });

  it('renders tabs stacked', () => {
    expect('.grid > .col > .nav').toExist();
  });

  it('renders a Tabs component', () => {
    expect(Tabs).toHaveBeenRenderedWithProps({
      position: 'left',
      tabType: 'left',
      tabWidth: 3,
      animation: true,
      responsiveBreakpoint: 'sm',
      children: jasmine.any(Object),
      onSelect,
      largeScreenClassName: 'lgclass',
      smallScreenClassName: 'smclass',
      defaultActiveKey: 1
    });
  });

  describe('when props are passed for tabWidth', () => {
    beforeEach(() => {
      subject::setProps({tabWidth: 4});
    });

    it('uses that values', () => {
      expect(Tabs).toHaveBeenRenderedWithProps({
        position: 'left',
        tabType: 'left',
        tabWidth: 4,
        animation: true,
        responsiveBreakpoint: 'sm',
        children: jasmine.any(Object),
        onSelect,
        largeScreenClassName: 'lgclass',
        smallScreenClassName: 'smclass',
        defaultActiveKey: 1
      });
    });
  });
});