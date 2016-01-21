var React = require('react');
import classnames from 'classnames';
import uniqueid from 'lodash.uniqueid';

var BsDropdown = require('react-bootstrap/lib/Dropdown');

function defDropdown(props) {
  return React.createClass({
    propTypes: {
      id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
      buttonClassName: React.PropTypes.string,
      style: React.PropTypes.any,
      title: React.PropTypes.any,
      border: React.PropTypes.bool
    },
    render: function render() {
      const {buttonClassName, style, title, children, border, ...others} = this.props;
      let {id} = others;
      const {buttonClassName: defaultBtnClassName, bsStyle} = props;

      const btnClass = classnames(buttonClassName, defaultBtnClassName);
      const borderClass = border ? 'dropdown-border' : null;
      if (!id) {
        id = uniqueid('dropdown');
      }
      return (
        <BsDropdown {...others} id={id}>
          <BsDropdown.Toggle className={btnClass} bsStyle={bsStyle} style={style}>
            {title}
          </BsDropdown.Toggle>
          <BsDropdown.Menu className={borderClass}>
            {children}
          </BsDropdown.Menu>
        </BsDropdown>
      );
    }
  });
}

module.exports = {
  Dropdown: defDropdown({}),

  DropdownItem: require('react-bootstrap/lib/MenuItem'),

  LinkDropdown: defDropdown({bsStyle: 'link'}),

  DefaultAltDropdown: defDropdown({buttonClassName: 'btn-default-alt', bsStyle: null}),

  LowlightDropdown: defDropdown({buttonClassName: 'btn-lowlight', bsStyle: null}),

  DangerDropdown: defDropdown({bsStyle: 'danger'}),

  HighlightDropdown: defDropdown({buttonClassName: 'btn-highlight', bsStyle: null}),

  HighlightAltDropdown: defDropdown({buttonClassName: 'btn-highlight-alt', bsStyle: null})
};
