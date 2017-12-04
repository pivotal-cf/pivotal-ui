import React from 'react';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';
import classnames from 'classnames';
import {mergeProps} from '../helpers';

export class Toggle extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    labelClassName: PropTypes.string
  };

  static defaultProps = {
    size: 'medium'
  };

  render() {
    const {children, id, size, labelClassName, ...others} = this.props;
    const toggleId = id || uniqueid('toggle');

    const inputProps = mergeProps(others, {
      className: 'toggle-switch',
      id: toggleId,
      type: 'checkbox'
    });

    return (<div>
      <input {...inputProps}/>
      <label {...{htmlFor: toggleId, className: classnames(size, labelClassName)}}>{children}</label>
    </div>);
  }
}
