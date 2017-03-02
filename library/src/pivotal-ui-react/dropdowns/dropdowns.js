import React from 'react';
import classnames from 'classnames';
import mixin from 'pui-react-mixins';
import Scrim from 'pui-react-mixins/mixins/scrim_mixin';
import Transition from 'pui-react-mixins/mixins/transition_mixin';
import {Icon} from 'pui-react-iconography';
import 'pui-css-dropdowns';

const types = React.PropTypes;

const defaultToggleNode = dropCaret => {
  if (dropCaret) return <Icon src="chevron_down"/>;
};

export class Dropdown extends mixin(React.Component).with(Scrim, Transition) {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
  }

  static propTypes = {
    border: types.bool,
    buttonClassName: types.string,
    closeOnMenuClick: types.bool,
    disableScrim: types.bool,
    dropCaret: types.bool,
    flat: types.bool,
    link: types.bool,
    split: types.bool,
    menuCaret: types.bool,
    title: types.node,
    toggle: types.node,
    onClick: types.func,
    onEntered: types.func,
    onExited: types.func,
    menuAlign: types.oneOf(['none', 'left', 'right']),
    scroll: types.bool,
  }

  static defaultProps = {
    closeOnMenuClick: true,
    disableScrim: false,
    dropCaret: true,
    menuAlign: 'none',
    scroll: false
  }

  click = event => {
    this.setState({open: !this.state.open});
    this.props.onClick && this.props.onClick(event);
  }

  scrimClick = () => this.setState({open: false})

  menuClick = () => {
    if (!this.props.closeOnMenuClick) return;
    this.setState({open: false});
  }

  render() {
    const {
      border, buttonClassName, children, className, closeOnMenuClick, disableScrim, dropCaret,
      flat, link, menuAlign, onClick, onEntered, onExited, split, title, toggle, menuCaret, scroll, ...props
    } = this.props;
    const {open} = this.state;
    const toggleNode = toggle ? toggle : defaultToggleNode(dropCaret);
    const buttonStyleClasses = classnames(buttonClassName);

    const dropdownClasses = classnames('dropdown', {
      'dropdown-flat': flat,
      'dropdown-split': split,
      'dropdown-icon': split,
      'dropdown-link': link
    }, className);

    const menuVisibility = open ? 'dropdown-menu-open' : 'dropdown-menu-closed'
    const dropdownMenuClasses = classnames('dropdown-menu', menuVisibility,
      {
        'dropdown-border'     : border,
        'dropdown-menu-right' : (menuAlign === 'right'),
        'dropdown-menu-left'  : (menuAlign === 'left'),
        'dropdown-menu-float' : split || flat || link || menuCaret,
        'dropdown-menu-caret' : menuCaret,
        'dropdown-menu-scroll': scroll
      }
    )
    const dropdownOptions = <div className={dropdownMenuClasses}>
      <ul onClick={this.menuClick}>{children}</ul>
    </div>

    if (split) {
      return (<div className={dropdownClasses} {...props}>
        <div className={classnames('dropdown-label', buttonStyleClasses)}>{title}</div>
        <button type="button" onClick={this.click} className={classnames('dropdown-toggle', buttonStyleClasses)}></button>
        {toggleNode}
        {dropdownOptions}
      </div>)
    }

    return (<div className={dropdownClasses} {...props}>
      <button type="button" onClick={this.click} className={classnames('dropdown-toggle', buttonStyleClasses)}>
        {title}
        {toggleNode}
      </button>
      {dropdownOptions}
    </div>);
  }
}

export class DropdownItem extends React.Component {
  static propTypes = {
    className: types.string,
    style: types.object,
    href: types.string,
    header: types.bool,
    divider: types.bool,
    disabled: types.bool,
    eventKey: types.string,
    onSelect: types.func
  }

  handleClick = event => {
    const {href, disabled, onSelect, eventKey} = this.props;
    if (disabled) return;

    if (!href) {
      event.preventDefault();
    }

    if (onSelect) {
      onSelect(event, eventKey);
    }
  }

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
