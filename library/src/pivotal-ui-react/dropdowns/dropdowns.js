import React from 'react';
import classnames from 'classnames';

import mixin from 'pui-react-mixins';
import Scrim from 'pui-react-mixins/mixins/scrim_mixin';

require('pui-css-dropdowns');

const types = React.PropTypes;

const DEFAULT_KIND = 'btn-default';
const DEFAULT_TOGGLE = <span className="caret"/>;

class Dropdown extends mixin(React.Component).with(Scrim) {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false
    };
  }

  static propTypes = {
    border: types.bool,
    buttonClassName: types.string,
    closeOnMenuClick: types.bool,
    disableScrim: types.bool,
    pullRight: types.bool,
    split: types.bool,
    title: types.node,
    toggle: types.node,
    onClick: types.func
  };

  static defaultProps = {
    closeOnMenuClick: true,
    disableScrim: false
  };

  click = (event) => {
    this.setState({isOpen: !this.state.isOpen});
    this.props.onClick && this.props.onClick(event);
  };

  scrimClick = () => {
    this.setState({isOpen: false});
  };

  menuClick = () => {
    if (!this.props.closeOnMenuClick) return;
    this.setState({isOpen: false});
  };

  render() {
    const {border, buttonClassName, children, className, kind, pullRight, split, title, toggle, ...props} = this.props;
    const {isOpen} = this.state;

    let buttonKind, dropdownLabel, dropdownToggle, toggleNode;

    buttonKind = kind ? `btn-${kind}` : DEFAULT_KIND;
    toggleNode = toggle ? toggle : DEFAULT_TOGGLE;

    const buttonStyleClasses = classnames('btn', buttonKind, buttonClassName);
    dropdownLabel = split ? <div className={classnames('dropdown-label', buttonStyleClasses)}>{title}</div> : null;
    dropdownToggle = (
      <button type="button" {...props} onClick={this.click} className={classnames('dropdown-toggle', buttonStyleClasses)}>
        {!split ? title : null}
        {toggleNode}
      </button>
    );

    const dropdownClasses = classnames('dropdown', 'btn-group', {open: isOpen}, {split: split}, className);
    const dropdownMenuClasses = classnames('dropdown-menu', {'dropdown-border': border}, {'dropdown-menu-right': pullRight});
    return (
      <div className={dropdownClasses}>
        {dropdownLabel}
        {dropdownToggle}
        <ul className={dropdownMenuClasses} onClick={this.menuClick}>{children}</ul>
      </div>
    );
  };
}

class LinkDropdown extends Dropdown {
  static defaultProps = {
    ...Dropdown.defaultProps,
    kind: 'link'
  };
}

class DefaultAltDropdown extends Dropdown {
  static defaultProps = {
    ...Dropdown.defaultProps,
    kind: 'default-alt'
  };
}

class LowlightDropdown extends Dropdown {
  static defaultProps = {
    ...Dropdown.defaultProps,
    kind: 'lowlight'
  };
}

class DangerDropdown extends Dropdown {
  static defaultProps = {
    ...Dropdown.defaultProps,
    kind: 'danger'
  };
}

class HighlightDropdown extends Dropdown {
  static defaultProps = {
    ...Dropdown.defaultProps,
    kind: 'highlight'
  };
}

class HighlightAltDropdown extends Dropdown {
  static defaultProps = {
    ...Dropdown.defaultProps,
    kind: 'highlight-alt'
  };
}

class DropdownItem extends React.Component {
  static propTypes = {
    className: types.string,
    style: types.object,
    href: types.string,
    header: types.bool,
    divider: types.bool,
    disabled: types.bool,
    eventKey: types.string,
    onSelect: types.func
  };

  handleClick = (event) => {
    const {href, disabled, onSelect, eventKey} = this.props;

    if (!href || disabled) {
      event.preventDefault();
    }

    if (disabled) return;

    if (onSelect) {
      onSelect(event, eventKey);
    }
  };

  render() {
    const {children, className, style, href, header, divider, disabled, ...anchorProps} = this.props;

    if (header) return (<li role="heading" className="dropdown-header">{children}</li>);
    if (divider) return (<li role="separator" className="divider"/>);

    let anchor;
    if (href) {
      anchor = <a {...{href, disabled, ...anchorProps}} onClick={this.handleClick}>{children}</a>;
    } else {
      anchor = children;
    }

    const disabledClass = disabled ? 'disabled' : '';
    const dropdownItemClass = classnames(className, disabledClass);
    return (
      <li {...{style}} className={dropdownItemClass} onClick={href ? '' : this.handleClick}>
        {anchor}
      </li>
    );
  }
}

module.exports = {
  Dropdown,
  DropdownItem,
  LinkDropdown,
  DefaultAltDropdown,
  HighlightAltDropdown,
  HighlightDropdown,
  DangerDropdown,
  LowlightDropdown
};
