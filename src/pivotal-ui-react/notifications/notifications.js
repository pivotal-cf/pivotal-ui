var React = require('react');
var types = React.PropTypes;
var {Icon} = require('pui-react-iconography');
var {LinkDropdown, DropdownItem} = require('pui-react-dropdowns');
var classnames = require('classnames');
var {mergeProps} = require('pui-react-helpers');


/**
 * @component Notifications
 * @description A dropdown for showing a count (in the trigger) and list (in the menu) of notifications
 *
 * @example ```js
 * var Notifications = require('pui-react-notifications').Notifications;
 * var Flag = require('pui-react-media').Flag;
 * var DefaultH3 = require('pui-react-typography').DefaultH3;
 * var DefaultH5 = require('pui-react-typography').DefaultH5;
 * var Label = require('pui-react-labels').Label;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <Notifications>
 *         <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
 *           <Flag leftImage={<DefaultH3><Label>New</Label></DefaultH3>}>
 *             <DefaultH5 className="media-heading mbn type-dark-1">Notification</DefaultH5>
 *             <p className="type-sm type-neutral-5 mvn">Click for Cute Gif</p>
 *           </Flag>
 *         </NotificationItem>
 *       </Notifications>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#notifications_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown_notification)
 */
var Notifications = React.createClass({
  propTypes: {
    size: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  },
  render() {
    var {size, children, ...others} = this.props;
    var props = mergeProps(others, {className: 'dropdown-notifications'});
    var numChildren = React.Children.count(children);
    var badge = children ? <span className="dropdown-notifications-badge">{numChildren}</span> : null;
    var dropdownTitleClasses = classnames('dropdown-notifications-title', size);
    var dropdownTitle = (
      <div className={dropdownTitleClasses}>
        <i className="fa fa-bell"></i>
        {badge}
      </div>
    );
    children = children || (
      <li role="presentation">
        <div className="dropdown-notifications-none">
          <Icon name="bell"/>
          <p className="type-neutral-4 em-alt mbn">no notifications</p>
        </div>
      </li>
    );
    return <LinkDropdown title={dropdownTitle} {...props}>{children}</LinkDropdown>;
  }
});

/**
 * @component AlertNotifications
 * @description A dropdown for showing a list of notifications with an alert icon in the trigger if there are notifications
 *
 * @example ```js
 * var AlertNotifications = require('pui-react-notifications').AlertNotifications;
 * var Flag = require('pui-react-media').Flag;
 * var Icon = require('pui-react-iconography').Icon;
 * var DefaultH5 = require('pui-react-typography').DefaultH5;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <AlertNotifications>
 *         <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
 *           <Flag leftImage={<Icon name="exclamation-triangle" className="h4 type-warn-2 mrm"/>}>
 *             <DefaultH5 className="media-heading mbn type-dark-1">Warning</DefaultH5>
 *             <p className="type-sm type-neutral-5 mvn">Click for Cute Gif</p>
 *           </Flag>
 *         </NotificationItem>
 *       </AlertNotifications>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#notifications_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown_notification)
 */
var AlertNotifications = React.createClass({
  propTypes: {
    size: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  },
  render() {
    var {size, children, ...others} = this.props;
    var badge = children ? <Icon name="exclamation-triangle" className="dropdown-notifications-alert"></Icon> : null;
    var dropdownTitleClasses = classnames('dropdown-notifications-title', size);
    var dropdownTitle = (
      <div className={dropdownTitleClasses}>
        <i className="fa fa-bell"></i>
        {badge}
      </div>
    );
    children = children || (
      <li role="presentation">
        <div className="dropdown-notifications-none">
          <Icon name="bell"/>
          <p className="type-neutral-4 em-alt mbn">no alerts</p>
        </div>
      </li>
    );
    var props = mergeProps(others, {className: 'dropdown-notifications'});
    return <LinkDropdown title={dropdownTitle} {...props}>{children}</LinkDropdown>;
  }
});

/**
 * @component NotificationItem
 * @description A notification in notifications component
 *
 * @property href {String} A URL to link to when the notification is clicked
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#notifications_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown_notification)
 */
var NotificationItem = React.createClass({
  propTypes: {
    href: types.string
  },

  render() {
    var {href, children, ...props} = this.props;
    return <DropdownItem href={href} {...props}>{children}</DropdownItem>;
  }
});

module.exports = {Notifications, AlertNotifications, NotificationItem};
