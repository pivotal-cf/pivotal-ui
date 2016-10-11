/*doc
---
title: Panes
name: pane_react
categories:
 - react_utilities_panes
 - react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-panes --save
</code>

Require the subcomponents:

```
var Pane = require('pui-react-panes').Pane;
var BasePane = require('pui-react-panes').BasePane;
```

The `Pane` component is a straightforward implementation of the [Pane][pane] styling.
Any className values passed through are passed to the underlying `.pane`.

```react_example
<Pane className="bg-neutral-10">
  <h1>This is a pane</h1>
</Pane>
```

In the event that you need additional configuration applied to a Pane, you can use the
`BasePane` component which accepts properties for `className` and `innerClassName`.

These values are added to the class name of the `.pane` and the `.container` respectively.

```react_example
<BasePane className="bg-dark-2" innerClassName="bg-glow">
  <h1 color="type-neutral-9">This is a pane (configurable)</h1>
</BasePane>
```
*/
