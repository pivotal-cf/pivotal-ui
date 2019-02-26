import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class UIButton extends React.Component {
  static propTypes = {
    alt: PropTypes.bool,
    flat: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    iconOnly: PropTypes.bool,
    kind: PropTypes.oneOf(['default', 'danger', 'primary', 'brand']),
    large: PropTypes.bool,
    small: PropTypes.bool,
    fullWidth: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['left', 'right'])
  };

  static defaultProps = {
    kind: 'default',
    iconPosition: 'left'
  };

  componentDidMount() {
    require('../../css/buttons');
  }

  render() {
    const {alt, className, flat, icon, iconPosition, iconOnly, large, small, kind, children, fullWidth, ...others} = this.props;

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
          'pui-btn--lg': large,
          'pui-btn--sm': small,
          'pui-btn--icon-only': iconOnly,
          'pui-btn--icon-right': !!icon && iconPosition === 'right',
          'pui-btn--full': fullWidth
        }
      ),
      ...others
    };

    const buttonText = Array.isArray(children) ?
      children.filter(child => typeof child === 'string').join(' ') :
      typeof children === 'string' ? children.toString() : null;

    let btnChildren = children;

    if (buttonText && !iconOnly) {
      props = {'aria-label': buttonText, ...props};
      btnChildren = (<span>{children}</span>);
    }

    const buttonContent = (
      <span className="pui-btn__inner-content">
        {iconPosition === 'right' ? btnChildren : icon}
        {iconPosition === 'right' ? icon : btnChildren}
      </span>
    );

    return this.props.href
      ? <a {...props}>{buttonContent}</a>
      : <button type="button" {...props}>{buttonContent}</button>;
  }
}

const defButton = propOverrides => {
  return class extends React.Component {
    render() {
      return <UIButton {...this.props} {...propOverrides}/>;
    }
  };
};

export const DefaultButton = defButton();
export const PrimaryButton = defButton({kind: 'primary'});
export const DangerButton = defButton({kind: 'danger'});
export const BrandButton = defButton({kind: 'brand'});
