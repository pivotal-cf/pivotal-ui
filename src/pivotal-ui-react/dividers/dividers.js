var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';

var DividerProps = {
  propTypes: {
    inverse: types.bool,
    size: types.oneOf(['large'])
  }
};

/**
 * @component Divider
 * @description Draws horizontal lines between different content groupings.
 *
 * @property size {String} If set to `large`, makes the line thicker
 *
 * @example ```js
 * var Divider = require('pui-react-dividers').Divider;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <p>Some Content</p>
 *       <Divider/>
 *       <p>Other Content</p>
 *       <Divider size="large"/>
 *       <p>Other other content</p>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#divider_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#divider)
 */
var Divider = React.createClass({
  propTypes: {
    inverse: types.bool,
    size: types.oneOf(['large'])
  },

  render() {
    var {inverse, size, ...others} = this.props;
    var dividerClass =
      {
        'divider-1': inverse && size !== 'large',
        'divider-2': inverse && size === 'large',
        'divider-alternate-1': !inverse && size !== 'large',
        'divider-alternate-2': !inverse && size === 'large'
      };

    const props = mergeProps(others, {className: dividerClass});

    return <hr {...props}/>;
  }
});

function defDivider(props) {
  return React.createClass({
    mixins: [DividerProps],
    render() {
      return <Divider {...props} {...this.props} />;
    }
  });
}

module.exports = {
  Divider,

  /**
   * @component InverseDivider
   * @description A Divider for use on dark backgrounds.
   *
   * @property size {String} If set to `large`, makes the line thicker
   *
   * @example ```js
   * var InverseDivider = require('pui-react-dividers').InverseDivider;
   * var MyComponent = React.createClass({
   *   render() {
   *     return (
   *       <p>Some Content</p>
   *       <InverseDivider/>
   *       <p>Other Content</p>
   *       <InverseDivider size="large"/>
   *       <p>Other other content</p>
   *     );
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#divider_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#divider)
   */
  InverseDivider: defDivider({inverse: true})
};


/*doc
---
title: Dividers
name: divider_react
categories:
 - react_base_dividers
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-dividers --save
</i>
</code>

Require the subcomponents:

```
var Divider = require('pui-react-dividers').Divider;
var InverseDivider = require('pui-react-dividers').InverseDivider;
```


Dividers draw horizontal lines between different content groupings.

```react_example_table
<Divider />

<Divider size="large" />
```

On a dark background, use these inverse dividers

```react_inverse_example_table
<div>
  I am some content
  <InverseDivider />
  Me too
</div>

<div>
  Here's some stuff above the divider
  <InverseDivider size='large' />
  Here's some stuff below the divider
</div>
```
*/
