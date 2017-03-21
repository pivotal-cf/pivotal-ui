import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils';
import {Tooltip} from 'pui-react-tooltip'

describe('Tooltip Component', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Tooltip {...props}>Some default tooltip</Tooltip>)

  it('renders', () => {
    const result = renderComponent()
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'tooltip-container').length).toEqual(1)
  })

  it('renders the tooltip content', () => {
    const result = renderComponent()
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-content')

    expect(tooltip).toHaveText('Some default tooltip')
  })

  it('propagates classname, id, style to the wrapping tooltip', () => {
    const result = renderComponent({
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'red'}
    })
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')

    expect(tooltip).toHaveClass('some-classname')
    expect(tooltip).toHaveAttr('id', 'some-id')
    expect(tooltip).toHaveCss({color: 'red'})
  })

  describe('visible', () => {
    it('renders visible by default', () => {
      const result = renderComponent()
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content).toHaveClass('tooltip-container-visible')
    })

    it('hides when visible is set to false', () => {
      const result = renderComponent({visible: false})
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content).toHaveClass('tooltip-container-hidden')
    })
  })

  describe('size', () => {
    it('renders auto width by default', () => {
      const result = renderComponent()
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content).toHaveClass('tooltip-container')
      expect(content).toHaveClass('tooltip-container-visible')
    })

    it('renders a small tooltip when small size is specified', () => {
      const result = renderComponent({size: 'sm'})
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content).toHaveClass('tooltip-sm')
    })

    it('renders a medium tooltip when small size is specified', () => {
      const result = renderComponent({size: 'md'})
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content).toHaveClass('tooltip-md')
    })

    it('renders a large tooltip when small size is specified', () => {
      const result = renderComponent({size: 'lg'})
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
      expect(content).toHaveClass('tooltip-lg')
    })
  })
})