import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from '../iconography';
import {Dropdown, DropdownItem} from '../dropdowns';
import classnames from 'classnames';
import {mergeProps} from '../helpers';

const defaultChild = (icon, message) => <li role="presentation">
  <div className="dropdown-notifications-none">
    <Icon src={icon}/>
    <p className="type-neutral-4 em-alt mbn">{message}</p>
  </div>
</li>;

export class Notifications extends React.PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  };

  componentDidMount() {
    require('../../css/notifications');
  }

  render() {
    const {size, children, ...others} = this.props;
    const props = mergeProps(others, {className: 'dropdown-notifications dropdown-icon-only'});
    const numChildren = React.Children.count(children);
    const badge = numChildren > 0 ? <span className="dropdown-notifications-badge">{numChildren}</span> : null;
    const dropdownTitleClasses = classnames('dropdown-notifications-title', size, {'dropdown-notifications-has-notifications': numChildren > 0});
    const dropdownTitle = (
      <div className={dropdownTitleClasses}>
        <Icon src="notifications"/>
        {badge}
      </div>
    );

    return <Dropdown flat showIcon={false} title={dropdownTitle} {...props}>
      {children || defaultChild('add', 'no notifications')}
    </Dropdown>;
  }
}

export class AlertNotifications extends React.PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  };

  render() {
    const {size, children, ...others} = this.props;
    const numChildren = React.Children.count(children);
    const badge = numChildren > 0 && <Icon src="warning" className="dropdown-notifications-alert"/>;
    const dropdownTitleClasses = classnames('dropdown-notifications-title', size, {'dropdown-notifications-has-alerts': numChildren > 0});
    const dropdownTitle = (
      <div className={dropdownTitleClasses}>
        <Icon src="notifications"/>
        {badge}
      </div>
    );
    const props = mergeProps(others, {className: 'dropdown-notifications dropdown-icon-only'});

    return <Dropdown flat showIcon={false} title={dropdownTitle} {...props}>
      {children || defaultChild('notifications', 'no alerts')}
    </Dropdown>;
  }
}

export class NotificationItem extends React.PureComponent {
  static propTypes = {
    href: PropTypes.string
  };

  render() {
    const {href, children, ...props} = this.props;
    return <DropdownItem href={href} {...props}>{children}</DropdownItem>;
  }
}
