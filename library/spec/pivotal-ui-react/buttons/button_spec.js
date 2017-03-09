require('../spec_helper')
import {UIButton} from 'pui-react-buttons'
import ReactTestUtils from 'react-addons-test-utils'
import {Icon} from 'pui-react-iconography'

describe('UIButton', () => {
  let subject
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<UIButton {...props}>Click here</UIButton>)

  it('creates a button', () => {
    subject = renderComponent()
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

    expect(button.classList).toContain('btn')
    expect(button.classList).toContain('btn-default')
    expect(button.textContent).toContain('Click here')
  })

  describe('when href attribute is set', () => {
    it('creates a link', () => {
      subject = renderComponent({href: 'http://example.com'})
      const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn')

      expect(button.href).toEqual('http://example.com/')
    })
  })

  describe('when kind attribute is set', () => {
    it('adds the type class to the button', () => {
      let button
      ['default', 'danger', 'brand', 'primary'].forEach(kind => {
        subject = renderComponent({kind})
        button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

        expect(button.className).toEqual(`btn btn-${kind}`)
      })
    })
  })

  describe('when large is true', () => {
    it('adds the large button class', () => {
      subject = renderComponent({large: true})
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

      expect(button.classList).toContain('btn-lg')
    })
  })

  describe('when small is true', () => {
    it('adds the small button class', () => {
      subject = renderComponent({small: true})
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

      expect(button.classList).toContain('btn-sm')
    })
  })

  describe('when iconOnly is true', () => {
    it('adds the btn-icon class', () => {
      subject = renderComponent({iconOnly: true})
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

      expect(button.classList).toContain('btn-icon')
    })
  })

  describe('when alt is true', () => {
    it('adds the appropriate alt class', () => {
      let button
      ['default', 'danger', 'brand', 'primary'].forEach(kind => {
        subject = renderComponent({kind, alt: true})
        button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

        expect(button.classList).toContain(`btn-${kind}-alt`)
      })
    })
  })

  describe('when flat is true', () => {
    it('adds the appropriate flat class', () => {
      let button
      ['default', 'danger', 'brand', 'primary'].forEach(kind => {
        subject = renderComponent({kind, flat: true})
        button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

        expect(button.classList).toContain(`btn-${kind}-flat`)
      })
    })
  })

  it('passes custom classNames through', () => {
    subject = renderComponent({className: 'custom-class-1 custom-class-2'})
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

    expect(button.classList).toContain('custom-class-1')
    expect(button.classList).toContain('custom-class-2')
  })

  it('passes through the data-attributes', () => {
    subject = renderComponent({'data-click': 'myFunction', 'data-foo': 'bar'})
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button')

    expect(button.attributes['data-click'].value).toEqual('myFunction')
    expect(button.attributes['data-foo'].value).toEqual('bar')
  })

  describe('icon property', () => {
    it('renders with an icon child node if one is passed in', () => {
      subject = renderComponent({
        icon: <Icon src="add" />
      })
      const icon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'icon')
      expect(icon.parentNode.tagName).toEqual('BUTTON')
    })
  })
})
