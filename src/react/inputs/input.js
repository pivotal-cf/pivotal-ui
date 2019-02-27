import React from 'react';
import {Icon} from '../iconography';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class Input extends React.Component {
  static propTypes = {
    size: PropTypes.string,
    icon: PropTypes.string,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  };

  componentDidMount() {
    require('../../css/inputs');
  }

  render() {
    const {size, icon, innerRef, ...props} = this.props;

    const input = (<input {...{
      ...props,
      ref: innerRef,
      className: classnames(props.className, {
        'input-sm': ['sm', 'small'].indexOf(size) !== -1,
        'input-lg': ['lg', 'large'].indexOf(size) !== -1
      })
    }} />);

    if (!icon) return input;

    return (
      <div className="input-icon-container">
        {input}
        <Icon {...{src: icon}}/>
      </div>
    );
  }
}