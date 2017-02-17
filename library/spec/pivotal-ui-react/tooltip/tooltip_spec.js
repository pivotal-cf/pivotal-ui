import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils';
import {Tooltip} from '../../../src/pivotal-ui-react/tooltip/tooltip'

describe('Tooltip Component', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Tooltip content={<div>Some default message</div>}
                                                                              tooltipContent="Some default tooltip"
                                                                              {...props}/>)

  it('renders', () => {
    const result = renderComponent()
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'tooltip').length).toEqual(1)
  })

  it('renders with content', () => {
    const result = renderComponent()
    const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
    expect(content.textContent).toContain('Some default message')
  })

  it('renders with tooltip content', () => {
    const result = renderComponent()
    const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
    expect(container.children.length).toEqual(1)
    expect(container.children[0].className).toEqual('tooltip-content')
    expect(container.children[0].textContent).toEqual('Some default tooltip')
  })

  it('renders with node content, node tooltip content', () => {
    const nodeContent = <div className="inner-content">Hello World</div>
    const nodeTooltipContent = <div className="inner-tooltip-content">Hello world</div>
    const result = renderComponent({content: nodeContent, tooltipContent: nodeTooltipContent})
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')

    expect(tooltip.className).toContain('tooltip')
    expect(tooltip.className).toContain('inner-content')

    expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'inner-tooltip-content')).not.toBeUndefined()
  })

  it('renders with node content, string tooltip content', () => {
    const nodeContent = <div className="inner-content">Hello World</div>
    const result = renderComponent({content: nodeContent})

    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
    expect(tooltip.className).toContain('tooltip')
    expect(tooltip.className).toContain('inner-content')
  })

  it('propagates classname, id, style to the wrapping tooltip', () => {
    const result = renderComponent({
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'red'}
    })
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')

    expect(tooltip.className).toContain('some-classname')
    expect(tooltip.id).toEqual('some-id')
    expect(tooltip.style.color).toEqual('red')
  })

  it('calls onEnter when tooltip is made visible', () => {
    const enterSpy = jasmine.createSpy('enterSpy')
    const result = renderComponent({onEnter: enterSpy})
    const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')

    ReactTestUtils.Simulate.mouseEnter(container)
    jasmine.clock().tick(1)

    expect(enterSpy).toHaveBeenCalled()
  })

  it('calls onExit when tooltip is made hidden', () => {
    const exitSpy = jasmine.createSpy('exitSpy')
    const result = renderComponent({onExit: exitSpy})
    const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')

    ReactTestUtils.Simulate.mouseEnter(container)
    jasmine.clock().tick(1)
    ReactTestUtils.Simulate.mouseLeave(container)
    jasmine.clock().tick(1)

    expect(exitSpy).toHaveBeenCalled()
  })

  describe('position', () => {
    it('defaults to nothing, which is "top" in css', () => {
      const result = renderComponent()
      const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
      expect(container.className).toEqual('tooltip')
    })

    it('allows user to specify left, right, top, bottom', () => {
      let result = renderComponent({position: 'left'})
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-left')).not.toBeUndefined()

      result = renderComponent({position: 'right'})
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-right')).not.toBeUndefined()

      result = renderComponent({position: 'bottom'})
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-bottom')).not.toBeUndefined()

      result = renderComponent({position: 'top'})
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip').className).toEqual('tooltip')
    })
  })

  describe('trigger', () => {
    it('defaults to hover', () => {
      const result = renderComponent()
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
      const result = renderComponent({trigger: 'click'})
      const container = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip')
      const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')

      expect(tooltip.className).toContain('tooltip-container-hidden')

      ReactTestUtils.Simulate.click(container)
      jasmine.clock().tick(1)
      expect(tooltip.className).toContain('tooltip-container-visible')
    })

    it('hides the tooltip some time after clicking', () => {
      const result = renderComponent({trigger: 'click'})
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
