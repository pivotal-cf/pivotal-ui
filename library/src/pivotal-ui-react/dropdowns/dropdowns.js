import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {default as mixin} from 'pui-react-mixins';
import Scrim from 'pui-react-mixins/mixins/scrim_mixin';
import Transition from 'pui-react-mixins/mixins/transition_mixin';
import {Icon} from 'pui-react-iconography';
import 'pui-css-dropdowns';

const defaultToggleNode = (showIcon, icon) => {
  if (showIcon) return <Icon src={icon} className="icon-toggle"/>;
};

export class Dropdown extends mixin(React.Component).with(Scrim, Transition) {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
  }

  static propTypes = {
    border: PropTypes.bool,
    buttonAriaLabel: PropTypes.string,
    buttonClassName: PropTypes.string,
    closeOnMenuClick: PropTypes.bool,
    disableScrim: PropTypes.bool,
    flat: PropTypes.bool,
    floatMenu: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.bool,
    labelAriaLabel: PropTypes.string,
    menuAlign: PropTypes.oneOf(['none', 'left', 'right']),
    onClick: PropTypes.func,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    onSelect: PropTypes.func,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    toggle: PropTypes.node,
    scroll: PropTypes.bool,
    showIcon: PropTypes.bool,
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    split: PropTypes.bool
  };

  static defaultProps = {
    closeOnMenuClick: true,
    disableScrim: false,
    icon: 'chevron_down',
    menuAlign: 'none',
    scroll: false,
    showIcon: true,
    size: 'normal'
  };

  click = event => {
    this.setState({open: !this.state.open});
    this.props.onClick && this.props.onClick(event);
  };

  handleSplitClick = event => {
    const {href, disabled, onSelect} = this.props;
    if (disabled) return;

    if (!href) {
      event.preventDefault();
      this.click(event);
    }

    onSelect && onSelect(event);
  };

  scrimClick = () => this.setState({open: false})

  menuClick = () => {
    if (!this.props.closeOnMenuClick) return;
    this.setState({open: false});
  };

  render() {
    const {
      border, buttonAriaLabel, buttonClassName, children, className, closeOnMenuClick, disableScrim, showIcon,
      flat, link, labelAriaLabel, menuAlign, size, href, icon, onClick, onEntered, onExited, split, title, toggle,
      floatMenu, scroll, ...props
    } = this.props;
    const {open} = this.state;
    const buttonStyleClasses = classnames('dropdown-toggle', buttonClassName);
    const noTitle = typeof title === 'undefined' || title === null || title.length === 0;

    const forceIcon = noTitle || split;
    const iconVisible = forceIcon || showIcon;
    const toggleNode = toggle ? toggle : defaultToggleNode(iconVisible, icon);
    const menuVisibility = open ? 'dropdown-open' : 'dropdown-closed';

    const dropdownClasses = classnames('dropdown', {
      'dropdown-flat': flat,
      'dropdown-split': split,
      'dropdown-link': link,
      'dropdown-lg': size === 'large',
      'dropdown-sm': size === 'small',
      'dropdown-icon-only' : !split && noTitle
    }, menuVisibility, className);

    const dropdownMenuClasses = classnames('dropdown-menu',
      {
        'dropdown-border'     : border,
        'dropdown-menu-right' : menuAlign === 'right',
        'dropdown-menu-left'  : menuAlign === 'left',
        'dropdown-menu-float' : split || flat || link || floatMenu || noTitle || menuAlign !== 'none',
        'dropdown-menu-scroll': scroll
      }
    );
    const dropdownOptions = (<div className={dropdownMenuClasses}>
      <ul aria-label="submenu" onClick={this.menuClick}>{children}</ul>
    </div>);

    const splitProps = {href, 'aria-label': labelAriaLabel};

    return (<div className={dropdownClasses} {...props}>
      <button type="button" onClick={this.click} className={buttonStyleClasses} aria-haspopup="true" aria-label={buttonAriaLabel}>
        {!split && title}
      </button>
      {toggleNode}
      {split && <a className={classnames('dropdown-label', buttonClassName)} {...{...splitProps}} onClick={this.handleSplitClick}>{title}</a>}
      {dropdownOptions}
    </div>);
  }
}

export class DropdownItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    href: PropTypes.string,
    header: PropTypes.bool,
    divider: PropTypes.bool,
    disabled: PropTypes.bool,
    eventKey: PropTypes.string,
    onSelect: PropTypes.func
  };

  handleClick = event => {
    const {href, disabled, onSelect, eventKey} = this.props;
    if (disabled) return;

    if (!href) {
      event.preventDefault();
    }

    if (onSelect) {
      onSelect(event, eventKey);
    }
  };

  render() {
    const {children, className, eventKey, style, href, header, divider, disabled, ...anchorProps} = this.props;

    if (header) return (<li role="heading" className="dropdown-header">{children}</li>);
    if (divider) return (<li role="separator" className="divider"/>);

    const anchor = href ? <a {...{href, disabled, ...anchorProps}} onClick={this.handleClick}>{children}</a> : children;
    const disabledClass = disabled ? 'disabled' : '';
    const dropdownItemClass = classnames(className, disabledClass);
    
    return (<li {...{style}} className={dropdownItemClass} onClick={href ? '' : this.handleClick}>
      {anchor}
    </li>);
  }
}
