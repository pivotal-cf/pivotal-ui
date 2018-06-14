import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Router from '../helpers/router';

export default class Anchor extends PureComponent {
  static propTypes = {
    href: PropTypes.string.isRequired,
    target: PropTypes.string
  };

  onClick = evt => {
    const {href} = this.props;
    if (href && (href.charAt(0) !== '/' || href.startsWith('/static'))) return;
    evt.preventDefault();
    Router.navigate(href);
  }

  render() {
    const {href, children, className, target, id} = this.props;
    return <a {...{href, onClick: this.onClick, className, target, id}}>{children}</a>;
  }
}