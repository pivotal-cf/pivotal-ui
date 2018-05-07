import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class ProgressBar extends React.Component {
  static propTypes = {
    barClassName: PropTypes.string,
    value: PropTypes.number.isRequired
  };

  static defaultProps = {
    value: 0
  };

  componentDidMount() {
    require('../../css/progress-bars');
  }

  render() {
    const {barClassName, className, value} = this.props;
    return (
      <div {...{className: classnames('pui-progress', className)}}>
        <div {...{
          className: classnames('pui-progress-bar', barClassName),
          role: 'progressbar',
          'aria-valuemax': 100,
          'aria-valuemin': 0,
          'aria-valuenow': value,
          style: {width: `${value}%`}
        }}/>
      </div>
    );
  }
}