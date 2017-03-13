import '../spec_helper'
import {Label} from '../../../src/pivotal-ui-react/labels/labels'
import ReactTestUtils from 'react-addons-test-utils'

describe('Label Component', () => {
  const renderComponent = (props, children) => ReactTestUtils.renderIntoDocument(<Label {...props}>{children}</Label>)

  it('renders a primary colored label', () => {
    const result = renderComponent({}, 'bananas')
    const span = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'span')

    expect(span).toHaveClass('label')
    expect(span).toHaveClass('label-primary')
    expect(span).toHaveText('bananas')
  })

  it('propagates id, classname, style', () => {
    const result = renderComponent({id: 'some-id', className: 'some-class', style: {color: 'red'}})
    const span = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'span')

    expect(span).toHaveAttr('id', 'some-id')
    expect(span.className).toEqual('some-class')
    expect(span).toHaveCss({color: 'red'})
  })
})
