import '../spec_helper';
import {Notifications, NotificationItem, AlertNotifications} from '../../../src/react/notifications';

describe('Notifications', () => {
  let subject;
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
      subject = shallow(<Notifications {...props}>
        <NotificationItem {...itemProps} href="my-fee-link">fee</NotificationItem>
        <NotificationItem href="my-fi-link">fi</NotificationItem>
        <NotificationItem href="my-fo-link">fo</NotificationItem>
        <NotificationItem href="my-fum-link">fum</NotificationItem>
      </Notifications>);

      subject.find('.dropdown-toggle').simulate('click');
    });

    it('renders the bell', () => {
      expect(subject.find('.dropdown-notifications-title svg.icon-notifications').exists()).toBeTruthy();
    });

    it('passes through the className to the btn-group', () => {
      expect(subject.find('.dropdown').hasClass(props.className)).toBeTruthy();
    });

    it('passes through style to the button', () => {
      expect(subject.find('.dropdown').prop('style')).toEqual(props.style);
    });

    it('passes through id to the button', () => {
      expect(subject.find('.dropdown').prop('id')).toBe('test-id');
    });

    it('renders a notification count badge', () => {
      expect(subject.find('.dropdown-notifications-title .dropdown-notifications-badge').text()).toContain('4');
    });

    describe('NotificationItem', () => {
      it('passes through className to the li ', () => {
        expect(subject.find('#root li').at(0).find('a').hasClass(itemProps.className)).toBeTruthy();
      });

      it('passes through style to the li', () => {
        expect(subject.find('#root li').at(0).find('a').prop('style')).toEqual(itemProps.style);
      });

      it('passes through id to the anchor', () => {
        expect(subject.find('#root li').at(0).find('a#test-item-id').exists()).toBeTruthy();
      });
    });

    it('renders the children in a dropdown menu', () => {
      expect(subject.find('.dropdown-menu a').at(0).text()).toContain('fee');
      expect(subject.find('.dropdown-menu a').at(0).prop('href')).toBe('my-fee-link');

      expect(subject.find('.dropdown-menu').text()).toContain('fi');
      expect(subject.find('.dropdown-menu').text()).toContain('fo');
      expect(subject.find('.dropdown-menu').text()).toContain('fum');
    });
  });

  describe('when there are no children', () => {
    beforeEach(() => {
      subject = shallow(<Notifications/>);
    });

    it('does not render a badge', () => {
      expect(subject.find('.dropdown-notifications-title .dropdown-notifications-badge').exists()).toBeFalsy();
    });

    it('renders the no notification message on click', () => {
      subject.find('.dropdown-toggle').simulate('click');

      expect(subject.find('.dropdown-menu .dropdown-notifications-none').text()).toContain('no notifications');
    });
  });

  describe('when there are size modifiers', () => {
    beforeEach(() => {
      subject = shallow(<Notifications size="h1"/>);
    });

    it('renders a h1 sized notification', () => {
      expect(subject.find('.dropdown-notifications-title').hasClass('h1')).toBeTruthy();
    });
  });
});

describe('Alert Notifications', () => {
  let subject;
  describe('when there are children', () => {
    const props = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '0.5'
      }
    };
    beforeEach(() => {
      subject = shallow(<AlertNotifications {...props}>
        <NotificationItem href="my-fee-link">fee</NotificationItem>
        <NotificationItem href="my-fi-link">fi</NotificationItem>
        <NotificationItem href="my-fo-link">fo</NotificationItem>
        <NotificationItem href="my-fum-link">fum</NotificationItem>
      </AlertNotifications>);
    });

    it('renders a notification alert icon', () => {
      expect(
        subject.find('.dropdown-notifications-title .dropdown-notifications-alert svg').hasClass('icon-warning')
      ).toBeTruthy();
    });

    it('renders the children in a dropdown menu on click', () => {
      subject.find('.dropdown-toggle').simulate('click');

      expect(subject.find('.dropdown-menu a').at(0).text()).toContain('fee');
      expect(subject.find('.dropdown-menu a').at(0).prop('href')).toBe('my-fee-link');

      expect(subject.find('.dropdown-menu').text()).toContain('fi');
      expect(subject.find('.dropdown-menu').text()).toContain('fo');
      expect(subject.find('.dropdown-menu').text()).toContain('fum');
    });

    it('passes through the className to the btn-group', () => {
      expect(subject.find('.dropdown').hasClass(props.className)).toBeTruthy();
    });

    it('passes through style to the button', () => {
      expect(subject.find('.dropdown').prop('style')).toEqual(props.style);
    });

    it('passes through id to the button', () => {
      expect(subject.find('.dropdown').prop('id')).toBe('test-id');
    });
  });

  describe('when there are no children', () => {
    beforeEach(() => {
      subject = shallow(<AlertNotifications/>);
    });

    it('does not render an alert icon', () => {
      expect(subject.find('.dropdown-notifications-title .dropdown-notifications-alert').exists()).toBeFalsy();
    });

    it('renders the no notification message on click', () => {
      subject.find('.dropdown-toggle').simulate('click');

      expect(subject.find('.dropdown-menu .dropdown-notifications-none').text()).toContain('no alerts');
    });
  });

  describe('when there are size modifiers', () => {
    beforeEach(() => {
      subject = shallow(<AlertNotifications size="h1"/>);
    });

    it('renders a h1 sized notification', () => {
      expect(subject.find('.dropdown-notifications-title').hasClass('h1')).toBeTruthy();
    });
  });
});
