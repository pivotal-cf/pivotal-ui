const React = require('react');
const {PropTypes} = React;
const ReactFaIcon = require('react-fa/dist/Icon');
const objectAssign = require('object-assign');

class Icon extends React.Component {
  render() {
    const {size, className, ...props} = this.props;

    return (<ReactFaIcon className={`${className} fa-${size}`.trim()} {...props} />);
  }
}

function satisfiesOneOf(...propTypes) {
  return function(props, propName, componentName) {
    var error;
    var errorMessages = [];
    for (var propType of propTypes) {
      error = propType(props, propName, componentName);
      if (!error) {
        return null;
      } else {
        errorMessages.push(error.message);
      }
    }

    return new Error(`Failed to satisfy any of the possible requirements:\n  ${errorMessages.join('\n  ')}`);
  };
}

Icon.propTypes = objectAssign({}, ReactFaIcon.propTypes, {
  size: satisfiesOneOf(
    ReactFaIcon.propTypes.size,
    PropTypes.oneOf([ 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sm', 'xs' ])
  )
});

module.exports = {
  /**
   * @component Icon
   * @description Inserts a Font Awesome icon
   *
   * @property name {String} The name of the icon (without the fa- prefix)
   * @property size {String} Can either be a PUI typography size (title, h1,
   * h2, h3, h4, h5, h6, sm, xs) or a FA size (lg, 2x, 3x, 4x, 5x).
   *
   * @example ```js
   * var Icon = require('pui-react-iconography').Icon;
   * var MyComponent = React.createClass({
   *   render() {
   *     return <Icon name="plus" size="h5"/>;
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#icon_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#iconography)
   */
  Icon: Icon
};


/*doc
---
title: Iconography
name: iconography_react
categories:
- React
---


<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-iconography --save
</i>
</code>

Require the subcomponent:

```
var Icon = require('pui-react-iconography');
```



We use [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).
Specify the icon by changing the name. The name is the font-awesome class sans the `fa-`.
To spin the icon, add `spin` to the Icon.

```react_example_table
<Icon name="plus" />

<Icon spin name="angellist" />
```
*/

/*doc
---
title: React Iconography Sizing
name: iconography_sizing_react
parent: iconography_react
---

Pass in any PUI typography size modifier in the size attribute.
These are useful if you want your icon to match the size of a text element.

```react_example_table
<Icon name="plus" size="title" />

<Icon name="plus" size="h1" />

<Icon name="plus" size="h2" />

<Icon name="plus" size="h3" />

<Icon name="plus" size="h4" />

<Icon name="plus" size="h5" />

<Icon name="plus" size="h6" />

<Icon name="plus" size="sm" />

<Icon name="plus" size="xs" />
```

You can also pass in any FontAwesome size modifier as well.

```react_example_table
<Icon name="plus" size="lg" />

<Icon name="plus" size="2x" />

<Icon name="plus" size="3x" />

<Icon name="plus" size="4x" />

<Icon name="plus" size="5x" />
```
*/
