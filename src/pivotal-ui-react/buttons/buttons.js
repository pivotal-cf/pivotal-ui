var React = require('react/addons');
import {mergeProps} from 'pui-react-helpers';

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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#button_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
 */
var UIButton = React.createClass({
  propTypes: {
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
  },

  render: function () {
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
});

function defButton(propOverrides) {
  return React.createClass({
    propTypes: {
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
    },
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
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#button_react)
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
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  DefaultAltButton: defButton({kind: 'default-alt'}),

  /**
   * @component LowlightButton
   *
   * @property href {String} Makes a button-styled link pointing to the given URL
   * @property block {Boolean} Makes the button fill the width of its container
   * @property large {Boolean} Enlarges the button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#button_react)
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
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#button_react)
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
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#button_react)
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
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#button_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#button)
   */
  HighlightAltButton: defButton({kind: 'highlight-alt'})
};

/*doc
---
title: Buttons
name: button_react
categories:
- React
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-buttons --save
</i>
</code>

Require the subcomponent:

```
var DefaultButton = require('pui-react-buttons').DefaultButton;
```


Buttons use the button tag by default. If you'd like a link rather than a button, simply add an `href` attribute.

```react_example_table
<DefaultButton href="http://example.com">
  Default
</DefaultButton>
```

To make a button large, set the `large` property to true.

```react_example_table
<HighlightButton large={true}>
  Big Button
</HighlightButton>
```

To make a button full-width, set the `block` property to true.

```react_example
<DangerButton block={true} >
  Danger Zone
</DangerButton>
```

Specific button types.

```react_example_table
<DefaultButton>
  Default
</DefaultButton>

<DefaultAltButton>
  Default alternate
</DefaultAltButton>

<LowlightButton>
  Lowlight
</LowlightButton>

<DangerButton>
  Danger
</DangerButton>

<HighlightButton>
  Highlight
</HighlightButton>

<HighlightAltButton>
  Highlight alternate
</HighlightAltButton>
```

The base button renderer. You won't really interact with this directly.

```react_example_table
<UIButton>
  I'm a button
</UIButton>
```
*/
