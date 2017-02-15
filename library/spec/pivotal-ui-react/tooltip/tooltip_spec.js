import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils';
import {Tooltip} from '../../../src/pivotal-ui-react/tooltip/tooltip'

describe('tooltip', () => {
  it('renders', () => {
    const result = ReactTestUtils.renderIntoDocument(<Tooltip>Hello World</Tooltip>)
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'pui-tooltip').length).toEqual(1)
  })
})
