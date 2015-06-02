require('../spec_helper');

describe('Notification', function() {
  var Notifications, NotificationItem;
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
        <Notifications>
          <NotificationItem href="my-fee-link">fee</NotificationItem>
          <NotificationItem href="my-fi-link">fi</NotificationItem>
          <NotificationItem href="my-fo-link">fo</NotificationItem>
          <NotificationItem href="my-fum-link">fum</NotificationItem>
        </Notifications>), root);
    });

    it('renders a notification count badge', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-badge').toContainText('4');
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
    beforeEach(function() {
      React.render((
        <AlertNotifications>
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
});
