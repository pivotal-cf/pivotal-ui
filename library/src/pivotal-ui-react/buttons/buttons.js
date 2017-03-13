import React from 'react'
import {mergeProps} from 'pui-react-helpers'
import 'pui-css-buttons'

export class UIButton extends React.Component {
  static propTypes = {
    alt: React.PropTypes.bool,
    flat: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.node,
    iconOnly: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['default', 'danger', 'primary', 'brand']),
    large: React.PropTypes.bool,
    small: React.PropTypes.bool
  }

  static defaultProps = {
    kind: 'default'
  }

  render() {
    const {alt, flat, icon, iconOnly, large, small, kind, children, ...others} = this.props

    const defaultProps = {
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
    const props = mergeProps(others, defaultProps)

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
