import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {default as mixin} from '../mixins';
import Scrim from '../mixins/mixins/scrim_mixin';
import Transition from '../mixins/mixins/transition_mixin';
import {Icon} from '../iconography';
import {Grid, FlexCol} from '../flex-grids';

const defaultToggleNode = (showIcon, icon, onClick, size, title, className, ariaLabel) => {
  return (
    <button {...{
      type: 'button',
      className,
      onClick,
      'aria-haspopup': true,
      'aria-label': ariaLabel
    }}>
      {title}
      {showIcon && <Icon src={icon} className="icon-toggle"/>}
    </button>
  );
};

export class Dropdown extends mixin(React.Component).with(Scrim, Transition) {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };

    this.click = this.click.bind(this);
  }

  static propTypes = {
    blockingScrim: PropTypes.bool,
    border: PropTypes.bool,
    buttonAriaLabel: PropTypes.string,
    buttonClassName: PropTypes.string,
    splitClassName: PropTypes.string,
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
    onSplitClick: PropTypes.func,
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
    super.componentDidMount();
    require('../../css/dropdowns');
  }

  click = event => {
    this.setState({open: !this.state.open});
    this.props.onClick && this.props.onClick(event);
  };

  handleSplitClick = event => {
    const {href, disabled, onSelect, onSplitClick} = this.props;
    if (disabled) return;

    if (!href) {
      event.preventDefault();
      onSplitClick && onSplitClick(event);
    }

    onSelect && onSelect(event);
  };

  scrimClick = () => this.setState({open: false});

  menuClick = () => {
    if (!this.props.closeOnMenuClick) return;
    this.setState({open: false});
  };

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      closeOnMenuClick, onClick, onSplitClick, onEntered, onExited,
      blockingScrim, border, buttonAriaLabel, buttonClassName, splitClassName, children, className, disableScrim, showIcon,
      flat, link, labelAriaLabel, menuAlign, size, href, icon, split, title, toggle, floatMenu, scroll, ...props
    } = this.props;

    const {open} = this.state;
    const buttonStyleClasses = classnames('dropdown-toggle', buttonClassName);
    const noTitle = typeof title === 'undefined' || title === null || title.length === 0;

    const forceIcon = noTitle || split;
    const iconVisible = forceIcon || showIcon;
    const toggleNode = toggle ? toggle : defaultToggleNode(iconVisible, icon, this.click, size, !split && title, buttonStyleClasses, buttonAriaLabel);
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
      }
    );
    const dropdownOptions = (<div className={dropdownMenuClasses}>
      <ul aria-label="submenu" onClick={this.menuClick}>{children}</ul>
    </div>);

    return (<div className={dropdownClasses} {...props}>
      {split ? <Grid gutter={false}>
          <FlexCol>
            <a {...{
              className: classnames('dropdown-label', splitClassName),
              href,
              'aria-label': labelAriaLabel,
              onClick: this.handleSplitClick.bind(this),
              role: onSplitClick && 'button'
            }}>{title}</a>
          </FlexCol>
          <FlexCol fixed className="dropdown-icon-col col-middle">
            {toggleNode}
          </FlexCol>
        </Grid>
        : toggleNode}
      {(blockingScrim && open && !disableScrim) && <div className="scrim" onClick={this.scrimClick}/>}
      {dropdownOptions}
    </div>);
  }
}
