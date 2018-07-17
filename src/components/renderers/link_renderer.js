import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class LinkRenderer extends PureComponent {
  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
  };

  render() {
    const {href, children = []} = this.props;
    if (/^https?:\/\//.test(href) || href.startsWith('/static/')) return <a {...{href}}>{children[0]}</a>;
    return <Link to={href}>{children[0]}</Link>;
  }
}