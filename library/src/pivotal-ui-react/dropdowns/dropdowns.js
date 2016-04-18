import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import uniqueid from 'lodash.uniqueid';

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
    buttonClassName: types.string,
    disableScrim: types.bool,
    id: types.oneOfType([types.string, types.number]),
    split: types.bool,
    style: types.any,
    title: types.node,
    toggle: types.node
  };

  static defaultProps = {
    disableScrim: false
  };

  click = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  scrimClick = () => {
    this.setState({isOpen: false});
  };

  render() {
    const {buttonClassName, children, className, id, kind, split, style, title, toggle} = this.props;
    const {isOpen} = this.state;

    let buttonKind, dropdownLabel, dropdownToggle, toggleNode;

    buttonKind = kind ? `btn-${kind}` : DEFAULT_KIND;
    toggleNode = toggle ? toggle : DEFAULT_TOGGLE;

    const buttonStyleClasses = classnames('btn', buttonKind, buttonClassName);
    dropdownLabel = split ? <div className={classnames('dropdown-label', buttonStyleClasses)}>{title}</div> : null;
    dropdownToggle = (
      <button id={id} style={style} onClick={this.click} className={classnames('dropdown-toggle', buttonStyleClasses)}>
        {!split ? title : null}
        {toggleNode}
      </button>
    );

    const dropdownClasses = classnames('dropdown', 'btn-group', {open: isOpen}, {split: split}, className);
    return (
      <div className={dropdownClasses}>
        {dropdownLabel}
        {dropdownToggle}
        <ul className="dropdown-menu">{children}</ul>
      </div>
    );
  };
}

class LinkDropdown extends Dropdown {
  static defaultProps = {
    kind: 'link'
  };
}

class DefaultAltDropdown extends Dropdown {
  static defaultProps = {
    kind: 'default-alt'
  };
}

class LowlightDropdown extends Dropdown {
  static defaultProps = {
    kind: 'lowlight'
  };
}

class DangerDropdown extends Dropdown {
  static defaultProps = {
    kind: 'danger'
  };
}

class HighlightDropdown extends Dropdown {
  static defaultProps = {
    kind: 'highlight'
  };
}

class HighlightAltDropdown extends Dropdown {
  static defaultProps = {
    kind: 'highlight-alt'
  };
}

class DropdownItem extends React.Component {
  static propTypes = {
    className: types.string,
    style: types.object,
    href: types.string,
    id: types.string,
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
    const {children, className, style, href, id, header, divider, disabled} = this.props;

    if (header) return (<li role="heading" className="dropdown-header">{children}</li>);
    if (divider) return (<li role="separator" className="divider"/>);

    let anchor;
    if (href) {
      anchor = <a {...{href, id}} disabled={disabled} onClick={this.handleClick}>{children}</a>;
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
