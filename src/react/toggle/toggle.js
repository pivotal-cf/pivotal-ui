import React from 'react';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';
import {mergeProps} from '../helpers';

export class Toggle extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  };

  static defaultProps = {
    size: 'medium'
  };

  componentDidMount() {
    require('../../css/forms');
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

    return (<div className="form-group">
      <input {...inputProps}/>
      <label htmlFor={toggleId} className={size}>{children}</label>
    </div>);
  }
}
