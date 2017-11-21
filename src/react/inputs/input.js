import React from 'react';
import {Icon} from '../iconography';
import classnames from 'classnames';

export class Input extends React.Component {
  componentDidMount() {
    require('../../css/inputs');
  }

  render() {
    const {size, icon, ...props} = this.props;

    const input = (<input {...{
      ...props,
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