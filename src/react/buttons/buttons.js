import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {ThemeConsumer} from '../theme-context';

export class UIButton extends React.Component {
  static propTypes = {
    alt: PropTypes.bool,
    flat: PropTypes.bool,
    fullWidth: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    iconPosition: PropTypes.oneOf(['left', 'right']),
    iconOnly: PropTypes.bool,
    kind: PropTypes.oneOf(['default', 'danger', 'primary', 'brand']),
    large: PropTypes.bool,
    onDark: PropTypes.bool,
    small: PropTypes.bool
  };

  static defaultProps = {
    kind: 'default',
    iconPosition: 'left'
  };

  componentDidMount() {
    require('../../css/buttons');
  }

  render() {
    const {
      alt,
      className,
      flat,
      fullWidth,
      icon,
      iconPosition,
      iconOnly,
      kind,
      large,
      onDark,
      small,
      children,
      ...others
    } = this.props;

    if (iconOnly && !others['aria-label'] && process.env.NODE_ENV === 'development') {
      console.error('Icon-only buttons should have an accessible title set via the "aria-label" prop.');
    }

    let props = {
      className: classnames(
        className,
        'pui-btn',
        `pui-btn--${kind}`,
        {
          'pui-btn--alt': alt,
          'pui-btn--flat': flat,
          'pui-btn--full': fullWidth,
          'pui-btn--icon-only': iconOnly,
          'pui-btn--icon-right': !!icon && iconPosition === 'right',
          'pui-btn--lg': large,
          'pui-btn--on-dark': onDark,
          'pui-btn--sm': small
        }
      ),
      ...others
    };

    const buttonText = Array.isArray(children)
      ? children.filter(child => typeof child === 'string').join(' ')
      : typeof children === 'string'
        ? children.toString()
        : null;

    let btnChildren = children;

    if (buttonText && !iconOnly) {
      props = {'aria-label': buttonText, ...props};
      btnChildren = (<span>{children}</span>);
    }

    const buttonContent = (
      <Fragment>
        {iconPosition === 'right' ? btnChildren : icon}
        {iconPosition === 'right' ? icon : btnChildren}
      </Fragment>
    );

    return this.props.href
      ? <a {...props}>{buttonContent}</a>
      : <button type="button" {...props}>{buttonContent}</button>;
  }
}

const defButton = kind => props => {
  return (
    <ThemeConsumer>
      {theme => <UIButton kind={kind} onDark={theme === 'dark'} {...props}/>}
    </ThemeConsumer>
  );
};

export const DefaultButton = defButton('default');
export const PrimaryButton = defButton('primary');
export const DangerButton = defButton('danger');
export const BrandButton = defButton('brand');
