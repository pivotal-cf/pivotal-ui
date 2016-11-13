const React = require('react');
import uniqueid from 'lodash.uniqueid';
import {mergeProps} from 'pui-react-helpers';
require('pui-css-forms');
const types = React.PropTypes;

class Toggle extends React.Component {
  static propTypes = {
    id: types.string,
    onChange: types.func,
    size: types.string
  };

  render() {
    const {onChange, children, id, size, ...others} = this.props;
    const toggleId = id || uniqueid('toggle');
    const toggleSize = size && this.validSize(size) ? size : 'medium';

    const inputProps = mergeProps(others,
      {
        className: 'toggle-switch',
        id: toggleId,
        type: 'checkbox',
        onChange: onChange
      }
    );

    return (
      <div className='form-group'>
        <input {...inputProps}/>
        <label htmlFor={toggleId} className={toggleSize}>{children}</label>
      </div>
    )
  }

  validSize(size) {
    return ['small', 'medium', 'large'].includes(size)
  }
}

module.exports = {Toggle};
