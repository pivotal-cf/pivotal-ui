import '../spec_helper'
import {BackToTop} from 'pui-react-back-to-top'

let ScrollTop = require('../../../src/pivotal-ui-react/back-to-top/scroll-top')

describe('BackToTop', () => {
  let originalGetScrollTop, originalSetScrollTop, scrollTop, subject

  const triggerScroll = () => {
    const event = document.createEvent('Event')
    event.initEvent('scroll', false, false)
    window.dispatchEvent(event)
  }

  beforeEach(done => {
    scrollTop = 0
    originalGetScrollTop = ScrollTop.getScrollTop
    originalSetScrollTop = ScrollTop.setScrollTop
    ScrollTop.getScrollTop = () => scrollTop || 0
    ScrollTop.setScrollTop = value => scrollTop = value

    subject = renderComponent({className: 'foo', id: 'bar', style: {fontSize: '200px'}})

    jasmine.clock().uninstall()
    setTimeout(() => {
      jasmine.clock().install()
      ScrollTop.setScrollTop(500)
      triggerScroll()
      done()
    }, 0)
  })

  afterEach(() => {
    ScrollTop.getScrollTop = originalGetScrollTop
    ScrollTop.setScrollTop = originalSetScrollTop
  })

  const renderComponent = props => ReactTestUtils.renderIntoDocument(<BackToTop {...props}/>)

  it('renders a back to top link that is visible', () => {
    const backToTop = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'back-to-top')
    expect(backToTop.tagName).toEqual('A')
    expect(backToTop.href).toContain('#top')
  })

  it('passes through className, id, and style', () => {
    const backToTop = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'back-to-top')
    expect(backToTop).toHaveClass('foo')
    expect(backToTop).toHaveAttr('id', 'bar')
    expect(backToTop).toHaveCss({'font-size': '200px'})
  })

  it('renders an arrow upward icon', () => {
    const arrow = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'icon-arrow_upward')
    expect(arrow.tagName).toEqual('svg')
  })

  it('fades in the button when scroll is > 400, and fades out when scroll is < 400', () => {
    const backToTop = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'back-to-top')

    expect(backToTop).toHaveCss({opacity: '0'})
    MockNow.tick(BackToTop.FADE_DURATION / 2)
    MockRaf.next()
    expect(backToTop).toHaveCss({opacity: '0.5'})
    MockNow.tick(BackToTop.FADE_DURATION / 2)
    MockRaf.next()
    expect(backToTop).toHaveCss({opacity: '1'})

    ScrollTop.setScrollTop(300)
    triggerScroll()

    expect(backToTop).toHaveCss({opacity: '1'})
    MockNow.tick(BackToTop.FADE_DURATION / 2)
    MockRaf.next()
    expect(backToTop).toHaveCss({opacity: '0.5'})
    MockNow.tick(BackToTop.FADE_DURATION / 2)
    MockRaf.next()
    expect(backToTop).toHaveCss({opacity: '0'})
  })

  describe('when the back to top link is clicked', () => {
    beforeEach(() => {
      MockNow.tick(BackToTop.FADE_DURATION)
      MockRaf.next()

      const backToTop = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'back-to-top')
      ReactTestUtils.Simulate.click(backToTop)
    })

    it('animates the body scroll to the top', () => {
      expect(ScrollTop.getScrollTop()).toEqual(500)
      MockNow.tick(BackToTop.SCROLL_DURATION / 2)
      MockRaf.next()
      expect(ScrollTop.getScrollTop()).toEqual(250)
      MockNow.tick(BackToTop.SCROLL_DURATION / 2)
      MockRaf.next()
      expect(ScrollTop.getScrollTop()).toEqual(0)
    })
  })
})
