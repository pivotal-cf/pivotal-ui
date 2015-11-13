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
npm install pui-react-panes --save
</i>
</code>

For the example, you also need to install [Typography](#type_react) and require `DefaultH1` from it.

Require the subcomponent:

```
var Pane = require('pui-react-panes').Pane;
var BasePane = require('pui-react-panes').BasePane;
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
