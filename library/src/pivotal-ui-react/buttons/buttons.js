import React from 'react'
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers'
import 'pui-css-buttons'

export class UIButton extends React.Component {
  static propTypes = {
    alt: PropTypes.bool,
    flat: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    iconOnly: PropTypes.bool,
    kind: PropTypes.oneOf(['default', 'danger', 'primary', 'brand']),
    large: PropTypes.bool,
    small: PropTypes.bool
  }

  static defaultProps = {
    kind: 'default'
  }

  render() {
    const {alt, flat, icon, iconOnly, large, small, kind, children, ...others} = this.props


    const buttonClasses = {
      className: [
        {
          'btn': true,
          [`btn-${kind}-alt`]: alt,
          [`btn-${kind}-flat`]: flat,
          [`btn-${kind}`]: !alt && !flat,
          'btn-lg': large,
          'btn-sm': small,
          'btn-icon': iconOnly
        }
      ]
    }
    let props = mergeProps(others, buttonClasses)

    const buttonText = Array.isArray(children) ?
      children.filter(child => typeof child === 'string').join(' ') :
      typeof children === 'string' ? children.toString() : null

    if (buttonText && !iconOnly)
      props = mergeProps(props, {'aria-label': buttonText})

    return this.props.href ?
      <a {...props}>{icon} {children}</a> :
      <button {...mergeProps(props, {type: 'button'})}>{icon} {children}</button>
  }
}

const defButton = propOverrides => {
  return class extends React.Component {
    render() {
      return <UIButton {...this.props} {...propOverrides}/>
    }
  }
}

export const DefaultButton = defButton()
export const PrimaryButton = defButton({kind: 'primary'})
export const DangerButton = defButton({kind: 'danger'})
export const BrandButton = defButton({kind: 'brand'})
