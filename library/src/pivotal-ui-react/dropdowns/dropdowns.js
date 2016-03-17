var React = require('react');
import classnames from 'classnames';
import uniqueid from 'lodash.uniqueid';
import 'pui-css-dropdowns';
import 'pui-css-iconography';
import 'pui-css-button-group';

const types = React.PropTypes;

var BsDropdown = require('react-bootstrap/lib/Dropdown');

function defDropdown(props) {
  return class extends React.Component {
    static propTypes = {
      border: types.bool,
      bsStyle: types.any,
      buttonClassName: types.string,
      id: types.oneOfType([types.string, types.number]),
      split: types.bool,
      style: types.any,
      title: types.node,
      toggle: types.node
    };

    render = function render() {
      const {border, buttonClassName, children, style, title, split, toggle, ...others} = this.props;
      let {id} = others;
      const {buttonClassName: defaultBtnClassName, bsStyle} = props;

      const bsClass = bsStyle ? `btn-${bsStyle}` : null;
      const btnClass = classnames(buttonClassName, defaultBtnClassName, 'btn', bsClass);
      const borderClass = border ? 'dropdown-border' : null;
      if (!id) {
        id = uniqueid('dropdown');
      }

      let dropdownLabel, dropdownToggleContent;

      if (split || toggle) {
        dropdownLabel = (
          <div className={classnames('dropdown-label', btnClass)}>{title}</div>
        );
        dropdownToggleContent = toggle;
      } else {
        dropdownToggleContent = title;
      }

      return (
        <BsDropdown {...others} id={id}>
          {dropdownLabel}
          <BsDropdown.Toggle className={btnClass} noCaret={!!toggle} bsStyle={bsStyle} style={style}>
            {dropdownToggleContent}
          </BsDropdown.Toggle>
          <BsDropdown.Menu className={borderClass}>
            {children}
          </BsDropdown.Menu>
        </BsDropdown>
      );
    };
  }
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
  Dropdown: defDropdown({buttonClassName: 'btn-default'}),

  DropdownItem: DropdownItem,

  LinkDropdown: defDropdown({bsStyle: 'link'}),

  DefaultAltDropdown: defDropdown({buttonClassName: 'btn-default-alt', bsStyle: null}),

  LowlightDropdown: defDropdown({buttonClassName: 'btn-lowlight', bsStyle: null}),

  DangerDropdown: defDropdown({bsStyle: 'danger'}),

  HighlightDropdown: defDropdown({buttonClassName: 'btn-highlight', bsStyle: null}),

  HighlightAltDropdown: defDropdown({buttonClassName: 'btn-highlight-alt', bsStyle: null})
};
