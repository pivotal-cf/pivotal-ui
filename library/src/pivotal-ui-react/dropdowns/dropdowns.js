import React from 'react'
import classnames from 'classnames'
import {default as mixin} from 'pui-react-mixins'
import Scrim from 'pui-react-mixins/mixins/scrim_mixin'
import Transition from 'pui-react-mixins/mixins/transition_mixin'
import {Icon} from 'pui-react-iconography'
import 'pui-css-dropdowns'

const types = React.PropTypes

const defaultToggleNode = (showIcon, icon) => {
  if (showIcon) return <Icon src={icon}/>
}

export class Dropdown extends mixin(React.Component).with(Scrim, Transition) {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }

  static propTypes = {
    border: types.bool,
    buttonClassName: types.string,
    closeOnMenuClick: types.bool,
    disableScrim: types.bool,
    flat: types.bool,
    floatMenu: types.bool,
    icon: types.string,
    link: types.bool,
    menuAlign: types.oneOf(['none', 'left', 'right']),
    onClick: types.func,
    onEntered: types.func,
    onExited: types.func,
    title: types.node,
    toggle: types.node,
    scroll: types.bool,
    showIcon: types.bool,
    size: types.oneOf(['normal', 'large', 'small']),
    split: types.bool
  }

  static defaultProps = {
    closeOnMenuClick: true,
    disableScrim: false,
    icon: 'chevron_down',
    menuAlign: 'none',
    scroll: false,
    showIcon: true,
    size: 'normal'
  }

  click = event => {
    this.setState({open: !this.state.open})
    this.props.onClick && this.props.onClick(event)
  }

  scrimClick = () => this.setState({open: false})

  menuClick = () => {
    if (!this.props.closeOnMenuClick) return
    this.setState({open: false})
  }

  render() {
    const {
      border, buttonClassName, children, className, closeOnMenuClick, disableScrim, showIcon,
      flat, link, menuAlign, size, icon, onClick, onEntered, onExited, split, title, toggle, floatMenu, scroll, ...props
    } = this.props
    const {open} = this.state
    const buttonStyleClasses = classnames(buttonClassName)
    const noTitle = typeof title === 'undefined' || title === null || title.length === 0

    const forceIcon = noTitle || split
    const iconVisible = forceIcon || showIcon
    const toggleNode = toggle ? toggle : defaultToggleNode(iconVisible, icon)
    const menuVisibility = open ? 'dropdown-open' : 'dropdown-closed'

    const dropdownClasses = classnames('dropdown', {
      'dropdown-flat': flat,
      'dropdown-split': split,
      'dropdown-link': link,
      'dropdown-lg': size === 'large',
      'dropdown-sm': size === 'small',
      'dropdown-icon-only' : !split && noTitle
    }, menuVisibility, className)

    const dropdownMenuClasses = classnames('dropdown-menu',
      {
        'dropdown-border'     : border,
        'dropdown-menu-right' : menuAlign === 'right',
        'dropdown-menu-left'  : menuAlign === 'left',
        'dropdown-menu-float' : split || flat || link || floatMenu || noTitle || menuAlign !== 'none',
        'dropdown-menu-scroll': scroll
      }
    )
    const dropdownOptions = <div className={dropdownMenuClasses}>
      <ul onClick={this.menuClick}>{children}</ul>
    </div>

    return (<div className={dropdownClasses} {...props}>
      <button type="button" onClick={this.click} className={classnames('dropdown-toggle', buttonStyleClasses)}>
        {!split && title}
      </button>
      {toggleNode}
      {split && <div className={classnames('dropdown-label', buttonStyleClasses)}>{title}</div>}
      {dropdownOptions}
    </div>)
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
    const {href, disabled, onSelect, eventKey} = this.props
    if (disabled) return

    if (!href) {
      event.preventDefault()
    }

    if (onSelect) {
      onSelect(event, eventKey)
    }
  }

  render() {
    const {children, className, eventKey, style, href, header, divider, disabled, ...anchorProps} = this.props

    if (header) return (<li role="heading" className="dropdown-header">{children}</li>)
    if (divider) return (<li role="separator" className="divider"/>)

    const anchor = href ? <a {...{href, disabled, ...anchorProps}} onClick={this.handleClick}>{children}</a> : children
    const disabledClass = disabled ? 'disabled' : ''
    const dropdownItemClass = classnames(className, disabledClass)
    
    return (<li {...{style}} className={dropdownItemClass} onClick={href ? '' : this.handleClick}>
      {anchor}
    </li>)
  }
}
