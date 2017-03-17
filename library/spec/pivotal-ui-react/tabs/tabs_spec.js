import '../spec_helper'
import {Collapsible} from 'pui-react-collapsible'
import {Tab, LeftTabs, Tabs} from 'pui-react-tabs'
import ReactTestUtils from 'react-addons-test-utils'
import {findAllByClass, findByClass, findAllByTag} from '../spec_helper'

describe('Tabs', () => {
  let subject, MediaSize, onEnterSpy, onExitSpy

  const renderComponent = props => {
    const mergedProps = {
      tabType: 'simple',
      ...props
    }
    onEnterSpy = jasmine.createSpy('onEnter')
    onExitSpy = jasmine.createSpy('onExit')

    const component = ReactTestUtils.renderIntoDocument(
      <Tabs {...mergedProps}>
        <Tab eventKey={1} title="Tab1" tabClassName="tab-class" className="tab-content-class" onEntered={onEnterSpy}
             onExited={onExitSpy} aria-labelledby="provided-aria-label">Content1</Tab>
        <Tab eventKey={2} title="Tab2" onEntered={onEnterSpy} onExited={onExitSpy}>Content2</Tab>
        <Tab eventKey={3} disabled title="DisabledTab">DisabledContent</Tab>
      </Tabs>
    )
    onEnterSpy.calls.reset()
    onExitSpy.calls.reset()

    return component
  }

  const triggerResize = () => {
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('resize', true, true)
    window.dispatchEvent(evt)
  }

  beforeEach(() => {
    MediaSize = require('../../../src/pivotal-ui-react/tabs/media-size')
    spyOn(MediaSize, 'matches').and.returnValue(true)
  })

  describe('props', () => {
    describe('responsiveBreakpoint', () => {
      beforeEach(() => {
        subject = renderComponent({
          defaultActiveKey: 2,
          responsiveBreakpoint: 'xs',
          smallScreenClassName: 'small-class',
          largeScreenClassName: 'large-class'
        })
      })

      it('checks media', () => {
        expect(MediaSize.matches).toHaveBeenCalledWith('xs')
      })

      describe('when screen size is less than breakpoint', () => {
        beforeEach(() => {
          MediaSize.matches.and.returnValue(false)
          triggerResize()
        })

        it('switches tabs on click with animation, and calls onEntered/onExited when animation is done', () => {
          let tabContent = findAllByClass(subject, 'tab-content')
          expect(tabContent[0]).not.toHaveClass('in')
          expect(tabContent[1]).toHaveClass('in')

          const firstTab = findAllByTag(subject, 'a')[0]
          ReactTestUtils.Simulate.click(firstTab)

          expect(onEnterSpy).not.toHaveBeenCalled()
          expect(onExitSpy).not.toHaveBeenCalled()

          MockNow.tick(Tabs.ANIMATION_TIME)
          MockRaf.next()

          expect(onEnterSpy).toHaveBeenCalledWith(1)
          expect(onExitSpy).toHaveBeenCalledWith(2)

          tabContent = findAllByClass(subject, 'tab-content')

          expect(tabContent[0]).toHaveClass('in')
          expect(tabContent[1]).not.toHaveClass('in')
        })

        it('renders an accordion', () => {
          expect(findByClass(subject, 'panel-group')).toBeTruthy()
          expect(findAllByClass(subject, 'tab-simple').length).toEqual(0)
        })

        it('passes small-screen classes', () => {
          const panelGroup = findByClass(subject, 'panel-group')
          expect(panelGroup).toHaveClass('small-class')
        })
      })

      describe('when screen size is greater than breakpoint', () => {
        it('switches tabs on click with animation, and calls onEntered/onExited when animation is done', () => {
          let tabContent = findByClass(subject, 'tab-content')
          expect(tabContent).toHaveText('Content2')
          expect(tabContent.getElementsByClassName('tab-pane')[0].style.opacity).toEqual('')

          const clickable = findAllByTag(subject, 'a')[0]
          expect(clickable).toHaveText('Tab1')
          ReactTestUtils.Simulate.click(clickable)
          jasmine.clock().tick(1)

          MockNow.tick(Tabs.ANIMATION_TIME / 4)
          MockRaf.next()
          tabContent = findByClass(subject, 'tab-content')
          expect(tabContent).toHaveText('Content2')
          expect(tabContent.getElementsByClassName('tab-pane')[0]).toHaveCss({opacity: '0.5'})

          MockNow.tick(Tabs.ANIMATION_TIME / 2)
          MockRaf.next()
          tabContent = findByClass(subject, 'tab-content')
          expect(tabContent).toHaveText('Content1')
          expect(tabContent.getElementsByClassName('tab-pane')[0]).toHaveCss({opacity: '0.5'})
          expect(onEnterSpy).not.toHaveBeenCalled()
          expect(onExitSpy).not.toHaveBeenCalled()

          MockNow.tick(Tabs.ANIMATION_TIME / 2)
          MockRaf.next()
          expect(onEnterSpy).toHaveBeenCalledWith(1)
          expect(onExitSpy).toHaveBeenCalledWith(2)
          tabContent = findByClass(subject, 'tab-content')
          expect(tabContent).toHaveText('Content1')
          expect(tabContent.getElementsByClassName('tab-pane')[0].style.opacity).toEqual('')
        })

        it('renders a tabs', () => {
          expect(findByClass(subject, 'tab-simple')).toBeTruthy()
          expect(findAllByClass(subject, 'panel-group').length).toEqual(0)
        })

        it('passes large-screen classes', () => {
          const panelGroup = findByClass(subject, 'tab-simple')
          expect(panelGroup).toHaveClass('large-class')
        })
      })
    })

    describe('onSelect', () => {
      let onSelectSpy

      beforeEach(() => {
        onSelectSpy = jasmine.createSpy('onSelectSpy')

        subject = renderComponent({
          defaultActiveKey: 2,
          onSelect: onSelectSpy
        })
      })

      it('uses the supplied onSelect method when clicking on large-screen tabs', () => {
        MediaSize.matches.and.returnValue(true)
        triggerResize()

        const clickable = findAllByTag(subject, 'a')[0]
        expect(clickable).toHaveText('Tab1')
        ReactTestUtils.Simulate.click(clickable)

        expect(onSelectSpy).toHaveBeenCalled()
      })

      it('uses the supplied onSelect method when clicking on small-screen tabs', () => {
        MediaSize.matches.and.returnValue(false)
        triggerResize()

        const clickable = findAllByTag(subject, 'a')[0]
        expect(clickable).toHaveText('Tab1')
        ReactTestUtils.Simulate.click(clickable)
        jasmine.clock().tick(1)

        expect(onSelectSpy).toHaveBeenCalled()
      })
    })

    describe('actions', () => {
      beforeEach(() => {
        const actions = (
          <div className="my-actions">
            <button>=)</button>
            <button>=|</button>
            <button>=(</button>
          </div>
        )
        subject = renderComponent({actions})
      })

      it('renders the actions for large screens', () => {
        const actionTabs = findByClass(subject, 'tabs-action')

        expect(actionTabs.parentNode).toHaveClass('tab-simple')
        expect(actionTabs.childNodes[0].className).toEqual('my-actions')
        expect(actionTabs.childNodes[0]).toHaveText('=)=|=(')
      })

      it('renders the actions for small screens', () => {
        MediaSize.matches.and.returnValue(false)
        triggerResize()

        const actionTabs = findByClass(subject, 'tabs-action')

        expect(actionTabs.parentNode).toHaveClass('tab-simple-small-screen')
        expect(actionTabs.childNodes[0].className).toEqual('my-actions')
        expect(actionTabs.childNodes[0]).toHaveText('=)=|=(')
      })
    })

    describe('passthroughs', () => {
      beforeEach(() => {
        subject = renderComponent({
          defaultActiveKey: 2,
          className: 'test-class',
          style: {opacity: '0.5'}
        })
      })

      it('passes through class and style', () => {
        const tab = findByClass(subject, 'tab-simple')
        expect(tab).toHaveClass('test-class')
        expect(tab).toHaveCss({opacity: '0.5'})
      })
    })

    describe('tabType', () => {
      beforeEach(() => {
        subject = renderComponent({
          tabType: 'simple-alt'
        })
      })

      it('attaches it as a class to the tabs', () => {
        const tab = findByClass(subject, 'tab-simple-alt')
        expect(tab.childNodes[0]).toHaveClass('nav-tabs')
      })
    })

    describe('tabClassName', () => {
      beforeEach(() => {
        subject = renderComponent({defaultActiveKey: 1})
      })

      it('applies the tabClassName to the clickable tab element', () => {
        const tab = findAllByTag(subject, 'a')[0]

        expect(tab.parentNode.parentNode).toHaveClass('nav-tabs')
        expect(tab).toHaveClass('tab-class')
      })

      it('applies the className on the tab to the tab content pane', () => {
        const tabContent = findByClass(subject, 'tab-content')

        expect(tabContent).toHaveClass('tab-content-class')
        expect(tabContent).toHaveText('Content1')
      })
    })

    describe('animation: false', () => {
      beforeEach(() => {
        subject = renderComponent({defaultActiveKey: 1, animation: false})
      })

      it('calls onEntered and onExited immediately', () => {
        const secondTab = findAllByTag(subject, 'a')[1]
        ReactTestUtils.Simulate.click(secondTab)
        jasmine.clock().tick(1)

        expect(onEnterSpy).toHaveBeenCalledWith(2)
        expect(onExitSpy).toHaveBeenCalledWith(1)
      })

      it('changes tabs immediately, without animation', () => {
        let activeTab = findAllByClass(subject, 'active')[0]
        let tabContent = findByClass(subject, 'tab-content')

        expect(activeTab).toHaveText('Tab1')
        expect(tabContent).toHaveText('Content1')

        const secondTab = findAllByTag(subject, 'a')[1]
        ReactTestUtils.Simulate.click(secondTab)
        jasmine.clock().tick(1)

        activeTab = findAllByClass(subject, 'active')[0]
        tabContent = findByClass(subject, 'tab-content')
        const tabPane = findByClass(subject, 'tab-pane')

        expect(activeTab).toHaveText('Tab2')
        expect(tabContent).toHaveText('Content2')
      })
    })
  })

  describe('tab props', () => {
    beforeEach(() => {
      subject = renderComponent({defaultActiveKey: 1, animation: false, id: 'foo'})
    })

    describe('with small tabs', () => {
      beforeEach(() => {
        MediaSize.matches.and.returnValue(false)
        triggerResize()
      })

      it('respects disabled tabs', () => {
        const disabledTab = findAllByTag(subject, 'a')[2]
        expect(disabledTab).toHaveClass('disabled')

        ReactTestUtils.Simulate.click(disabledTab)
        jasmine.clock().tick(1)

        const activeTab = findByClass(subject, 'in')
        expect(activeTab).toHaveText('Content1')
      })

      describe('aria-labelledby', () => {
        it('uses the provided value, if given', () => {
          const tabPane = findByClass(subject, 'in')
          expect(tabPane).toHaveAttr('aria-labelledby', 'provided-aria-label')
        })

        it('generates a default value', () => {
          subject = renderComponent({defaultActiveKey: 2, id: 'foo'})

          const tabPane = findByClass(subject, 'in')
          expect(tabPane).toHaveAttr('aria-labelledby', 'foo-tab-1')
        })
      })
    })

    describe('with regular tabs', () => {
      beforeEach(() => {
        MediaSize.matches.and.returnValue(true)
        triggerResize()
      })

      describe('aria-labelledby', () => {
        it('uses the provided value, if given', () => {
          const tabPane = findByClass(subject, 'tab-pane')
          expect(tabPane).toHaveAttr('aria-labelledby', 'provided-aria-label')
        })

        it('generates a default value', () => {
          subject = renderComponent({defaultActiveKey: 2, id: 'foo'})

          const tabPane = findByClass(subject, 'tab-pane')
          expect(tabPane).toHaveAttr('aria-labelledby', 'foo-tab-1')
        })
      })

      it('sets up the correct aria-controls relationship and aria-selected value', () => {
        const tabPane = findByClass(subject, 'tab-pane')
        const links = findAllByTag(subject, 'a')
        const activeTabLink = links[0]

        expect(activeTabLink.parentNode).toHaveClass('active')
        expect(activeTabLink).toHaveAttr('aria-controls', tabPane.id)
        expect(activeTabLink).toHaveAttr('aria-selected', 'true')

        const nonActiveTabLink = links[1]
        expect(nonActiveTabLink.parentNode).not.toHaveClass('active')
        expect(nonActiveTabLink).not.toHaveAttr('aria-controls', tabPane.id)
        expect(nonActiveTabLink).toHaveAttr('aria-selected', 'false')
      })

      it('sets tabIndex on each link', () => {
        const links = findAllByTag(subject, 'a')
        links.forEach(link => expect(link).toHaveAttr('tabIndex', '0'))
      })

      it('sets aria-expanded to the correct values on the list items', () => {
        const listItems = findAllByTag(subject, 'li')

        const activeListItem = listItems[0]
        expect(activeListItem).toHaveClass('active')
        expect(activeListItem).toHaveAttr('aria-expanded', 'true')

        const nonActiveListItem = listItems[1]
        expect(nonActiveListItem).not.toHaveClass('active')
        expect(nonActiveListItem).toHaveAttr('aria-expanded', 'false')
      })

      it('respects disabled tabs', () => {
        const disabledTab = findAllByTag(subject, 'li')[2]
        expect(disabledTab).toHaveClass('disabled')

        ReactTestUtils.Simulate.click(disabledTab.getElementsByTagName('a')[0])
        jasmine.clock().tick(1)

        const activeTab = findAllByClass(subject, 'active')[0]
        expect(activeTab).toHaveText('Tab1')
      })
    })
  })
})

describe('LeftTabs', () => {
  let subject

  const renderComponent = props => ReactTestUtils.renderIntoDocument(
    <LeftTabs {...props}>
      <Tab eventKey={1} title="Tab1">Content1</Tab>
      <Tab eventKey={2} title="Tab2">Content2</Tab>
    </LeftTabs>
  )

  it('passes all properties', () => {
    const onSelectSpy = jasmine.createSpy()
    subject = renderComponent({
      defaultActiveKey: 1,
      responsiveBreakpoint: 'sm',
      largeScreenClassName: 'lgclass',
      smallScreenClassName: 'smclass',
      onSelect: onSelectSpy
    })

    expect(subject.props.defaultActiveKey).toEqual(1)
    expect(subject.props.responsiveBreakpoint).toEqual('sm')
    expect(subject.props.smallScreenClassName).toEqual('smclass')
    expect(subject.props.largeScreenClassName).toEqual('lgclass')
    expect(subject.props.onSelect).toEqual(onSelectSpy)
  })

  it('renders tabs stacked', () => {
    subject = renderComponent()
    const nav = findByClass(subject, 'nav')
    expect(nav).toHaveClass('nav-stacked')
  })

  it('renders a Tabs component with tabType="left"', () => {
    subject = renderComponent()
    const tabs = ReactTestUtils.findRenderedComponentWithType(subject, Tabs)

    expect(tabs.props.position).toEqual('left')
    expect(tabs.props.tabType).toEqual('left')
  })

  describe('when props are passed for tabWidth and paneWidth', () => {
    it('uses those values', () => {
      subject = renderComponent({tabWidth: 4, paneWidth: 6})
      const tabs = ReactTestUtils.findRenderedComponentWithType(subject, Tabs)
      expect(tabs.props.tabWidth).toEqual(4)
      expect(tabs.props.paneWidth).toEqual(6)
    })
  })

  describe('when tabWidth is passed and paneWidth is not', () => {
    it('passes a calculated column size to Tabs', () => {
      subject = renderComponent({tabWidth: 4})
      const tabs = ReactTestUtils.findRenderedComponentWithType(subject, Tabs)
      expect(tabs.props.tabWidth).toEqual(4)
      expect(tabs.props.paneWidth).toEqual(20)
    })
  })

  describe('when neither tabWidth nor paneWidth are passed', () => {
    it('passes a default size to Tabs', () => {
      subject = renderComponent()
      const tabs = ReactTestUtils.findRenderedComponentWithType(subject, Tabs)
      expect(tabs.props.tabWidth).toEqual(6)
      expect(tabs.props.paneWidth).toEqual(18)
    })
  })
})