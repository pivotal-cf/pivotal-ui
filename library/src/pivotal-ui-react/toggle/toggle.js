const React = require('react');
import uniqueid from 'lodash.uniqueid';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-forms';
const types = React.PropTypes;

class Toggle extends React.Component {
  static propTypes = {
    id: types.string,
    onChange: types.func
  };

  render() {
    const {onChange, children, id, ...others} = this.props;
    const toggleId = id || uniqueid('toggle');

    const props = mergeProps(others,
      {
        className: 'toggle-switch',
        id: toggleId,
        type: 'checkbox',
        onChange: onChange
      }
    );

    return (
      <div className='form-group'>
        <input {...props}/>
        <label htmlFor={toggleId}>{children}</label>
      </div>
    )
  }
}

module.exports = {Toggle};
