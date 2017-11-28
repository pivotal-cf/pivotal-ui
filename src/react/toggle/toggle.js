import React from 'react';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';
import {mergeProps} from '../helpers';

export class Toggle extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['checkbox'])
  };

  static defaultProps = {
    size: 'medium',
    type: 'checkbox'
  };

  render() {
    const {children, id, size, ...others} = this.props;
    const toggleId = id || uniqueid('toggle');

    const inputProps = mergeProps(others, {
      className: 'toggle-switch',
      id: toggleId,
      type: 'checkbox'
    });

    return (<div>
      <input {...inputProps}/>
      <label {...{htmlFor: toggleId, className: size}}>{children}</label>
    </div>);
  }
}
