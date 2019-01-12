import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from '../helpers';

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
    const {alt, flat, icon, iconPosition, iconOnly, large, small, kind, children, fullWidth, ...others} = this.props;

    if (iconOnly && !others['aria-label'] && process.env.NODE_ENV === 'development') {
      console.error('Icon-only buttons should have an accessible title set via the "aria-label" prop.');
    }

    const buttonClasses = {
      className: [
        {
          'pui-btn': true,
          [`pui-btn-${kind}-alt`]: alt,
          [`pui-btn-${kind}-flat`]: flat,
          [`pui-btn-${kind}`]: !alt && !flat,
          'pui-btn-lg': large,
          'pui-btn-sm': small,
          'pui-btn-icon': iconOnly,
          'pui-btn-icon-right': !!icon && iconPosition === 'right',
          'pui-btn-full': fullWidth,

          'btn': true,
          [`btn-${kind}-alt`]: alt,
          [`btn-${kind}-flat`]: flat,
          [`btn-${kind}`]: !alt && !flat,
          'btn-lg': large,
          'btn-sm': small,
          'btn-icon': iconOnly,
          'btn-icon-right': !!icon && iconPosition === 'right',
          'btn-full': fullWidth
        }
      ]
    };
    let props = mergeProps(others, buttonClasses);

    const buttonText = Array.isArray(children) ?
      children.filter(child => typeof child === 'string').join(' ') :
      typeof children === 'string' ? children.toString() : null;

    let btnChildren = children;

    if (buttonText && !iconOnly) {
      props = mergeProps(props, {'aria-label': buttonText});
      btnChildren = (<span>{children}</span>);
    }

    let buttonContent = (
      <span className="btn-inner-content pui-btn-inner-content">
        {icon}
        {btnChildren}
      </span>);

    if (iconPosition === 'right') {
      buttonContent = (
        <span className="btn-inner-content pui-btn-inner-content">
          {btnChildren}
          {icon}
        </span>);
    }

    return this.props.href ?
      <a {...props}>{buttonContent}</a> :
      <button {...mergeProps(props, {type: 'button'})}>
        {buttonContent}
      </button>;

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
