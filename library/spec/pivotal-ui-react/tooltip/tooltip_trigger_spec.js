import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils'
import {TooltipTrigger} from 'pui-react-tooltip'
import {findByClass, findAllByClass} from '../spec_helper'
  
describe('TooltipTrigger Component', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<TooltipTrigger tooltip="Some default tooltip"
                                                                              {...props}>
                                                                        <div className="trigger">Some default message</div>
                                                                      </TooltipTrigger>)

  it('renders', () => {
    const result = renderComponent()
    expect(findAllByClass(result, 'tooltip').length).toEqual(1)
  })

  it('renders with content', () => {
    const result = renderComponent()
    const content = findByClass(result, 'trigger')
    expect(content).toHaveText('Some default message')
  })

  it('renders with the tooltip text', () => {
    const result = renderComponent()
    const tooltip = findByClass(result, 'tooltip-content')
    expect(tooltip).toHaveText('Some default tooltip')
  })

  it('renders node content for the trigger', () => {
    const nodeContent = <div className="inner-content">Hello World</div>
    const tooltipElement = <TooltipTrigger tooltip="Some tooltip content">{nodeContent}</TooltipTrigger>

    const result = ReactTestUtils.renderIntoDocument(tooltipElement)

    const tooltip = findByClass(result, 'tooltip')

    expect(tooltip.getElementsByClassName('inner-content')).toHaveLength(1)
  })

  it('propagates classname, id, style to the wrapping tooltip', () => {
    const result = renderComponent({
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'red'}
    })
    const tooltip = findByClass(result, 'tooltip')

    expect(tooltip).toHaveClass('some-classname')
    expect(tooltip).toHaveAttr('id', 'some-id')
    expect(tooltip).toHaveCss({color: 'red'})
  })

  it('calls onEnter when tooltip is made visible', () => {
    const enterSpy = jasmine.createSpy('enterSpy')
    const result = renderComponent({onEnter: enterSpy})
    const container = findByClass(result, 'tooltip')

    ReactTestUtils.Simulate.mouseEnter(container)
    jasmine.clock().tick(1)

    expect(enterSpy).toHaveBeenCalled()
  })

  it('calls onExit when tooltip is made hidden', () => {
    const exitSpy = jasmine.createSpy('exitSpy')
    const result = renderComponent({onExit: exitSpy})
    const container = findByClass(result, 'tooltip')

    ReactTestUtils.Simulate.mouseEnter(container)
    jasmine.clock().tick(1)
    ReactTestUtils.Simulate.mouseLeave(container)
    jasmine.clock().tick(1)

    expect(exitSpy).toHaveBeenCalled()
  })

  describe('color', () => {
    it('renders dark version by default', () => {
      const result = renderComponent()
      const content = findByClass(result, 'tooltip')
      expect(content.className).toEqual('tooltip')
    })

    it('allows user to specify color as "dark" (the default) but it doesnt do anything', () => {
      const result = renderComponent({theme: 'dark'})
      const content = findByClass(result, 'tooltip')
      expect(content.className).toEqual('tooltip')
    })

    it('allows user to change color to light', () => {
      const result = renderComponent({theme: 'light'})
      const content = findByClass(result, 'tooltip')
      expect(content).toHaveClass('tooltip-light')
    })
  })

  describe('position', () => {
    it('defaults to nothing, which is "top" in css', () => {
      const result = renderComponent()
      const container = findByClass(result, 'tooltip')
      expect(container.className).toEqual('tooltip')
    })

    it('allows user to specify left, right, top, bottom', () => {
      let result = renderComponent({position: 'left'})
      expect(findByClass(result, 'tooltip-left')).not.toBeUndefined()

      result = renderComponent({position: 'right'})
      expect(findByClass(result, 'tooltip-right')).not.toBeUndefined()

      result = renderComponent({position: 'bottom'})
      expect(findByClass(result, 'tooltip-bottom')).not.toBeUndefined()

      result = renderComponent({position: 'top'})
      expect(findByClass(result, 'tooltip').className).toEqual('tooltip')
    })
  })

  describe('trigger', () => {
    it('defaults to hover', () => {
      const result = renderComponent()
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
      const result = renderComponent({trigger: 'click'})
      const container = findByClass(result, 'tooltip')
      const tooltip = findByClass(result, 'tooltip-container')

      expect(tooltip).toHaveClass('tooltip-container-hidden')

      ReactTestUtils.Simulate.click(container)
      jasmine.clock().tick(1)
      expect(tooltip).toHaveClass('tooltip-container-visible')
    })

    it('hides the tooltip some time after clicking', () => {
      const result = renderComponent({trigger: 'click'})
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