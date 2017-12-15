import React from 'react';
import classnames from 'classnames';
import {Icon} from '../iconography';
import PropTypes from 'prop-types';
import uniqueId from 'lodash.uniqueid';

export class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    id: PropTypes.string,
    labelClassName: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'checkbox'
  };

  componentDidMount() {
    require('../../css/forms');
    require('../../css/checkbox');
  }

  render() {
    const {className, disabled, children, labelClassName, style, id = uniqueId('checkbox'), ...others} = this.props;

    return (
      <div {...{className: classnames('pui-checkbox', className), style}}>
        <input {...{
          ...others,
          className: 'pui-checkbox-input',
          type: 'checkbox',
          id,
          disabled,
          'aria-disabled': disabled
        }}/>
        <label {...{className: classnames('pui-checkbox-label', labelClassName), htmlFor: id}}>
          <span className="pui-checkbox-control">
            <Icon src="check"/>
          </span>
          {children}
        </label>
      </div>);
  }
}