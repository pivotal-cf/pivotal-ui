import '../spec_helper'
import {Notifications, NotificationItem, AlertNotifications} from 'pui-react-notifications'
import ReactTestUtils from 'react-addons-test-utils'

let subject

describe('Notification', () => {
  const renderComponent = (props, itemProps) => ReactTestUtils.renderIntoDocument(<Notifications {...props}>
    <NotificationItem {...itemProps} href="my-fee-link">fee</NotificationItem>
    <NotificationItem href="my-fi-link">fi</NotificationItem>
    <NotificationItem href="my-fo-link">fo</NotificationItem>
    <NotificationItem href="my-fum-link">fum</NotificationItem>
  </Notifications>)

  describe('when there are children', () => {
    beforeEach(() => {
      const props = {
        className: 'test-class',
        id: 'test-id',
        style: {
          opacity: '0.5'
        }
      }
      const itemProps = {
        className: 'test-item-class',
        id: 'test-item-id',
        style: {
          opacity: '0.75'
        }
      }
      subject = renderComponent(props, itemProps)
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-toggle')
      ReactTestUtils.Simulate.click(toggle)
    })

    it('renders the bell', () => {
      const title = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-notifications-title')
      const svg = title.getElementsByTagName('svg')[0]

      expect(svg).toHaveClass('icon-notifications')
    })

    it('passes through the className, style, and id to the dropdown', () => {
      const dropdown = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown')

      expect(dropdown).toHaveClass('test-class')
      expect(dropdown).toHaveCss({opacity: '0.5'})
      expect(dropdown).toHaveAttr('id', 'test-id')
    })

    it('renders a notification count badge', () => {
      const title = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-notifications-title')
      const badge = title.getElementsByClassName('dropdown-notifications-badge')

      expect(badge).toContainText('4')
    })

    it('renders the children in a dropdown menu', () => {
      const menu = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-menu')
      const firstLink = menu.getElementsByTagName('a')[0]

      expect(firstLink).toContainText('fee')
      expect(firstLink).toHaveAttr('href', 'my-fee-link')
      expect(menu).toContainText('fi')
      expect(menu).toContainText('fo')
      expect(menu).toContainText('fum')
    })

    describe('NotificationItem', () => {
      it('passes through className and style to the li ', () => {
        const firstItem = ReactTestUtils.scryRenderedComponentsWithType(subject, NotificationItem)[0]
        const listItem = ReactTestUtils.findRenderedDOMComponentWithTag(firstItem, 'li')
        expect(listItem).toHaveClass('test-item-class')
        expect(listItem).toHaveCss({opacity: '0.75'})
      })

      it('passes through id to the anchor', () => {
        const firstItem = ReactTestUtils.scryRenderedComponentsWithType(subject, NotificationItem)[0]
        const listItem = ReactTestUtils.findRenderedDOMComponentWithTag(firstItem, 'li')
        const anchor = listItem.getElementsByTagName('a')

        expect(anchor).toHaveAttr('id', 'test-item-id')
      })
    })
  })

  describe('when there are no children', () => {
    beforeEach(() => {
      subject = ReactTestUtils.renderIntoDocument(<Notifications />)
    })

    it('does not render a badge', () => {
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'dropdown-notifications-badge')).toHaveLength(0)
    })

    it('renders the no notification message on click', () => {
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-toggle')
      ReactTestUtils.Simulate.click(toggle)

      const menu = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-menu')
      const notificationsMsg = menu.getElementsByClassName('dropdown-notifications-none')

      expect(notificationsMsg).toHaveText('no notifications')
    })
  })

  describe('when there are size modifiers', () => {
    it('renders a h1 sized notification', () => {
      subject = renderComponent({size: 'h1'})

      const title = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-notifications-title')
      expect(title).toHaveClass('h1')
    })
  })
})

describe('Alert Notifications', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<AlertNotifications {...props}>
    <NotificationItem href="my-fee-link">fee</NotificationItem>
    <NotificationItem href="my-fi-link">fi</NotificationItem>
    <NotificationItem href="my-fo-link">fo</NotificationItem>
    <NotificationItem href="my-fum-link">fum</NotificationItem>
  </AlertNotifications>)

  describe('when there are children', () => {
    beforeEach(() => {
      const props = {
        className: 'test-class',
        id: 'test-id',
        style: {
          opacity: '0.5'
        }
      }

      subject = renderComponent(props)
    })

    it('renders a notification alert icon', () => {
      const title = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-notifications-title')
      const alert = title.getElementsByClassName('dropdown-notifications-alert')[0]
      const svg = alert.getElementsByTagName('svg')[0]

      expect(svg).toHaveClass('icon-warning')
    })

    it('renders the children in a dropdown menu on click', () => {
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-toggle')
      ReactTestUtils.Simulate.click(toggle)

      const menu = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-menu')
      const firstLink = menu.getElementsByTagName('a')[0]

      expect(firstLink).toContainText('fee')
      expect(firstLink).toHaveAttr('href', 'my-fee-link')
      expect(menu).toContainText('fi')
      expect(menu).toContainText('fo')
      expect(menu).toContainText('fum')
    })

    it('passes through the className, style, and id to the dropdown', () => {
      const dropdown = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown')

      expect(dropdown).toHaveClass('test-class')
      expect(dropdown).toHaveCss({opacity: '0.5'})
      expect(dropdown).toHaveAttr('id', 'test-id')
    })
  })

  describe('when there are no children', () => {
    beforeEach(() => {
      subject = ReactTestUtils.renderIntoDocument(<AlertNotifications/>)
    })

    it('does not render an alert icon', () => {
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'dropdown-notifications-alert')).toHaveLength(0)
    })

    it('renders the no notification message on click', () => {
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-toggle')
      ReactTestUtils.Simulate.click(toggle)

      const menu = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-menu')
      const notificationsMsg = menu.getElementsByClassName('dropdown-notifications-none')

      expect(notificationsMsg).toHaveText('no alerts')
    })
  })

  describe('when there are size modifiers', () => {
    it('renders a h1 sized notification', () => {
      subject = renderComponent({size: 'h1'})

      const title = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'dropdown-notifications-title')
      expect(title).toHaveClass('h1')
    })
  })
})
