import '../spec_helper'
import {Svg} from 'pui-react-svg'
import ReactTestUtils from 'react-addons-test-utils'
import {findByTag} from '../spec_helper'

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
    const svg = findByTag(subject, 'svg')
    expect(svg.childNodes[3].tagName).toEqual('path')
  })

  it('renders the svg with the html attributes', () => {
    subject = renderComponent()
    const svg = findByTag(subject, 'svg')
    expect(svg).toHaveAttr('x', '0px')
    expect(svg).toHaveAttr('y', '0px')
    expect(svg).toHaveAttr('viewBox', '0 0 225 225')
  })

  describe('when there are props on the svg', () => {
    it('overrides the html attributes', () => {
      subject = renderComponent({x: '10px', y: '20px'})
      const svg = findByTag(subject, 'svg')
      expect(svg).toHaveAttr('x', '10px')
      expect(svg).toHaveAttr('y', '20px')
    })
  })
})
