import '../spec_helper';
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

  describe('when there are children', function() {
    beforeEach(function() {
      subject = shallow((
        <Notifications {...props}>
          <NotificationItem {...itemProps} href="my-fee-link">fee</NotificationItem>
          <NotificationItem href="my-fi-link">fi</NotificationItem>
          <NotificationItem href="my-fo-link">fo</NotificationItem>
          <NotificationItem href="my-fum-link">fum</NotificationItem>
        </Notifications>));

      $('.dropdown-toggle').simulate('click');
    });

    it('renders the bell', () => {
      expect(subject.find('.dropdown-notifications-title svg.icon-notifications').exists()).toBeTruthy();
    });

    it('passes through the className to the btn-group', function() {
      expect(subject.find('.dropdown').hasClass(props.className)).toBeTruthy();
    });

    it('passes through style to the button', function() {
      expect(subject.find('.dropdown').prop('style')).toEqual(props.style);
    });

    it('passes through id to the button', function() {
      expect(subject.find('.dropdown').prop('id')).toBe('test-id');
    });

    it('renders a notification count badge', function() {
      expect('.dropdown-notifications-title .dropdown-notifications-badge').toContainText('4');
    });

    describe('NotificationItem', function() {
      it('passes through className to the li ', function() {
        expect(subject.find('#root li:first a').hasClass(itemProps.className)).toBeTruthy();
      });

      it('passes through style to the li', function() {
        expect(subject.find('#root li:first a').prop('style')).toEqual(itemProps.style);
      });

      it('passes through id to the anchor', function() {
        expect(subject.find('#root li:first a#test-item-id').exists()).toBeTruthy();
      });
    });

    it('renders the children in a dropdown menu', function() {
      expect('.dropdown-menu a:eq(0)').toContainText('fee');
      expect(subject.find('.dropdown-menu a:eq(0)').prop('href')).toBe('my-fee-link');

      expect('.dropdown-menu').toContainText('fi');
      expect('.dropdown-menu').toContainText('fo');
      expect('.dropdown-menu').toContainText('fum');
    });
  });

  describe('when there are no children', function() {
    beforeEach(function() {
      subject = shallow(<Notifications/>);
    });

    it('does not render a badge', function() {
      expect(subject.find('.dropdown-notifications-title .dropdown-notifications-badge').exists()).toBeFalsy();
    });

    it('renders the no notification message on click', function() {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu .dropdown-notifications-none').toContainText('no notifications');
    });
  });

  describe('when there are size modifiers', function() {
    beforeEach(function() {
      subject = shallow(<Notifications size="h1"/>);
    });

    it('renders a h1 sized notification', function() {
      expect(subject.find('.dropdown-notifications-title').hasClass('h1')).toBeTruthy();
    });
  });
});

describe('Alert Notifications', function() {
  describe('when there are children', function() {
    const props = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '0.5'
      }
    };
    beforeEach(function() {
      subject = shallow((
        <AlertNotifications {...props}>
          <NotificationItem href="my-fee-link">fee</NotificationItem>
          <NotificationItem href="my-fi-link">fi</NotificationItem>
          <NotificationItem href="my-fo-link">fo</NotificationItem>
          <NotificationItem href="my-fum-link">fum</NotificationItem>
        </AlertNotifications>));
    });

    it('renders a notification alert icon', function() {
      expect(subject.find('.dropdown-notifications-title .dropdown-notifications-alert svg').hasClass('icon-warning')).toBeTruthy();
    });

    it('renders the children in a dropdown menu on click', function() {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu a:eq(0)').toContainText('fee');
      expect(subject.find('.dropdown-menu a:eq(0)').prop('href')).toBe('my-fee-link');

      expect('.dropdown-menu').toContainText('fi');
      expect('.dropdown-menu').toContainText('fo');
      expect('.dropdown-menu').toContainText('fum');
    });

    it('passes through the className to the btn-group', function() {
      expect(subject.find('.dropdown').hasClass(props.className)).toBeTruthy();
    });

    it('passes through style to the button', function() {
      expect(subject.find('.dropdown').prop('style')).toEqual(props.style);
    });

    it('passes through id to the button', function() {
      expect(subject.find('.dropdown').prop('id')).toBe('test-id');
    });
  });

  describe('when there are no children', function() {
    beforeEach(function() {
      subject = shallow(<AlertNotifications/>);
    });

    it('does not render an alert icon', function() {
      expect(subject.find('.dropdown-notifications-title .dropdown-notifications-alert').exists()).toBeFalsy();
    });

    it('renders the no notification message on click', function() {
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-menu .dropdown-notifications-none').toContainText('no alerts');
    });
  });

  describe('when there are size modifiers', function() {
    beforeEach(function() {
      subject = shallow(<AlertNotifications size="h1"/>);
    });

    it('renders a h1 sized notification', function() {
      expect(subject.find('.dropdown-notifications-title').hasClass('h1')).toBeTruthy();
    });
  });
});
