import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-images';

export class Image extends React.Component {
  static propTypes = {
    responsive: PropTypes.bool,
    href: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string.isRequired
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
