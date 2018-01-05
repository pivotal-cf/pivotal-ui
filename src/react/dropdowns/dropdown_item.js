import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class DropdownItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    href: PropTypes.string,
    header: PropTypes.bool,
    divider: PropTypes.bool,
    disabled: PropTypes.bool,
    eventKey: PropTypes.string,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
  };

  componentDidMount() {
    require('../../css/dropdowns');
  }

  handleClick = event => {
    const {href, disabled, onClick, onSelect, eventKey} = this.props;
    if (disabled) return;


    if (!href) {
      event.preventDefault();
    }

    if (onSelect) {
      onSelect(event, eventKey);
    }

    if (onClick) {
      onClick(event);
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const {children, className, eventKey, style, href, header, divider, disabled, onClick, onSelect, ...anchorProps} = this.props;

    if (header) return (<li role="heading" className="dropdown-header">{children}</li>);
    if (divider) return (<li role="separator" className="divider"/>);

    const anchor = href ? <a {...{href, disabled, ...anchorProps}}>{children}</a> : children;
    const disabledClass = disabled ? 'disabled' : '';
    const dropdownItemClass = classnames(className, disabledClass);

    return (<li {...{style}} className={dropdownItemClass} onClick={this.handleClick}>
      {anchor}
    </li>);
  }
}
