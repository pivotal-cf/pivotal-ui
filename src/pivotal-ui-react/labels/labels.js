var React = require('react');
import {mergeProps} from 'pui-react-helpers';

/**
 * @component Label
 * @description Highlighted pill of text
 *
 * @example ```js
 * var Label = require('pui-react-labels').Label;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Label>New</Label>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#label_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#label)
 */
var Label = React.createClass({
  render() {
    let defaultProps = {
      className: ['label', 'label-primary']
    };
    let {children, ...others} = this.props;
    let props = mergeProps(others, defaultProps);
    return <span {...props}>{children}</span>;
  }
});

module.exports = {Label};

/*doc
---
title: Labels
name: label_react
categories:
- React
---

<code class="pam">
 <i class="fa fa-download" alt="Install the Component">
 npm install pui-react-labels --save
 </i>
 </code>

For the example, you also need to install [Typography](#type_react) and require `DefaultH3` from it.

Require the subcomponent:

```
import Label from 'pui-react-labels';
```

Labels are a straightforward implementation of the [Label][label] style.

Labels can be used on their own:

```react_example
<Label>yeah</Label>
```
Labels used within an element which already has font modifier styles will use the parents' styling. For example:

```react_example
<DefaultH3>
  Now the label is in a typography component <Label>yeah</Label>
</DefaultH3>
```
*/
