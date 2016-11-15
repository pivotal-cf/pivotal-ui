require('../spec_helper');

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
    ReactDOM.unmountComponentAtNode(root);
  });

  describe('when there are children', function() {
    beforeEach(function() {
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

    it('passes through the className to the btn-group', function() {
      expect('.dropdown').toHaveClass(props.className);
    });

    it('passes through style to the button', function() {
      expect('.dropdown').toHaveCss(props.style);
    });

    it('passes through id to the button', function() {
      expect('.dropdown').toHaveAttr('id', 'test-id');
    });

    it('renders a notification count badge', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-badge').toContainText('4');
    });

    describe('NotificationItem', function() {
      it('passes through className to the li ', function() {
        expect('#root li:first').toHaveClass(itemProps.className);
      });

      it('passes through style to the li', function() {
        expect('#root li:first').toHaveCss(itemProps.style);
      });

      it('passes through id to the anchor', function() {
        expect('#root li:first a#test-item-id').toExist();
      });
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
      ReactDOM.render(<Notifications/>, root);
    });

    it('does not render a badge', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-badge').not.toExist();
    });

    it('renders the no notification message on click', function() {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu .dropdown-notifications-none').toContainText('no notifications');
    });
  });

  describe('when there are size modifiers', function() {
    beforeEach(function() {
      ReactDOM.render(<Notifications size="h1"/>, root);
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
    ReactDOM.unmountComponentAtNode(root);
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
      ReactDOM.render((
        <AlertNotifications {...props}>
          <NotificationItem href="my-fee-link">fee</NotificationItem>
          <NotificationItem href="my-fi-link">fi</NotificationItem>
          <NotificationItem href="my-fo-link">fo</NotificationItem>
          <NotificationItem href="my-fum-link">fum</NotificationItem>
        </AlertNotifications>), root);
    });

    it('renders a notification alert icon', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-alert svg').toHaveClass('icon-warning');
    });

    it('renders the children in a dropdown menu on click', function() {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu a:eq(0)').toContainText('fee');
      expect('.dropdown-menu a:eq(0)').toHaveAttr('href', 'my-fee-link');

      expect('.dropdown-menu').toContainText('fi');
      expect('.dropdown-menu').toContainText('fo');
      expect('.dropdown-menu').toContainText('fum');
    });

    it('passes through the className to the btn-group', function() {
      expect('.dropdown').toHaveClass(props.className);
    });

    it('passes through style to the button', function() {
      expect('.dropdown').toHaveCss(props.style);
    });

    it('passes through id to the button', function() {
      expect('.dropdown').toHaveAttr('id', 'test-id');
    });
  });

  describe('when there are no children', function() {
    beforeEach(function() {
      ReactDOM.render(<AlertNotifications/>, root);
    });

    it('does not render an alert icon', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-alert').not.toExist();
    });

    it('renders the no notification message on click', function() {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu .dropdown-notifications-none').toContainText('no alerts');
    });
  });

  describe('when there are size modifiers', function() {
    beforeEach(function() {
      ReactDOM.render(<AlertNotifications size="h1"/>, root);
    });

    it('renders a h1 sized notification', function() {
      expect('.dropdown-notifications-title').toHaveClass('h1');
    });
  });
});
