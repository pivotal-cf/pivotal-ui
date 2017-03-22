import '../spec_helper'
import {Icon} from 'pui-react-iconography'
import ReactTestUtils from 'react-addons-test-utils'
import {findByClass} from '../spec_helper'

describe('iconography', () => {
  let result
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Icon {...props}/>)

  it('works', () => {
    result = renderComponent({src: 'add'})
    const icon = findByClass(result, 'icon')

    expect(icon.querySelector('svg')).toHaveClass('icon-add')
  })

  it('renders a div with the className and id', () => {
    result = renderComponent({src: 'add', className: 'foo', id: 'bar'})
    const icon = findByClass(result, 'icon')

    expect(icon.tagName).toEqual('DIV')
    expect(icon).toHaveClass('foo')
    expect(icon).toHaveAttr('id', 'bar')
  })

  describe('verticalAlign', () => {
    it('applies .icon-middle by default', () => {
      result = renderComponent({src: 'add'})
      expect(findByClass(result, 'icon')).toHaveClass('icon-middle')
    })

    it('applies .icon-middle when middle', () => {
      result = renderComponent({src: 'add', verticalAlign: 'middle'})
      expect(findByClass(result, 'icon')).toHaveClass('icon-middle')
    })

    it('applies .icon-baseline when baseline', () => {
      result = renderComponent({src: 'add', verticalAlign: 'baseline'})
      expect(findByClass(result, 'icon')).toHaveClass('icon-baseline')
    })
  })
})
