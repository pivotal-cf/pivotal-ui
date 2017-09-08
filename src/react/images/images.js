import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from '../helpers';

export class Image extends React.PureComponent {
  static propTypes = {
    responsive: PropTypes.bool,
    href: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string.isRequired
  };

  componentDidMount() {
    require('../../css/images');
  }

  render() {
    let {responsive, href, children, ...props} = this.props;
    if (responsive) {
      props = mergeProps(props, {className: 'img-responsive'});
    }

    const image = <img {...props}>{children}</img>;
    return href ? <a {...{href}}>{image}</a> : image;
  }
}
