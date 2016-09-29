var React = require('react');
import {mergeProps} from 'pui-react-helpers';
require('pui-css-buttons');

class UIButton extends React.Component{
  static propTypes = {
    block: React.PropTypes.bool,
    href: React.PropTypes.string,
    kind: React.PropTypes.oneOf([
      'default',
      'default-alt',
      'lowlight',
      'danger',
      'highlight',
      'highlight-alt'
    ]),
    large: React.PropTypes.bool
  };

  render() {
    var {block, large, kind='default', children, ...others} = this.props;

    let defaultProps = {
      className: [
          'btn',
          `btn-${kind}`,
          {
            'btn-block': block,
            'btn-lg': large
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
      block: React.PropTypes.bool,
      href: React.PropTypes.string,
      kind: React.PropTypes.oneOf([
        'default',
        'default-alt',
        'lowlight',
        'danger',
        'highlight',
        'highlight-alt'
      ]),
      large: React.PropTypes.bool
    };

    render() {
      return <UIButton {...this.props} {...propOverrides}/>;
    }
  }
}

module.exports = {
  UIButton,

  DefaultButton: defButton({kind: 'default'}),

  DefaultAltButton: defButton({kind: 'default-alt'}),

  LowlightButton: defButton({kind: 'lowlight'}),

  DangerButton: defButton({kind: 'danger'}),

  HighlightButton: defButton({kind: 'highlight'}),

  HighlightAltButton: defButton({kind: 'highlight-alt'})
};
