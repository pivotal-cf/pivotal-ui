var React = require('react');
import {mergeProps} from 'pui-react-helpers';

var Radio = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool
  },

  render: function() {
    const {className, style, children, disabled, ...others} = this.props;
    const props = mergeProps({className: className, style: style}, {className: 'radio'});

    return (
      <div {...props}>
        <label className={disabled ? 'disabled' : ''}>
          <input type="radio" disabled={disabled} aria-disabled={disabled} {...others} />
          {children}
        </label>
      </div>
    );
  }
});

module.exports = {Radio};
