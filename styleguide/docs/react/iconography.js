/*doc
---
title: Iconography
name: iconography_react
categories:
 - react_base_iconography
 - react_all
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
