import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {default as mixin} from '../mixins';
import Transition from '../mixins/mixins/transition_mixin';
import {Icon} from '../iconography';
import {Grid, FlexCol} from '../flex-grids';
import {Scrim} from './scrim';

const defaultToggleNode = ({showIcon, icon, title, ...props}) => (
  <button {...{
    type: 'button',
    'aria-haspopup': 'true',
    ...props
  }}>
    {title}
    {showIcon && <Icon src={icon} className="icon-toggle"/>}
  </button>
);

export class Dropdown extends mixin(React.Component).with(Transition) {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      buttonId: props.buttonId || `dropdown-button-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`
    };

    this.click = this.click.bind(this);
    this.containerRef = React.createRef();
  }

  static propTypes = {
    blockingScrim: PropTypes.bool,
    border: PropTypes.bool,
    buttonAriaLabel: PropTypes.string,
    buttonClassName: PropTypes.string,
    buttonId: PropTypes.string,
    closeOnMenuClick: PropTypes.bool,
    disableScrim: PropTypes.bool,
    disabled: PropTypes.bool,
    dropdownMenuClassName: PropTypes.string,
    flat: PropTypes.bool,
    floatMenu: PropTypes.bool,
    icon: PropTypes.string,
    itemClassName: PropTypes.string,
    link: PropTypes.bool,
    menuAlign: PropTypes.oneOf(['none', 'left', 'right']),
    onClick: PropTypes.func,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    scroll: PropTypes.bool,
    showIcon: PropTypes.bool,
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    split: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    toggle: PropTypes.node
  };

  static defaultProps = {
    blockingScrim: false,
    closeOnMenuClick: true,
    disableScrim: false,
    icon: 'chevron_down',
    menuAlign: 'none',
    scroll: false,
    showIcon: true,
    size: 'normal'
  };

  componentDidMount() {
    require('../../css/dropdowns');
  }

  click = event => {
    this.setState({open: !this.state.open});
    this.props.onClick && this.props.onClick(event);
  };

  scrimClick = () => this.setState({open: false});

  menuClick = () => {
    if (!this.props.closeOnMenuClick) return;
    this.setState({open: false});
  };

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      closeOnMenuClick, onClick, onEntered, onExited, buttonId = this.state.buttonId,
      blockingScrim, border, buttonAriaLabel, buttonClassName, children, className, disableScrim, disabled, showIcon,
      flat, link, menuAlign, size, icon, split, title, toggle, floatMenu, scroll, itemClassName, dropdownMenuClassName, ...props
    } = this.props;

    const open = this.props.hasOwnProperty('open') ? this.props.open : this.state.open;
    const buttonStyleClasses = classnames('dropdown-toggle', buttonClassName);
    const noTitle = typeof title === 'undefined' || title === null || title.length === 0;
    const menuId = `${buttonId}-menu`;

    const toggleProps = {
      showIcon: noTitle || split || showIcon,
      icon,
      onClick: this.click,
      disabled: disabled,
      title: !split && title,
      className: buttonStyleClasses,
      'aria-label': buttonAriaLabel,
      'aria-expanded': open,
      'aria-controls': menuId,
      id: buttonId
    };

    const toggleNode = toggle ? React.cloneElement(toggle, toggleProps) : defaultToggleNode(toggleProps);
    const menuVisibility = open ? 'dropdown-open' : 'dropdown-closed';

    const dropdownClasses = classnames('dropdown', {
      'dropdown-flat': flat,
      'dropdown-split': split,
      'dropdown-link': link,
      'dropdown-lg': size === 'large',
      'dropdown-sm': size === 'small',
      'dropdown-icon-only': !split && noTitle
    }, menuVisibility, className);

    const dropdownMenuClasses = classnames('dropdown-menu',
      {
        'dropdown-border': border,
        'dropdown-menu-right': menuAlign === 'right',
        'dropdown-menu-left': menuAlign === 'left',
        'dropdown-menu-float': split || flat || link || floatMenu || noTitle || menuAlign !== 'none',
        'dropdown-menu-scroll': scroll
      },
      dropdownMenuClassName
    );
    const dropdownOptions = (
      <div className={dropdownMenuClasses}>
        <ul aria-labelledby={buttonId} role="menu" onClick={this.menuClick} id={menuId}>
          {React.Children.map(children, child => child ? (
            <li className={itemClassName} role="none">
              {React.cloneElement(child, {role: 'menuitem', ...child.props})}
            </li>
          ) : null)}
        </ul>
      </div>
    );

    return (
      <Scrim containerRef={this.containerRef} onScrimClick={this.scrimClick}>
        <div className={dropdownClasses} {...props} ref={this.containerRef}>
          {split ? <Grid gutter={false}>
              <FlexCol className="dropdown-label">{title}</FlexCol>
              <FlexCol fixed className="dropdown-icon-col col-middle">
                {toggleNode}
              </FlexCol>
            </Grid>
            : toggleNode}
          {(blockingScrim && open && !disableScrim) && <div className="scrim" onClick={this.scrimClick}/>}
          {dropdownOptions}
        </div>
      </Scrim>
    );
  }
}
