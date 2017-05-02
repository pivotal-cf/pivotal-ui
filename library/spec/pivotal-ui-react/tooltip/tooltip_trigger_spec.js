import '../spec_helper'

import {TooltipTrigger} from 'pui-react-tooltip'
import {findByClass, findAllByClass} from '../spec_helper'

describe('TooltipTrigger Component', () => {
  const renderComponent = (props, triggerContent) => ReactTestUtils.renderIntoDocument(
    <TooltipTrigger {...props}>
      <div className="trigger">{triggerContent || 'Some default message'}</div>
    </TooltipTrigger>)

  it('renders', () => {
    const result = renderComponent({tooltip: 'Some default tooltip'})
    expect(findAllByClass(result, 'tooltip').length).toEqual(1)
  })

  it('renders with content', () => {
    const result = renderComponent({tooltip: 'Some default tooltip'})
    const content = findByClass(result, 'trigger')
    expect(content).toHaveText('Some default message')
  })

  it('renders with the tooltip text', () => {
    const result = renderComponent({tooltip: 'Some default tooltip'})
    const tooltip = findByClass(result, 'tooltip-content')
    expect(tooltip).toHaveText('Some default tooltip')
  })

  it('renders node content for the trigger', () => {
    const result = renderComponent({tooltip: 'Some tooltip content'}, <div className="inner-content">Hello World</div>)

    const node = findByClass(result, 'inner-content')

    expect(node).toHaveText('Hello World')
    expect(node.parentNode).toHaveClass('trigger')
  })

  it('renders node content for the tooltip', () => {
    const result = renderComponent({tooltip: <a href="#">Click me</a>})

    const tooltip = findByClass(result, 'tooltip')

    expect(tooltip.querySelectorAll('a')).toHaveLength(1)
  })

  it('propagates classname, id, style to the wrapping tooltip', () => {
    const result = renderComponent({
      tooltip: 'Some tooltip content',
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'red'}
    })
    const tooltip = findByClass(result, 'tooltip')

    expect(tooltip).toHaveClass('some-classname')
    expect(tooltip).toHaveAttr('id', 'some-id')
    expect(tooltip).toHaveCss({color: 'red'})
  })

  it('calls onEntered when tooltip is made visible', () => {
    const enterSpy = jasmine.createSpy('enterSpy')
    const result = renderComponent({onEntered: enterSpy, tooltip: 'Some tooltip content'})
    const container = findByClass(result, 'tooltip')

    ReactTestUtils.Simulate.mouseEnter(container)
    jasmine.clock().tick(1)

    expect(enterSpy).toHaveBeenCalled()
  })

  it('calls onExited when tooltip is made hidden', () => {
    const exitSpy = jasmine.createSpy('exitSpy')
    const result = renderComponent({onExited: exitSpy, tooltip: 'Some tooltip content'})
    const container = findByClass(result, 'tooltip')

    ReactTestUtils.Simulate.mouseEnter(container)
    jasmine.clock().tick(1)
    ReactTestUtils.Simulate.mouseLeave(container)
    jasmine.clock().tick(1)

    expect(exitSpy).toHaveBeenCalled()
  })

  describe('color', () => {
    it('renders dark version by default', () => {
      const result = renderComponent({tooltip: 'Some tooltip content'})
      const content = findByClass(result, 'tooltip')
      expect(content.className).toEqual('tooltip')
    })

    it('allows user to specify color as "dark" (the default) but it doesnt do anything', () => {
      const result = renderComponent({theme: 'dark', tooltip: 'Some tooltip content'})
      const content = findByClass(result, 'tooltip')
      expect(content.className).toEqual('tooltip')
    })

    it('allows user to change color to light', () => {
      const result = renderComponent({theme: 'light', tooltip: 'Some tooltip content'})
      const content = findByClass(result, 'tooltip')
      expect(content).toHaveClass('tooltip-light')
    })
  })

  describe('placement', () => {
    it('defaults to nothing, which is "top" in css', () => {
      const result = renderComponent({tooltip: 'Some tooltip content'})
      const container = findByClass(result, 'tooltip')
      expect(container.className).toEqual('tooltip')
    })

    it('allows user to specify left, right, top, bottom', () => {
      let result = renderComponent({placement: 'left', tooltip: 'Some tooltip content'})
      expect(findByClass(result, 'tooltip-left')).toBeDefined()

      result = renderComponent({placement: 'right', tooltip: 'Some tooltip content'})
      expect(findByClass(result, 'tooltip-right')).toBeDefined()

      result = renderComponent({placement: 'bottom', tooltip: 'Some tooltip content'})
      expect(findByClass(result, 'tooltip-bottom')).toBeDefined()

      result = renderComponent({placement: 'top', tooltip: 'Some tooltip content'})
      expect(findByClass(result, 'tooltip').className).toEqual('tooltip')
    })
  })

  describe('trigger', () => {
    it('defaults to hover', () => {
      const result = renderComponent({tooltip: 'Some tooltip content'})
      const container = findByClass(result, 'tooltip')
      const tooltip = findByClass(result, 'tooltip-container')

      expect(tooltip).toHaveClass('tooltip-container-hidden')

      ReactTestUtils.Simulate.mouseEnter(container)
      jasmine.clock().tick(1)
      expect(tooltip).toHaveClass('tooltip-container-visible')

      ReactTestUtils.Simulate.mouseLeave(container)
      jasmine.clock().tick(1)
      expect(tooltip).toHaveClass('tooltip-container-hidden')
    })

    it('allows user to trigger by click', () => {
      const result = renderComponent({trigger: 'click', tooltip: 'Some tooltip content'})
      const container = findByClass(result, 'tooltip')
      const tooltip = findByClass(result, 'tooltip-container')

      expect(tooltip).toHaveClass('tooltip-container-hidden')

      ReactTestUtils.Simulate.click(container)
      jasmine.clock().tick(1)
      expect(tooltip).toHaveClass('tooltip-container-visible')
    })

    it('hides the tooltip some time after clicking', () => {
      const result = renderComponent({trigger: 'click', tooltip: 'Some tooltip content'})
      const container = findByClass(result, 'tooltip')
      const tooltip = findByClass(result, 'tooltip-container')

      ReactTestUtils.Simulate.click(container)
      jasmine.clock().tick(1)
      expect(tooltip).toHaveClass('tooltip-container-visible')
      jasmine.clock().tick(6000)
      expect(tooltip).toHaveClass('tooltip-container-hidden')
    })
  })
})