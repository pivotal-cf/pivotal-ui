import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils';
import {Tooltip} from '../../../src/pivotal-ui-react/tooltip/tooltip'

describe('Tooltip Component', () => {
  it('renders', () => {
    const result = ReactTestUtils.renderIntoDocument(<Tooltip content={<div>Hello World</div>}
                                                              tooltipContent="Some Tooltip"/>)
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'tooltip').length).toEqual(1)
  })

  it('renders with content', () => {
    const result = ReactTestUtils.renderIntoDocument(<Tooltip content={<div>Hello World</div>}
                                                              tooltipContent="Some Tooltip"/>)
    const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
    expect(content.textContent).toContain('Hello World')
  })

  it('renders with tooltip content', () => {
    const result = ReactTestUtils.renderIntoDocument(<Tooltip content={<div>Hello World</div>}
                                                              tooltipContent="Some Tooltip"/>)
    const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
    expect(container.children.length).toEqual(1)
    expect(container.children[0].className).toEqual('tooltip-content')
    expect(container.children[0].textContent).toEqual('Some Tooltip')
  })

  it('renders with node content, node tooltip content', () => {
    const nodeContent = <div className="inner-content">Hello World</div>
    const nodeTooltipContent = <div className="inner-tooltip-content">Hello world</div>
    const result = ReactTestUtils.renderIntoDocument(<Tooltip content={nodeContent}
                                                              tooltipContent={nodeTooltipContent}/>)

    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
    expect(tooltip.className).toContain('tooltip')
    expect(tooltip.className).toContain('inner-content')

    expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'inner-tooltip-content')).not.toBeUndefined()
  })

  it('renders with node content, string tooltip content', () => {
    const nodeContent = <div className="inner-content">Hello World</div>
    const result = ReactTestUtils.renderIntoDocument(<Tooltip content={nodeContent} tooltipContent="Some Tooltip"/>)

    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
    expect(tooltip.className).toContain('tooltip')
    expect(tooltip.className).toContain('inner-content')
  })

  it('propagates classname, id, style to the wrapping tooltip', () => {
    const result = ReactTestUtils.renderIntoDocument(
      <Tooltip
        content={<div className="some-classname" id="some-id" style={{color: 'red'}}> Hello World </div>}
        tooltipContent="Some Tooltip"/>)
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')

    expect(tooltip.className).toContain('some-classname')
    expect(tooltip.id).toEqual('some-id')
    expect(tooltip.style.color).toEqual('red')
  })

  it('calls onEnter when tooltip is made visible', () => {
    const enterSpy = jasmine.createSpy('enterSpy')
    const nodeContent = <div>Hello World</div>
    const result = ReactTestUtils.renderIntoDocument(<Tooltip content={nodeContent} tooltipContent="Some Tooltip" onEnter={enterSpy}/>)
    const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')

    ReactTestUtils.Simulate.mouseEnter(container)
    jasmine.clock().tick(1)

    expect(enterSpy).toHaveBeenCalled()
  })

  it('calls onExit when tooltip is made hidden', () => {
    const exitSpy = jasmine.createSpy('exitSpy')
    const nodeContent = <div>Hello World</div>
    const result = ReactTestUtils.renderIntoDocument(<Tooltip content={nodeContent} tooltipContent="Some Tooltip" onEnter={exitSpy}/>)
    const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')

    ReactTestUtils.Simulate.mouseEnter(container)
    jasmine.clock().tick(1)
    ReactTestUtils.Simulate.mouseLeave(container)
    jasmine.clock().tick(1)

    expect(exitSpy).toHaveBeenCalled()
  })

  describe('position', () => {
    it('defaults to nothing, which is "top" in css', () => {
      const nodeContent = <div>Hello World</div>
      const result = ReactTestUtils.renderIntoDocument(<Tooltip content={nodeContent} tooltipContent="Some Tooltip"/>)
      const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
      expect(container.className).toEqual('tooltip')
    })

    it('allows user to specify left, right, top, bottom', () => {
      const nodeContent = <div>Hello World</div>

      let result = ReactTestUtils.renderIntoDocument(<Tooltip position="left" content={nodeContent}
                                                              tooltipContent="Some Tooltip"/>)
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-left')).not.toBeUndefined()

      result = ReactTestUtils.renderIntoDocument(<Tooltip position="right" content={nodeContent}
                                                          tooltipContent="Some Tooltip"/>)
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-right')).not.toBeUndefined()

      result = ReactTestUtils.renderIntoDocument(<Tooltip position="bottom" content={nodeContent}
                                                          tooltipContent="Some Tooltip"/>)
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-bottom')).not.toBeUndefined()

      result = ReactTestUtils.renderIntoDocument(<Tooltip position="top" content={nodeContent}
                                                          tooltipContent="Some Tooltip"/>)
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip').className).toEqual('tooltip')
    })
  })

  describe('trigger', () => {
    it('defaults to hover', () => {
      const nodeContent = <div>Hello World</div>
      const result = ReactTestUtils.renderIntoDocument(<Tooltip content={nodeContent} tooltipContent="Some Tooltip"/>)
      const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
      const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')

      expect(tooltip.className).toContain('tooltip-container-hidden')

      ReactTestUtils.Simulate.mouseEnter(container)
      jasmine.clock().tick(1)
      expect(tooltip.className).toContain('tooltip-container-visible')

      ReactTestUtils.Simulate.mouseLeave(container)
      jasmine.clock().tick(1)
      expect(tooltip.className).toContain('tooltip-container-hidden')
    })

    it('allows user to trigger by click', () => {
      const nodeContent = <div>Hello World</div>
      const result = ReactTestUtils.renderIntoDocument(<Tooltip content={nodeContent} tooltipContent="Some Tooltip"
                                                                trigger="click"/>)
      const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
      const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')

      expect(tooltip.className).toContain('tooltip-container-hidden')

      ReactTestUtils.Simulate.click(container)
      jasmine.clock().tick(1)
      expect(tooltip.className).toContain('tooltip-container-visible')
    })

    it('hides the tooltip some time after clicking', () => {
      const nodeContent = <div>Hello World</div>
      const result = ReactTestUtils.renderIntoDocument(<Tooltip content={nodeContent} tooltipContent="Some Tooltip"
                                                                trigger="click"/>)
      const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
      const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')

      ReactTestUtils.Simulate.click(container)
      jasmine.clock().tick(1)
      expect(tooltip.className).toContain('tooltip-container-visible')
      jasmine.clock().tick(6000)
      expect(tooltip.className).toContain('tooltip-container-hidden')
    })
  })
})
