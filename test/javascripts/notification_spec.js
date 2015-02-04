'use strict';

var $ = require('jquery');
var React = require('react/addons');

var Notifications = require('../../src/pivotal-ui/javascripts/notifications').Notifications;
var AlertNotifications = require('../../src/pivotal-ui/javascripts/notifications').AlertNotifications;
var NotificationItem = require('../../src/pivotal-ui/javascripts/notifications').NotificationItem;

describe('Notification', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe("when there are children", function() {
    beforeEach(function() {
      React.render(
         <Notifications>
            <NotificationItem href='my-fee-link'>fee</NotificationItem>
            <NotificationItem href='my-fi-link'>fi</NotificationItem>
            <NotificationItem href='my-fo-link'>fo</NotificationItem>
            <NotificationItem href='my-fum-link'>fum</NotificationItem>
         </Notifications>,
        this.node);
    });

    it("renders a notification count badge", function() {
      expect($('#container .dropdown-notifications-title .dropdown-notifications-badge')).toContainText('4');
    });

    it("renders the children in a dropdown menu", function() {
      expect($('#container .dropdown-menu a').first()).toContainText('fee');
      expect($('#container .dropdown-menu a').first().attr('href')).toEqual('my-fee-link');

      expect($('#container .dropdown-menu')).toContainText('fi');
      expect($('#container .dropdown-menu')).toContainText('fo');
      expect($('#container .dropdown-menu')).toContainText('fum');
    });
  });

  describe("when there are no children", function() {
    beforeEach(function() {
      React.render(
        <Notifications />,
        this.node);
    });

    it("does not render a badge", function () {
      expect($('#container .dropdown-notifications-title')).not.toContainElement('.dropdown-notifications-badge');
    });

    it("renders the no notification message", function() {
      expect($('#container .dropdown-menu .dropdown-notifications-none')).toContainText('no notifications');
    });
  });
});

describe('Alert Notifications', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe("when there are children", function() {
    beforeEach(function() {
      React.render(
         <AlertNotifications>
            <NotificationItem href='my-fee-link'>fee</NotificationItem>
            <NotificationItem href='my-fi-link'>fi</NotificationItem>
            <NotificationItem href='my-fo-link'>fo</NotificationItem>
            <NotificationItem href='my-fum-link'>fum</NotificationItem>
         </AlertNotifications>,
        this.node);
    });

    it("renders a notification alert icon", function() {
      expect($('#container .dropdown-notifications-title .dropdown-notifications-alert')).toHaveClass('fa-exclamation-triangle');
    });

    it("renders the children in a dropdown menu", function() {
      expect($('#container .dropdown-menu a').first()).toContainText('fee');
      expect($('#container .dropdown-menu a').first().attr('href')).toEqual('my-fee-link');

      expect($('#container .dropdown-menu')).toContainText('fi');
      expect($('#container .dropdown-menu')).toContainText('fo');
      expect($('#container .dropdown-menu')).toContainText('fum');
    });
  });

  describe("when there are no children", function() {
    beforeEach(function() {
      React.render(
        <AlertNotifications />,
        this.node);
    });

    it("does not render an alert icon", function () {
      expect($('#container .dropdown-notifications-title')).not.toContainElement('.dropdown-notifications-alert');
    });

    it("renders the no notification message", function() {
      expect($('#container .dropdown-menu .dropdown-notifications-none')).toContainText('no alerts');
    });
  });
});
