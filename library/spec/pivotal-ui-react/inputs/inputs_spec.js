import '../spec_helper'
import {Input} from '../../../src/pivotal-ui-react/inputs/inputs'
import ReactTestUtils from 'react-addons-test-utils'

describe('Input Component', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Input {...props}/>)

  it('renders', () => {
    const result = renderComponent()
    const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input')
    expect(component).not.toBeUndefined()
  })

  it('propagates id, classname, style', () => {
    const result = renderComponent({id: 'some-id', className: 'some-class', style: {color: 'red'}})

    const input = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input')
    expect(input).toHaveAttr('id', 'some-id')
    expect(input).toHaveCss({color: 'red'})

    const formGroup = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'form-group')
    expect(formGroup).toHaveClass('some-class')
  })

  it('displays a checkmark when success prop is true', () => {
    const result = renderComponent({success: true})

    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'success').length).toEqual(1)

    const svg = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'svg')
    expect(svg.className.baseVal).toEqual('icon-check')
  })

  it('renders search icons when search prop is true', () => {
    const result = renderComponent({search: true})

    const formGroup = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'form-group')
    expect(formGroup).toHaveClass('form-group-left-icon')

    const svg = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'svg')
    expect(svg.className.baseVal).toEqual('icon-search')
  })

  describe('label', () => {
    it('when not given a label prop it wont render a label element', () => {
      const result = renderComponent({label: null})
      const labels = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'label')
      expect(labels.length).toEqual(0)
    })

    it('when given a label prop it will render a label element', () => {
      const result = renderComponent({label: 'label text'})
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'label')
      expect(component).not.toBeUndefined()
      expect(component).toHaveText('label text')
    })
  })

  describe('leftIcon', () => {
    it('renders a form group with icon', () => {
      const result = renderComponent({leftIcon: 'add'})

      const formGroup = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'form-group')
      expect(formGroup).toHaveClass('form-group-left-icon')

      const svgs = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'svg')
      expect(svgs[0].className.baseVal).toEqual('icon-add')
    })

    it('overrides search option', () => {
      const result = renderComponent({leftIcon: 'add', search: true})
      const svgs = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'icon-search')
      expect(svgs.length).toEqual(0)
    })

    it('can be used simultaneously with success', () => {
      const result = renderComponent({leftIcon: 'add', success: true})
      const svgs = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'icon-check')
      expect(svgs.length).toEqual(1)
    })

    it('allows node icons', () => {
      const result = renderComponent({leftIcon: <div className="my-custom-icon-node">Hello!</div>})
      const innerNode = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'my-custom-icon-node')
      expect(innerNode.length).toEqual(1)
    })
  })

  describe('when a placeholder is provided', () => {
    it('renders the input with a placeholder', () => {
      const result = renderComponent({placeholder: 'Search here...'})
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input')
      expect(input.placeholder).toEqual('Search here...')

      expect(input.hasAttribute('aria-label')).toBeTruthy()
      expect(input.getAttribute('aria-label')).toEqual('Search here...')
    })

    it('uses the label as the aria-label instead of the placeholder when an aria-label is provided as well', () => {
      const result = renderComponent({placeholder: 'Search here...', 'aria-label': 'Search Box'})
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input')
      expect(input.getAttribute('aria-label')).toEqual('Search Box')
    })
  })
})
