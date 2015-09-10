var React = require('react/addons');
import classnames from 'classnames';

/**
 * @component ListItem
 * @description An element of a list component
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#list)
 */
var ListItem = React.createClass({
  render: function() {
    return <li {...this.props}/>;
  }
});

function defList(tagName, spacingType, classNames, childClassNames) {
  return React.createClass({
    propTypes: {
      spacing: React.PropTypes.oneOf(['n', 's', 'm', 'l', 'xl']),
      className: React.PropTypes.string
    },
    render() {
      var {className, spacing, children, ...others} = this.props;
      var classes = classnames(classNames(this.props), className, spacing && `${spacingType}${spacing}`);
      if (childClassNames) {
        children = React.Children.map(children, child => React.addons.cloneWithProps(child, {className: childClassNames}));
      }
      return (
        tagName === 'ul' ? <ul className={classes} {...others}>{children}</ul> :
        tagName === 'ol' ? <ol className={classes} {...others}>{children}</ol> :
        null
      );
    }
  });
}

/**
 * @component UnorderedList
 * @description A bulleted list
 *
 * @property spacing {String} One of `n`, `s`, `m`, `l`, or `xl`: sets the amount of space between list items
 *
 * @example ```js
 * var UnorderedList = require('pui-react-lists').UnorderedList;
 * var ListItem = require('pui-react-lists').ListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <UnorderedList>
 *         <ListItem>Item 1</ListItem>
 *         <ListItem>Item 2</ListItem>
 *         <ListItem>Item 3</ListItem>
 *       </UnorderedList>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#list)
 */
var UnorderedList = defList(
  'ul', 'lv',
  ({unstyled, checked}) => classnames({
    'list-unordered': !unstyled && !checked,
    'list-unstyled': unstyled,
    'list-checked': checked
  })
);

/**
 * @component OrderedList
 * @description A numbered list
 *
 * @property spacing {String} One of `n`, `s`, `m`, `l`, or `xl`: sets the amount of space between list items
 *
 * @example ```js
 * var OrderedList = require('pui-react-lists').OrderedList;
 * var ListItem = require('pui-react-lists').ListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <OrderedList>
 *         <ListItem>Item 1</ListItem>
 *         <ListItem>Item 2</ListItem>
 *         <ListItem>Item 3</ListItem>
 *       </OrderedList>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#list)
 */
var OrderedList = defList('ol', 'lv', ({unstyled}) => classnames({'list-unstyled': unstyled}));

/**
 * @component InlineList
 * @description A list where the items are stacked horizontally
 *
 * @property spacing {String} One of `n`, `s`, `m`, `l`, or `xl`: sets the amount of space between list items
 *
 * @example ```js
 * var InlineList = require('pui-react-lists').InlineList;
 * var ListItem = require('pui-react-lists').ListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <InlineList>
 *         <ListItem>Item 1</ListItem>
 *         <ListItem>Item 2</ListItem>
 *         <ListItem>Item 3</ListItem>
 *       </InlineList>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#list)
 */
var InlineList = defList('ul', 'lh', ({divider}) => classnames('list-inline', {'list-inline-divider': divider}));

/**
 * @component GroupList
 * @description A list where the items are separated by lines
 *
 * @property spacing {String} One of `n`, `s`, `m`, `l`, or `xl`: sets the amount of space between list items
 *
 * @example ```js
 * var GroupList = require('pui-react-lists').GroupList;
 * var ListItem = require('pui-react-lists').ListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <GroupList>
 *         <ListItem>Item 1</ListItem>
 *         <ListItem>Item 2</ListItem>
 *         <ListItem>Item 3</ListItem>
 *       </GroupList>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#list)
 */
var GroupList = defList('ul', 'lv', () => classnames('list-group'), 'list-group-item');

/**
 * @component GroupListInverse
 * @description A list where the items are separated by lines, for use on a dark background
 *
 * @property spacing {String} One of `n`, `s`, `m`, `l`, or `xl`: sets the amount of space between list items
 *
 * @example ```js
 * var GroupListInverse = require('pui-react-lists').GroupListInverse;
 * var ListItem = require('pui-react-lists').ListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <GroupListInverse>
 *         <ListItem>Item 1</ListItem>
 *         <ListItem>Item 2</ListItem>
 *         <ListItem>Item 3</ListItem>
 *       </GroupListInverse>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#list)
 */
var GroupListInverse = defList('ul', 'lv', () => classnames('list-group-inverse'), 'list-group-item');

/**
 * @component StepList
 * @description A numbered list of steps in a workflow
 *
 * @property spacing {String} One of `n`, `s`, `m`, `l`, or `xl`: sets the amount of space between list items
 *
 * @example ```js
 * var StepList = require('pui-react-lists').StepList;
 * var ListItem = require('pui-react-lists').ListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <StepList>
 *         <ListItem>Item 1</ListItem>
 *         <ListItem>Item 2</ListItem>
 *         <ListItem>Item 3</ListItem>
 *       </StepList>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#list)
 */
var StepList = defList('ol', 'lh', () => classnames('list-steps'));

/**
 * @component BreadcrumbList
 * @description A list of breadcrumbs for hierarchical navigation
 *
 * @property spacing {String} One of `n`, `s`, `m`, `l`, or `xl`: sets the amount of space between list items
 *
 * @example ```js
 * var BreadcrumbList = require('pui-react-lists').BreadcrumbList;
 * var ListItem = require('pui-react-lists').ListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <BreadcrumbList>
 *         <ListItem>Item 1</ListItem>
 *         <ListItem>Item 2</ListItem>
 *         <ListItem>Item 3</ListItem>
 *       </BreadcrumbList>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#list)
 */
var BreadcrumbList = defList('ul', 'lh', () => classnames('list-breadcrumb'));

module.exports = {
  ListItem,
  UnorderedList,
  OrderedList,
  InlineList,
  GroupList,
  GroupListInverse,
  StepList,
  BreadcrumbList
};

/*doc
---
title: Lists
name: list_react
categories:
- React
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-lists --save
</i>
</code>

*/
/*doc
---
title: Breadcrumb
name: 02_list_breadcrumb_react
parent: list_react
---

Require the subcomponents:

```
import { ListItem, BreadcrumbList } from 'pui-react-lists';
```

```react_example
<BreadcrumbList>
  <ListItem><a href="/">Home</a></ListItem>
  <ListItem><a href="/react.html">React</a></ListItem>
  <ListItem className="current"><span>Lists</span></ListItem>
</BreadcrumbList>
```
*/

/*doc
---
title: Checked
name: 03_list_checked_react
parent: list_react
---

Require the subcomponents:

```
import { ListItem, UnorderedList } from 'pui-react-lists';
```

```react_example
<UnorderedList checked>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</UnorderedList>
```

*/

/*doc
---
title: Configuring Spacing
name: 04_list_spacing_react
parent: list_react
---

List Spacing can be changed setting the size of the spacing property.

|Options|Values       | Pixels
|-------|-------------|-------
|`n`    |none         |0px
|`s`    |small        |5px
|`m`    |medium       |7px
|`l`    |large        |10px
|`xl`   |extra large  |21px

```react_example
<StepList spacing="n">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem className="current">Item 3</ListItem>
</StepList>
```

```react_example
<UnorderedList spacing="xl">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem className="current">Item 3</ListItem>
</UnorderedList>
```

*/

/*doc
 ---
 title: Group
 name: 06_list_group_react
 parent: list_react
 ---

 Require the subcomponents:

 ```
 import { ListItem, GroupList } from 'pui-react-lists';
 ```

 ```react_example
 <GroupList>
   <ListItem>Item 1</ListItem>
   <ListItem>Item 2</ListItem>
   <ListItem>Item 3</ListItem>
 </GroupList>
 ```
 */

/*doc
---
title: Group Inverse
name: 07_list_group_inverse_react
parent: list_react
---

 Require the subcomponents:

 ```
 import { ListItem, GroupListInverse } from 'pui-react-lists';
 ```

```react_example
<GroupListInverse>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</GroupListInverse>
```

*/

/*doc
---
title: Inline
name: 08_list_inline_react
parent: list_react
---

 Require the subcomponents:

 ```
 import { ListItem, InlineList } from 'pui-react-lists';
 ```

```react_example_table
<InlineList>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</InlineList>
```

```react_example_table
<InlineList divider>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</InlineList>
```

*/

/*doc
---
title: Ordered
name: 10_list_ordered_react
parent: list_react
---

Require the subcomponents:

```
import { ListItem, OrderedList } from 'pui-react-lists';
```

```react_example_table
<OrderedList>
 <ListItem>Item 1</ListItem>
 <ListItem>Item 2</ListItem>
 <ListItem>Item 3</ListItem>
</OrderedList>
```

```react_example_table
<OrderedList unstyled>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</OrderedList>
```
*/

/*doc
---
title: Steps
name: 11_list_steps_react
parent: list_react
---

Require the subcomponent:

```
import { ListItem, StepList } from 'pui-react-lists';
```

```react_example
<StepList>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem className="current">Item 3</ListItem>
</StepList>
```
*/

/*doc
---
title: Unordered
name: 13_list_unordered_react
parent: list_react
---

Require the subcomponents:

```
import { ListItem, UnorderedList } from 'pui-react-lists';
```

```react_example_table
<UnorderedList>
  <ListItem>feep</ListItem>
  <ListItem>fop</ListItem>
  <ListItem>meep</ListItem>
</UnorderedList>
```

```react_example_table
<UnorderedList unstyled>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</UnorderedList>
```

*/
