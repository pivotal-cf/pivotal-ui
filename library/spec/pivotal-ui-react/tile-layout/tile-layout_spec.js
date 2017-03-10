require('../spec_helper')
import ReactTestUtils from 'react-addons-test-utils'
import {TileLayout, TileLayoutItem} from 'pui-react-tile-layout'

describe('TileLayout', () => {
  const renderComponent = (tileLayoutProps, tileItemProps) => ReactTestUtils.renderIntoDocument(
    <TileLayout {...tileLayoutProps}>
      <TileLayoutItem {...tileItemProps}>
        Item 1
      </TileLayoutItem>
      <TileLayoutItem>
        Item 2
      </TileLayoutItem>
    </TileLayout>
  )

  it('creates tile-layout', () => {
    const result = renderComponent()
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tile-layout')).toBeTruthy()
  })

  it('creates tile-items', () => {
    const result = renderComponent()
    const tileLayout = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tile-layout')
    expect(tileLayout.childNodes.length).toEqual(2)

    expect(tileLayout.childNodes[0].className).toEqual('tile-item')
    expect(tileLayout.childNodes[0].textContent).toEqual('Item 1')
    expect(tileLayout.childNodes[1].className).toEqual('tile-item')
    expect(tileLayout.childNodes[1].textContent).toEqual('Item 2')
  })

  describe('columns', () => {
    it('supports setting number of columns', () => {
      const result = renderComponent({columns: 4})

      const tileLayout = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tile-layout')
      expect(tileLayout.classList).toContain('tile-layout-xs-4')
    })

    it('supports supports setting number of columns for different screen sizes', () => {
      const result = renderComponent({columns: {sm: 4, md: 3, lg: 2, xl: 1}})

      const tileLayout = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tile-layout')
      expect(tileLayout.classList).toContain('tile-layout-sm-4')
      expect(tileLayout.classList).toContain('tile-layout-md-3')
      expect(tileLayout.classList).toContain('tile-layout-lg-2')
      expect(tileLayout.classList).toContain('tile-layout-xl-1')
    })
  })

  describe('gutters', () => {
    it('supports no gutter', () => {
      const result = renderComponent({noGutter: true})
      const tileLayout = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tile-layout')

      expect(tileLayout.classList).not.toContain('tile-gutter')
    })

    it('has a gutter by default', () => {
      const result = renderComponent()
      const tileLayout = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tile-layout')

      expect(tileLayout.classList).toContain('tile-gutter')
    })
  })

  describe('attributes', () => {
    it('respects the passed-in class, id and style attributes', () => {
      const result = renderComponent({
        className: 'outer-class',
        id: 'outer-id',
        style: {opacity: '0.5'}
      }, {
        className: 'inner-class',
        id: 'inner-id',
        style: {opacity: '0.75'}
      })

      const tileLayout = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tile-layout')
      expect(tileLayout.classList).toContain('outer-class')
      expect(tileLayout.id).toEqual('outer-id')
      expect(tileLayout.style.opacity).toEqual('0.5')

      const tileItem = tileLayout.childNodes[0]
      expect(tileItem.classList).toContain('inner-class')
      expect(tileItem.id).toEqual('inner-id')
      expect(tileItem.style.opacity).toEqual('0.75')
    })
  })
})
