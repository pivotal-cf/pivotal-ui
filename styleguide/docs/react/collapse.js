/*doc
---
title: Collapse
name: collapse_react
categories:
 - react_components_collapse
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-collapse --save
</i>
</code>

Require the subcomponents:

```
var BaseCollapse = require('pui-react-collapse').BaseCollapse;
var AltCollapse = require('pui-react-collapse').AltCollapse;
var Collapse = require('pui-react-collapse').Collapse;
```


Collapse components are implementations of the [Accordion][accordion] style. In
all `Collapse` component variations, the `header` prop describes the text
of the clickable region to toggle the expand/collapse states. You can pass `defaultExpanded`
as a prop to the `Collapse` and it will start expanded when the page loads.
*/

/*doc
---
title: Base
name: 01_base_collapse_react
parent: collapse_react
---

This is a basic collapse with no additional styles.

```react_example
<BaseCollapse header="Panel 1">
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
</BaseCollapse>
```
*/

/*doc
---
title: Alt
name: 02_alt_collapse_react
parent: collapse_react
---

This is a basic collapse with an +/- icon in the clickable region.

```react_example
<AltCollapse header="Without Arrows">
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
</AltCollapse>
```
*/

/*doc
---
title: Arrows
name: 03_arrow_collapse_react
parent: collapse_react
---

This is a basic collapse with an arrow icon in the clickable region.

```react_example
<Collapse header="With Arrows">
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
</Collapse>
```
*/

/*doc
---
title: Adding Dividers
name: 04_collapse_dividers_react
parent: collapse_react
---

To add a divider between the clickable region and the expanded content region,
simply set the `divider` property to be true.

```react_example
<Collapse header="With Divider" divider>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
</Collapse>
```
*/
