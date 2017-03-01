import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils';
import {Tooltip} from '../../../src/pivotal-ui-react/tooltip/tooltip'

describe('Tooltip Component', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Tooltip content="Some default tooltip"
                                                                              {...props}/>)

  it('renders', () => {
    const result = renderComponent()
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'tooltip-container').length).toEqual(1)
  })

  it('renders the tooltip content', () => {
    const result = renderComponent()
    const tooltipContent = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-content')

    expect(tooltipContent).toBeDefined()
    expect(tooltipContent.textContent).toEqual('Some default tooltip')
  })

  it('propagates classname, id, style to the wrapping tooltip', () => {
    const result = renderComponent({
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'red'}
    })
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')

    expect(tooltip.className).toContain('some-classname')
    expect(tooltip.id).toEqual('some-id')
    expect(tooltip.style.color).toEqual('red')
  })

  describe('visible', () => {
    it('renders visible by default', () => {
      const result = renderComponent()
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content.className).toContain('tooltip-container-visible')
    })

    it('hides when visible is set to false', () => {
      const result = renderComponent({visible: false})
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content.className).toContain('tooltip-container-hidden')
    })
  })

  describe('size', () => {
    it('renders auto width by default', () => {
      const result = renderComponent()
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content.className).toEqual('tooltip-container tooltip-container-visible')
    })

    it('renders a small tooltip when small size is specified', () => {
      const result = renderComponent({size: 'sm'})
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content.className).toContain('tooltip-sm')
    })

    it('renders a medium tooltip when small size is specified', () => {
      const result = renderComponent({size: 'md'})
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content.className).toContain('tooltip-md')
    })

    it('renders a large tooltip when small size is specified', () => {
      const result = renderComponent({size: 'lg'})
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content.className).toContain('tooltip-lg')
    })
  })
})