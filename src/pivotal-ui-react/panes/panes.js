var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';

/**
 * @component BasePane
 * @description A horizontal grouping of content that usually spans the width of the browser viewport
 *
 * @property outerClassName {String} Class names to apply to the pane
 * @property innerClassName {String} Class names to apply to the content
 *
 * @example ```js
 * var BasePane = require('pui-react-panes').BasePane;
 * var DefaultH1 = require('pui-react-typography').DefaultH1;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <BasePane>
 *         <DefaultH1>Important information here</DefaultH1>
 *       </BasePane>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#pane_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/layout.html#pane)
 */
var BasePane = React.createClass({
  propTypes: {
    className: types.string,
    innerClassName: types.string
  },

  render() {
    var {innerClassName, children, ...other} = this.props;
    const outerProps = mergeProps(other, {className: 'pane'});
    const innerProps = mergeProps({className: innerClassName}, {className: 'container'});
    return (
      <div {...outerProps} >
        <div {...innerProps}>{children}</div>
      </div>
    );
  }
});

/**
 * @component Pane
 * @description A horizontal grouping of content that usually spans the width of the browser viewport
 *
 * @property outerClassName {String} Class names to apply to the pane
 * @property innerClassName {String} Class names to apply to the content
 *
 * @example ```js
 * var Pane = require('pui-react-panes').Pane;
 * var DefaultH1 = require('pui-react-typography').DefaultH1;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <Pane>
 *         <DefaultH1>Important information here</DefaultH1>
 *       </Pane>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#pane_react)
 * @see [Pivotal UI CS](http://styleguide.pivotal.io/layout.html#pane)
 */
var Pane = React.createClass({
  propTypes: {
    className: types.string
  },
  render() {
    var {className, ...other} = this.props;
    return <BasePane {...other} className={className}/>;
  }
});

module.exports = {BasePane, Pane};

/*doc
---
title: Panes
name: pane_react
categories:
 - react_utilities_panes
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-panels --save
</i>
</code>

For the example, you also need to install [Typography](#type_react) and require `DefaultH1` from it.

Require the subcomponent:

```
var Pane = require('pui-react-panels').Pane;
var BasePane = require('pui-react-panels').BasePane;
```

The `Pane` component is a straightforward implementation of the [Pane][pane] styling.
Any className values passed through are passed to the underlying `.pane`.

```react_example
<Pane className="bg-neutral-10">
  <DefaultH1>This is a pane</DefaultH1>
</Pane>
```

In the event that you need additional configuration applied to a Pane, you can use the
`BasePane` component which accepts properties for `className` and `innerClassName`.

These values are added to the class name of the `.pane` and the `.container` respectively.

```react_example
<BasePane className="bg-dark-2" innerClassName="bg-glow">
  <DefaultH1 color="type-neutral-9">This is a pane (configurable)</DefaultH1>
</BasePane>
```
*/
