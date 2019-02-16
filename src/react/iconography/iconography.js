import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import * as Icons from './icons';

const aliases = {
  'spinner-lg': 'spinner_lg',
  'spinner-md': 'spinner_md',
  'spinner-sm': 'spinner_sm'
};

export class Icon extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
    verticalAlign: PropTypes.oneOf(['middle', 'baseline'])
  };

  static defaultProps = {
    size: 'inherit',
    style: {},
    verticalAlign: 'middle'
  };

  componentDidMount() {
    require('../../css/iconography');
  }

  render() {
    const {src, verticalAlign, ...others} = this.props;

    const isSpinner = src.indexOf('spinner') === 0;

    const props = mergeProps(
      others,
      {className: classnames('icon', `icon-${verticalAlign}`, {'spinner': isSpinner})}
    );

    let iconSrc = src;
    let renderedIcon = Icons[iconSrc] || Icons[aliases[iconSrc]];

    if (!renderedIcon) {
      renderedIcon = Icons.help;
      iconSrc = 'help';
      console.warn(`Icon "${src}" is not recognized.`);
    }

    const iconClassName = `icon-${isSpinner ? iconSrc.replace('_', '-') : iconSrc}`;

    return (<div {...props}>
      {React.cloneElement(renderedIcon, {className: iconClassName, key: iconSrc})}
    </div>);
  }
}
