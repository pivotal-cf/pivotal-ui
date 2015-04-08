'use strict';

var React = require('react/addons');
var Icon = require('pui-react-iconography').Icon;
var LinkDropdown = require('./dropdowns.jsx').LinkDropdown;
var DropdownItem = require('./dropdowns.jsx').DropdownItem;

var Notifications = React.createClass({
  render: function () {
    var children = this.props.children;

    if(!this.props.children){
      children = (
        <li role="presentation">
          <div className="dropdown-notifications-none">
            <Icon name='bell' className='type-neutral-6' />
            <p className="type-neutral-4 em-alt mbn">no notifications</p>
          </div>
        </li>
      );
    }
    var childrenCount = React.Children.count(this.props.children);
    var badge = this.props.children ? (<span className="dropdown-notifications-badge">{childrenCount}</span>) : null;

    var dropdownTitle = (
      <div className='dropdown-notifications-title'>
        <i className="fa fa-bell type-neutral-6 h2 mvn"></i>
        {badge}
      </div>
    );

    return (
      <LinkDropdown title={dropdownTitle} className="dropdown-notifications">
        {children}
      </LinkDropdown>
    );
  }
});

var AlertNotifications = React.createClass({
  render: function () {
    var children = this.props.children;

    if(!this.props.children){
      children = (
        <li role="presentation">
          <div className="dropdown-notifications-none">
            <Icon name='bell' className='type-neutral-6' />
            <p className="type-neutral-4 em-alt mbn">no alerts</p>
          </div>
        </li>
      );
    }
    var badge = this.props.children ? (<Icon name="exclamation-triangle" className="dropdown-notifications-alert h4 type-warn-2"></Icon>) : null;

    var dropdownTitle = (
      <div className='dropdown-notifications-title'>
        <i className="fa fa-bell type-neutral-6 h2 mvn"></i>
        {badge}
      </div>
    );

    return (
      <LinkDropdown title={dropdownTitle} className="dropdown-notifications">
        {children}
      </LinkDropdown>
    );
  }
});

var NotificationItem = React.createClass({
  render: function () {
    return (
      <DropdownItem href={this.props.href}>
          {this.props.children}
      </DropdownItem>
    );
  }
});

module.exports = {
  Notifications,
  AlertNotifications,
  NotificationItem
};
