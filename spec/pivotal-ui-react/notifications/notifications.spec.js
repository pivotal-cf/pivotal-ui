import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Notifications, NotificationItem, AlertNotifications} from '../../../src/react/notifications';

describe('Notifications', () => {
  const props = {
    className: 'test-class',
    id: 'test-id',
    style: {
      opacity: '0.5'
    }
  };
  const itemProps = {
    className: 'test-item-class',
    id: 'test-item-id',
    style: {
      opacity: '0.75'
    }
  };

  describe('when there are children', () => {
    beforeEach(() => {
      ReactDOM.render((
        <Notifications {...props}>
          <NotificationItem {...itemProps} href="my-fee-link">fee</NotificationItem>
          <NotificationItem href="my-fi-link">fi</NotificationItem>
          <NotificationItem href="my-fo-link">fo</NotificationItem>
          <NotificationItem href="my-fum-link">fum</NotificationItem>
        </Notifications>), root);

      $('.dropdown-toggle').simulate('click');
    });

    it('renders the bell', () => {
      expect('.dropdown-notifications-title svg.icon-notifications').toExist();
    });

    it('passes through the className to the btn-group', () => {
      expect('.dropdown').toHaveClass(props.className);
    });

    it('passes through style to the button', () => {
      expect('.dropdown').toHaveCss(props.style);
    });

    it('passes through id to the button', () => {
      expect('.dropdown').toHaveAttr('id', 'test-id');
    });

    it('renders a notification count badge', () => {
      expect('.dropdown-notifications-title .dropdown-notifications-badge').toContainText('4');
    });

    describe('NotificationItem', () => {
      it('passes through className to the li ', () => {
        expect('#root li:first a').toHaveClass(itemProps.className);
      });

      it('passes through style to the li', () => {
        expect('#root li:first a').toHaveCss(itemProps.style);
      });

      it('passes through id to the anchor', () => {
        expect('#root li:first a#test-item-id').toExist();
      });
    });

    it('renders the children in a dropdown menu', () => {
      expect('.dropdown-menu a:eq(0)').toContainText('fee');
      expect('.dropdown-menu a:eq(0)').toHaveAttr('href', 'my-fee-link');

      expect('.dropdown-menu').toContainText('fi');
      expect('.dropdown-menu').toContainText('fo');
      expect('.dropdown-menu').toContainText('fum');
    });
  });

  describe('when there are no children', () => {
    beforeEach(() => {
      ReactDOM.render(<Notifications/>, root);
    });

    it('does not render a badge', () => {
      expect('.dropdown-notifications-title .dropdown-notifications-badge').not.toExist();
    });

    it('renders the no notification message on click', () => {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu .dropdown-notifications-none').toContainText('no notifications');
    });
  });

  describe('when there are size modifiers', () => {
    beforeEach(() => {
      ReactDOM.render(<Notifications size="h1"/>, root);
    });

    it('renders a h1 sized notification', () => {
      expect('.dropdown-notifications-title').toHaveClass('h1');
    });
  });
});

describe('Alert Notifications', () => {
  describe('when there are children', () => {
    const props = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '0.5'
      }
    };
    beforeEach(() => {
      ReactDOM.render((
        <AlertNotifications {...props}>
          <NotificationItem href="my-fee-link">fee</NotificationItem>
          <NotificationItem href="my-fi-link">fi</NotificationItem>
          <NotificationItem href="my-fo-link">fo</NotificationItem>
          <NotificationItem href="my-fum-link">fum</NotificationItem>
        </AlertNotifications>), root);
    });

    it('renders a notification alert icon', () => {
      expect('.dropdown-notifications-title .dropdown-notifications-alert svg').toHaveClass('icon-warning');
    });

    it('renders the children in a dropdown menu on click', () => {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu a:eq(0)').toContainText('fee');
      expect('.dropdown-menu a:eq(0)').toHaveAttr('href', 'my-fee-link');

      expect('.dropdown-menu').toContainText('fi');
      expect('.dropdown-menu').toContainText('fo');
      expect('.dropdown-menu').toContainText('fum');
    });

    it('passes through the className to the btn-group', () => {
      expect('.dropdown').toHaveClass(props.className);
    });

    it('passes through style to the button', () => {
      expect('.dropdown').toHaveCss(props.style);
    });

    it('passes through id to the button', () => {
      expect('.dropdown').toHaveAttr('id', 'test-id');
    });
  });

  describe('when there are no children', () => {
    beforeEach(() => {
      ReactDOM.render(<AlertNotifications/>, root);
    });

    it('does not render an alert icon', () => {
      expect('.dropdown-notifications-title .dropdown-notifications-alert').not.toExist();
    });

    it('renders the no notification message on click', () => {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu .dropdown-notifications-none').toContainText('no alerts');
    });
  });

  describe('when there are size modifiers', () => {
    beforeEach(() => {
      ReactDOM.render(<AlertNotifications size="h1"/>, root);
    });

    it('renders a h1 sized notification', () => {
      expect('.dropdown-notifications-title').toHaveClass('h1');
    });
  });
});
