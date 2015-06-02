var React = require('react/addons');
var classnames = require('classnames');

var ButtonProps = {
  propTypes: {
    block: React.PropTypes.bool,
    href: React.PropTypes.string,
    kind: React.PropTypes.oneOf([
      'default',
      'default-alt',
      'primary',
      'lowlight',
      'danger',
      'highlight',
      'highlight-alt'
    ]),
    large: React.PropTypes.bool
  }
};

/**
 * @component UIButton
 * @description A wrapper around the Pivotal UI button component
 *
 * @property href {String} Makes a button-styled link pointing to the given URL
 * @property block {Boolean} Makes the button fill the width of its container
 * @property large {Boolean} Enlarges the button
 *
 * @example ```js
 * var UIButton = require('pui-react-buttons').UIButton;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <UIButton>The action was successful.</UIButton>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#button_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
 */
var UIButton = React.createClass({
  mixins: [ButtonProps],

  render: function () {
    var {block, href, large, kind, children, ...others} = this.props;

    var classes = classnames(
      'btn',
      {
        'btn-block': block,
        'btn-lg': large
      },
      kind ? 'btn-' + kind : 'btn-default'
    );

    return href ?
      <a {...others} className={classes} href={href}>{children}</a> :
      <button {...others} className={classes}>{children}</button>;
  }
});

function defButton(propOverrides) {
  return React.createClass({
    mixins: [ButtonProps],
    render: function() {
      return <UIButton {...this.props} {...propOverrides}/>;
    }
  });
}

module.exports = {
  UIButton,

  /**
   * @component DefaultButton
   *
   * @property href {String} Makes a button-styled link pointing to the given URL
   * @property block {Boolean} Makes the button fill the width of its container
   * @property large {Boolean} Enlarges the button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  DefaultButton: defButton({kind: 'default'}),

  /**
   * @component DefaultAltButton
   *
   * @property href {String} Makes a button-styled link pointing to the given URL
   * @property block {Boolean} Makes the button fill the width of its container
   * @property large {Boolean} Enlarges the button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  DefaultAltButton: defButton({kind: 'default-alt'}),

  /**
   * @component PrimaryButton
   *
   * @property href {String} Makes a button-styled link pointing to the given URL
   * @property block {Boolean} Makes the button fill the width of its container
   * @property large {Boolean} Enlarges the button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  PrimaryButton: defButton({kind: 'primary'}),

  /**
   * @component LowlightButton
   *
   * @property href {String} Makes a button-styled link pointing to the given URL
   * @property block {Boolean} Makes the button fill the width of its container
   * @property large {Boolean} Enlarges the button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  LowlightButton: defButton({kind: 'lowlight'}),

  /**
   * @component DangerButton
   *
   * @property href {String} Makes a button-styled link pointing to the given URL
   * @property block {Boolean} Makes the button fill the width of its container
   * @property large {Boolean} Enlarges the button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  DangerButton: defButton({kind: 'danger'}),

  /**
   * @component HighlightButton
   *
   * @property href {String} Makes a button-styled link pointing to the given URL
   * @property block {Boolean} Makes the button fill the width of its container
   * @property large {Boolean} Enlarges the button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  HighlightButton: defButton({kind: 'highlight'}),

  /**
   * @component HighlightAltButton
   *
   * @property href {String} Makes a button-styled link pointing to the given URL
   * @property block {Boolean} Makes the button fill the width of its container
   * @property large {Boolean} Enlarges the button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  HighlightAltButton: defButton({kind: 'highlight-alt'})
};
