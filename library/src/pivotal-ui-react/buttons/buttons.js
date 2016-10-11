var React = require('react');
import {mergeProps} from 'pui-react-helpers';
require('pui-css-buttons');

class UIButton extends React.Component{
  static propTypes = {
    alt: React.PropTypes.bool,
    flat: React.PropTypes.bool,
    href: React.PropTypes.string,
    kind: React.PropTypes.oneOf([
      'default',
      'danger',
      'primary',
      'brand'
    ]),
    large: React.PropTypes.bool,
    small: React.PropTypes.bool
  };

  static defaultProps = {
    kind: 'default'
  };

  render() {
    const {alt, flat, large, small, kind, children, ...others} = this.props;

    let defaultProps = {
      className: [
          {
            'button': this.props.href,
            [`btn-${kind}-alt`]: alt,
            [`btn-${kind}-flat`]: flat,
            [`btn-${kind}`]: !alt && !flat,
            'btn-lg': large,
            'btn-sm': small
          }
      ]
    };
    let props = mergeProps(others, defaultProps);

    return this.props.href ?
      <a {...props}>{children}</a> :
      <button {...props}>{children}</button>;
  }
}

function defButton(propOverrides) {
  return class extends React.Component {
    static propTypes = {
      alt: React.PropTypes.bool,
      flat: React.PropTypes.bool,
      href: React.PropTypes.string,
      large: React.PropTypes.bool,
      small: React.PropTypes.bool
    };

    render() {
      return <UIButton {...this.props} {...propOverrides}/>;
    }
  }
}

module.exports = {
  UIButton,

  DefaultButton: defButton({kind: 'default'}),

  DangerButton: defButton({kind: 'danger'}),

  PrimaryButton: defButton({kind: 'primary'}),

  BrandButton: defButton({kind: 'brand'})
};
