import '../spec_helper'
import {Input} from 'pui-react-inputs'
import ReactTestUtils from 'react-addons-test-utils'
import {findByClass, findAllByClass, findByTag, findAllByTag} from '../spec_helper'

describe('Input Component', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Input {...props}/>)
  const renderIntoDom = props => ReactDOM.render(<Input {...props}/>, root)

  it('renders', () => {
    const result = renderComponent()
    const component = findByTag(result, 'input')
    expect(component).not.toBeUndefined()
  })

  it('propagates id, classname, style', () => {
    const result = renderComponent({id: 'some-id', className: 'some-class', style: {color: 'red'}})

    const input = findByTag(result, 'input')
    expect(input).toHaveAttr('id', 'some-id')
    expect(input).toHaveCss({color: 'red'})

    const formGroup = findByClass(result, 'form-group')
    expect(formGroup).toHaveClass('some-class')
  })

  it('displays a checkmark when success prop is true', () => {
    const result = renderComponent({success: true})

    expect(findAllByClass(result, 'success').length).toEqual(1)

    expect(findByTag(result, 'svg')).toHaveClass('icon-check')
  })

  it('renders search icons when search prop is true', () => {
    const result = renderComponent({search: true})

    const formGroup = findByClass(result, 'form-group')
    expect(formGroup).toHaveClass('form-group-left-icon')

    expect(findByTag(result, 'svg')).toHaveClass('icon-search')
  })

  describe('label', () => {
    it('when not given a label prop it wont render a label element', () => {
      const result = renderComponent({label: null})
      expect(findAllByTag(result, 'label')).toHaveLength(0)
    })

    it('when given a label prop it will render a label element', () => {
      const result = renderComponent({label: 'label text'})
      const component = findByTag(result, 'label')
      expect(component).toHaveText('label text')
    })
  })

  describe('autoFocus', () => {
    it('focuses when true', () => {
      const result = renderIntoDom({autoFocus: true})
      const input = findByTag(result, 'input')
      expect(input).toBeFocused()
    })

    it('does not focus when false', () => {
      const result = renderIntoDom({autoFocus: false})
      const input = findByTag(result, 'input')
      expect(input).not.toBeFocused()
    })
  })

  describe('leftIcon', () => {
    it('renders a form group with icon', () => {
      const result = renderComponent({leftIcon: 'add'})

      const formGroup = findByClass(result, 'form-group')
      expect(formGroup).toHaveClass('form-group-left-icon')

      const svg = findByTag(result, 'svg')
      expect(svg).toHaveClass('icon-add')
    })

    it('overrides search option', () => {
      const result = renderComponent({leftIcon: 'add', search: true})
      expect(findAllByClass(result, 'icon-search')).toHaveLength(0)
    })

    it('can be used simultaneously with success', () => {
      const result = renderComponent({leftIcon: 'add', success: true})
      expect(findByClass(result, 'icon-check')).toBeDefined()
    })

    it('allows node icons', () => {
      const result = renderComponent({leftIcon: <div className="my-custom-icon-node">Hello!</div>})
      expect(findByClass(result, 'my-custom-icon-node')).toBeDefined()
    })
  })

  describe('when a placeholder is provided', () => {
    it('renders the input with a placeholder', () => {
      const result = renderComponent({placeholder: 'Search here...'})
      const input = findByTag(result, 'input')
      expect(input.placeholder).toEqual('Search here...')

      expect(input).toHaveAttr('aria-label', 'Search here...')
    })

    it('uses the label as the aria-label instead of the placeholder when an aria-label is provided as well', () => {
      const result = renderComponent({placeholder: 'Search here...', 'aria-label': 'Search Box'})
      const input = findByTag(result, 'input')
      expect(input).toHaveAttr('aria-label', 'Search Box')
    })
  })

  describe('size attribute for input and label', () => {
    it('renders with size=medium by default', () => {
      const result = renderComponent({label: 'my label'})
      const input = findByTag(result, 'input')
      expect(input).not.toHaveClass('input-lg')
      expect(input).not.toHaveClass('input-sm')
      const label = findByTag(result, 'label')
      expect(label).not.toHaveClass('label-lg')
      expect(label).not.toHaveClass('label-sm')
    })

    it('respects size attribute', () => {
      let result = renderComponent({size: 'small', label: 'my label'});
      let input = findByTag(result, 'input')
      expect(input).toHaveClass('input-sm')
      let label = findByTag(result, 'label')
      expect(label).toHaveClass('label-sm')

      result = renderComponent({size: 'medium', label: 'my label'});
      input = findByTag(result, 'input')
      expect(input).not.toHaveClass('input-lg')
      expect(input).not.toHaveClass('input-sm')
      label = findByTag(result, 'label')
      expect(label).not.toHaveClass('label-lg')
      expect(label).not.toHaveClass('label-sm')

      result = renderComponent({size: 'large', label: 'my label'});
      input = findByTag(result, 'input')
      expect(input).toHaveClass('input-lg')
      label = findByTag(result, 'label')
      expect(label).toHaveClass('label-lg')
    })
  })
})
