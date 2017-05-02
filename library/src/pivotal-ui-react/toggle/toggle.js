import React from 'react';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-forms';

export class Toggle extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    size: 'medium'
  }

  render() {
    const {onChange, children, id, size, ...others} = this.props;
    const toggleId = id || uniqueid('toggle');

    const inputProps = mergeProps(others,
      {
        className: 'toggle-switch',
        id: toggleId,
        type: 'checkbox',
        onChange: onChange
      }
    );

    return (<div className='form-group'>
      <input {...inputProps}/>
      <label htmlFor={toggleId} className={size}>{children}</label>
    </div>);
  }
}
