var React = require('react');
var types = React.PropTypes;
var {Icon} = require('pui-react-iconography');
var {LinkDropdown, DropdownItem} = require('pui-react-dropdowns');
var classnames = require('classnames');
var {mergeProps} = require('pui-react-helpers');


class Notifications extends React.Component {
  static propTypes = {
    size: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  };

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
}

class AlertNotifications extends React.Component {
  static propTypes = {
    size: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  };

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
}

class NotificationItem extends React.Component {
  static propTypes = {
    href: types.string
  };

  render() {
    var {href, children, ...props} = this.props;
    return <DropdownItem href={href} {...props}>{children}</DropdownItem>;
  }
}

module.exports = {Notifications, AlertNotifications, NotificationItem};
