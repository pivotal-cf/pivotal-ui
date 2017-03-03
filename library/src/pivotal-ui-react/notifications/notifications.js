import React from 'react';
import {Icon} from 'pui-react-iconography';
import {Dropdown, DropdownItem} from 'pui-react-dropdowns';
import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';

const types = React.PropTypes;

export class Notifications extends React.Component {
  static propTypes = {
    size: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  }

  static defaultProps = {
    children: <li role="presentation">
      <div className="dropdown-notifications-none">
        <Icon src="add"/>
        <p className="type-neutral-4 em-alt mbn">no notifications</p>
      </div>
    </li>
  }

  render() {
    const {size, children, ...others} = this.props;
    const props = mergeProps(others, {className: 'dropdown-notifications'});
    const numChildren = React.Children.count(children);
    const badge = numChildren > 1 ? <span className="dropdown-notifications-badge">{numChildren}</span> : null;
    const dropdownTitleClasses = classnames('dropdown-notifications-title', size);
    const dropdownTitle = (
      <div className={dropdownTitleClasses}>
        <Icon src="notifications"/>
        {badge}
      </div>
    );
    
    return <Dropdown flat showIcon={false} title={dropdownTitle} {...props}>{children}</Dropdown>;
  }
}

export class AlertNotifications extends React.Component {
  static propTypes = {
    size: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  }
  
  static defaultProps = {
    children: <li role="presentation">
      <div className="dropdown-notifications-none">
        <Icon src="notifications"/>
        <p className="type-neutral-4 em-alt mbn">no alerts</p>
      </div>
    </li>
  }

  render() {
    const {size, children, ...others} = this.props;
    const numChildren = React.Children.count(children);
    const badge = numChildren > 1 && <Icon src="warning" className="dropdown-notifications-alert"/>;
    const dropdownTitleClasses = classnames('dropdown-notifications-title', size);
    const dropdownTitle = (
      <div className={dropdownTitleClasses}>
        <Icon src="notifications"/>
        {badge}
      </div>
    );
    const props = mergeProps(others, {className: 'dropdown-notifications'});
    
    return <Dropdown flat showIcon={false} title={dropdownTitle} {...props}>{children}</Dropdown>;
  }
}

export class NotificationItem extends React.Component {
  static propTypes = {
    href: types.string
  }

  render() {
    const {href, children, ...props} = this.props;
    return <DropdownItem href={href} {...props}>{children}</DropdownItem>;
  }
}
