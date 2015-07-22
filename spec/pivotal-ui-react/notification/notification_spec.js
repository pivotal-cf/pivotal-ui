require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

describe('Notification', function() {
  var Notifications, NotificationItem;
  var props = {
    className: 'test-class',
    id: 'test-id',
    style: {
      opacity: '0.5'
    }
  };
  var itemProps = {
    className: 'test-item-class',
    id: 'test-item-id',
    style: {
      opacity: '0.75'
    }
  };
  beforeEach(function() {
    Notifications = require('../../../src/pivotal-ui-react/notifications/notifications').Notifications;
    NotificationItem = require('../../../src/pivotal-ui-react/notifications/notifications').NotificationItem;
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('when there are children', function() {
    beforeEach(function() {
      React.render((
        <Notifications {...props}>
          <NotificationItem {...itemProps} href="my-fee-link">fee</NotificationItem>
          <NotificationItem href="my-fi-link">fi</NotificationItem>
          <NotificationItem href="my-fo-link">fo</NotificationItem>
          <NotificationItem href="my-fum-link">fum</NotificationItem>
        </Notifications>), root);
    });

    it('passes through the className to the btn-group', function() {
      expect('#root .btn-group').toHaveClass(props.className);
    });

    it('passes through style to the button', function() {
      expect('#root .btn').toHaveCss(props.style);
    });

    it('passes through id to the button', function() {
      expect('#root .btn#test-id').toExist();
    });

    it('renders a notification count badge', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-badge').toContainText('4');
    });

    describe('NotificationItem', function() {
      itPropagatesAttributes('#root li:first', itemProps);
    });

    it('renders the children in a dropdown menu', function() {
      expect('.dropdown-menu a:eq(0)').toContainText('fee');
      expect('.dropdown-menu a:eq(0)').toHaveAttr('href', 'my-fee-link');

      expect('.dropdown-menu').toContainText('fi');
      expect('.dropdown-menu').toContainText('fo');
      expect('.dropdown-menu').toContainText('fum');
    });
  });

  describe('when there are no children', function() {
    beforeEach(function() {
      React.render(<Notifications/>, root);
    });

    it('does not render a badge', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-badge').not.toExist();
    });

    it('renders the no notification message', function() {
      expect('.dropdown-menu .dropdown-notifications-none').toContainText('no notifications');
    });
  });

  describe('when there are size modifiers', function() {
    beforeEach(function() {
      React.render(<Notifications size="h1"/>, root);
    });

    it('renders a h1 sized notification', function() {
      expect('.dropdown-notifications-title').toHaveClass('h1');
    });
  });
});

describe('Alert Notifications', function() {
  var AlertNotifications, NotificationItem;
  beforeEach(function() {
    AlertNotifications = require('../../../src/pivotal-ui-react/notifications/notifications').AlertNotifications;
    NotificationItem = require('../../../src/pivotal-ui-react/notifications/notifications').NotificationItem;
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('when there are children', function() {
    var props = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '0.5'
      }
    };
    beforeEach(function() {
      React.render((
        <AlertNotifications {...props}>
          <NotificationItem href="my-fee-link">fee</NotificationItem>
          <NotificationItem href="my-fi-link">fi</NotificationItem>
          <NotificationItem href="my-fo-link">fo</NotificationItem>
          <NotificationItem href="my-fum-link">fum</NotificationItem>
        </AlertNotifications>), root);
    });

    it('renders a notification alert icon', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-alert').toHaveClass('fa-exclamation-triangle');
    });

    it('renders the children in a dropdown menu', function() {
      expect('.dropdown-menu a:eq(0)').toContainText('fee');
      expect('.dropdown-menu a:eq(0)').toHaveAttr('href', 'my-fee-link');

      expect('.dropdown-menu').toContainText('fi');
      expect('.dropdown-menu').toContainText('fo');
      expect('.dropdown-menu').toContainText('fum');
    });

    it('passes through the className to the btn-group', function() {
      expect('#root .btn-group').toHaveClass(props.className);
    });

    it('passes through style to the button', function() {
      expect('#root .btn').toHaveCss(props.style);
    });

    it('passes through id to the button', function() {
      expect('#root .btn#test-id').toExist();
    });
  });


  describe('when there are no children', function() {
    beforeEach(function() {
      React.render(<AlertNotifications/>, root);
    });

    it('does not render an alert icon', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-alert').not.toExist();
    });

    it('renders the no notification message', function() {
      expect('.dropdown-menu .dropdown-notifications-none').toContainText('no alerts');
    });
  });

  describe('when there are size modifiers', function() {
    beforeEach(function() {
      React.render(<AlertNotifications size="h1"/>, root);
    });

    it('renders a h1 sized notification', function() {
      expect('.dropdown-notifications-title').toHaveClass('h1');
    });
  });
});
