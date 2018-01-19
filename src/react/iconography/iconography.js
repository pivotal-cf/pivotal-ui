import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icons from './icons';

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
    const props = mergeProps(
      others,
      {className: classnames('icon', `icon-${verticalAlign}`, {'spinner': src.indexOf('spinner') === 0})}
    );

    let renderedIcon = Icons[src], iconSrc = src;

    if (!renderedIcon) {
      renderedIcon = Icons['help'];
      iconSrc = 'help';
      console.warn(`Icon "${src}" is not recognized.`)
    }

    return (<div {...props}>
      {React.cloneElement(renderedIcon, {className: `icon-${iconSrc}`, key: iconSrc})}
    </div>);
  }
}
