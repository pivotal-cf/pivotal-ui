require('../spec_helper')
import {Svg} from 'pui-react-svg'
import ReactTestUtils from 'react-addons-test-utils'

describe('Svg', () => {
  let subject

  const renderComponent = props => ReactTestUtils.renderIntoDocument(<MySvg src="search" {...props} />)
  class MySvg extends Svg {
    svgPathLoader(src) {
      return require(`!!babel-loader!svg-react-loader!./${src}.svg`)
    }
  }

  it('renders an svg', () => {
    subject = renderComponent()
    const svg = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'svg')
    expect(svg.childNodes[3].tagName).toEqual('path')
  })

  it('renders the svg with the html attributes', () => {
    subject = renderComponent()
    const svg = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'svg')
    expect(svg.attributes['x'].value).toEqual('0px')
    expect(svg.attributes['y'].value).toEqual('0px')
    expect(svg.attributes['viewBox'].value).toEqual('0 0 225 225')
  })

  describe('when there are props on the svg', () => {
    it('overrides the html attributes', () => {
      subject = renderComponent({x: '10px', y: '20px'})
      const svg = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'svg')
      expect(svg.attributes['x'].value).toEqual('10px')
      expect(svg.attributes['y'].value).toEqual('20px')
    })
  })
})
