require('../spec_helper')
import ReactTestUtils from 'react-addons-test-utils'
import {Ribbon, PrimaryRibbon, Banner} from 'pui-react-ribbons'

let subject

describe('Ribbon', () => {
  const renderRibbon = props => ReactTestUtils.renderIntoDocument(<Ribbon {...props}>British</Ribbon>)

  describe('basic Ribbon', () => {
    it('renders a ribbon', () => {
      subject = renderRibbon()
      const ribbon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'ribbon')
      expect(ribbon).toHaveText('British')
      expect(ribbon).not.toHaveClass('ribbon-primary')
    })
  })

  describe('Ribbon with custom attributes', () => {
    it('renders a ribbon with custom attributes', () => {
      subject = renderRibbon({className: '1234', id: 'test', style: {color: 'red'}})
      const ribbon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'ribbon')

      expect(ribbon).toHaveClass('1234')
      expect(ribbon.id).toEqual('test')
      expect(ribbon).toHaveCss({color: 'red'})
    })
  })
})

describe('PrimaryRibbon', () => {
  const renderPrimaryRibbon = props => ReactTestUtils.renderIntoDocument(<PrimaryRibbon {...props}>British</PrimaryRibbon>)

  describe('basic PrimaryRibbon', () => {
    it('adds the ribbon-primary class', () => {
      subject = renderPrimaryRibbon()
      const ribbon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'ribbon')
      expect(ribbon).toHaveText('British')
      expect(ribbon).toHaveClass('ribbon-primary')
    })
  })

  describe('PrimaryRibbon with custom attributes', () => {
    it('renders a ribbon with custom attributes', () => {
      subject = renderPrimaryRibbon({className: '1234', id: 'test', style: {color: 'red'}})
      const ribbon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'ribbon')

      expect(ribbon).toHaveClass('1234')
      expect(ribbon.id).toEqual('test')
      expect(ribbon).toHaveCss({color: 'red'})
    })
  })
})

describe('Banner', () => {
  const renderBanner = props => ReactTestUtils.renderIntoDocument(<Banner {...props}>British</Banner>)

  describe('basic banner', () => {
    it('has the ribbon-banner class', () => {
      subject = renderBanner()
      const ribbon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'ribbon-banner')
      expect(ribbon).toHaveText('British')
      expect(ribbon).not.toHaveClass('ribbon')
    })
  })

  describe('Banner with custom attributes', () => {
    it('renders a banner with custom attributes', () => {
      subject = renderBanner({className: '1234', id: 'test', style: {color: 'red'}})
      const ribbon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'ribbon-banner')

      expect(ribbon).toHaveClass('1234')
      expect(ribbon.id).toEqual('test')
      expect(ribbon).toHaveCss({color: 'red'})
    })
  })
})
