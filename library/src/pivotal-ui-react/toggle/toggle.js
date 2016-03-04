const React = require('react');
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-forms';
const types = React.PropTypes;

const Toggle = React.createClass({
  propTypes: {
    onChange: types.func
  },

  render() {
    const {onChange, children, ...others} = this.props;
    const props = mergeProps(others,
      {
        className: 'toggle-switch',
        id: 'toggleSwitch',
        type: 'checkbox',
        onChange: onChange
      }
    );

    return (
      <div className='form-group'>
        <input {...props}/>
        <label htmlFor='toggleSwitch'>{children}</label>
      </div>
    )
  }
});

module.exports = {Toggle};
