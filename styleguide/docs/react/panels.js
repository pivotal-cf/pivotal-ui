/*doc
---
title: Panels
name: panel_react
categories:
 - react_components_panels
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-panels --save
</i>
</code>

Require the subcomponents:

```
var Panel = require('pui-react-panels').Panel;
var BasicPanelAlt = require('pui-react-panels').BasicPanelAlt;
var BasicPanel = require('pui-react-panels').BasicPanel;
var ClickablePanel = require('pui-react-panels').ClickablePanel;
var ClickableAltPanel = require('pui-react-panels').ClickableAltPanel;
var HighlightPanel = require('pui-react-panels').HighlightPanel;
var PanelTitle = require('pui-react-panels').PanelTitle;
var ScrollablePanel = require('pui-react-panels').ScrollablePanel;
var ShadowPanel = require('pui-react-panels').ShadowPanel;
var SimplePanel = require('pui-react-panels').SimplePanel;
```


Panel components are straightforward implementations of the [Panel][panel] styling. The `Panel` component itself
is the base, and there are many different flavors of Panels which all construct a particularly styled `Panel`.

See examples below.

```react_example_table
<Panel className="bg-neutral-10">
  <p>Base Panel</p>
</Panel>

<Panel className="bg-neutral-10 optional-class"
  innerClassName="opt-inner-class">
  <p>Base Panel</p>
</Panel>

<Panel className="bg-neutral-10" header='header'>
 Base Panel with base header
</Panel>

<Panel className="bg-neutral-10" header="Title" subtitle="subtitle">
  Base Panel with subtitle
</Panel>

<Panel className="bg-neutral-10" header={<h2>Custom Title</h2>}>
 Base Panel with custom header
</Panel>

<Panel className="bg-neutral-10" header={<h2>Custom Title</h2>} actions={<div><button>Go</button><button>Stop</button></div>}>
 Base Panel with custom header and actions
</Panel>

<Panel className="bg-neutral-10" footer='footer'>
 Base Panel with footer
</Panel>

```
*/

/*doc
---
title: Scrolling
name: panel_scroll_react
parent: panel_react
---

A ScrollingPanel is created by using a `Panel` component and including a true value for the `scrollable`
property. Alternatively, if this value is a number, it will become the height of the scrollable panel in pixels!

```react_example_table
<Panel className="bg-neutral-8" scrollable={100}>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
</Panel>

<Panel className="bg-neutral-8" scrollable={true}>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
</Panel>
```
*/

/*doc
---
title: Padding
name: panel_padding_react
parent: panel_react
---

Add a "padding" attribute (i.e. `pal`, `pbn`, etc.) to change the padding on the `panel-body`.

```react_example_table
<Panel className="bg-neutral-8" padding="paxxl">
  <p>Base Panel</p>
</Panel>

```

*/

/*doc
---
title: Simple
name: panel_simple_react
parent: panel_react
---

```react_example_table
<SimplePanel>
  Simple Panel
</SimplePanel>
```
*/

/*doc
---
title: Basic
name: panel_basic_react
parent: panel_react
---

```react_example_table
<BasicPanel>
  Basic Panel
</BasicPanel>

<BasicPanel header='Basic Title'>
  Basic Panel
</BasicPanel>
```
*/


/*doc
---
title: Basic Panel Alt
name: panel_basic_alt_react
parent: panel_react
---

```react_example_table
<BasicPanelAlt>
  Basic Panel
</BasicPanelAlt>

<BasicPanelAlt header='Basic Alt Title'>
  Basic Panel
</BasicPanelAlt>
```
*/

/*doc
---
title: Panel Title
name: panel_title_react
parent: panel_react
---

All Panels accept a `header` property. If `header` is a string, it will render a panel title with some
default styling using the `PanelTitle` component internally. If `header` is a react component,
it will render the component without additional style.
To create a header with some default title styling, use the `PanelTitle` component.

```react_example_table
<BasicPanelAlt header={
      <div>
        <PanelTitle>Panel Title</PanelTitle>subtitle
      </div>
    }>
  Basic Panel With Custom Title
</BasicPanelAlt>
```
*/

/*doc
---
title: Shadow
name: panel_shadow_react
parent: panel_react
---

`ShadowPanels` accept a `shadowLevel` property between 1 and 4 (darkest to lightest).
If no `shadowLevel` is set, a default value of 3 is applied.

```react_example_table
<ShadowPanel>Shadow Panel (Defaults to shadow level 3)</ShadowPanel>

<ShadowPanel shadowLevel={1}>Shadow Panel (level 1)</ShadowPanel>

<ShadowPanel shadowLevel={2}>Shadow Panel (level 2)</ShadowPanel>

<ShadowPanel shadowLevel={3}>Shadow Panel (level 3)</ShadowPanel>

<ShadowPanel shadowLevel={4}>Shadow Panel (level 4)</ShadowPanel>
```

*/

/*doc
---
title: Clickable
name: panel_clickable_react
parent: panel_react
---

```react_example_table
<ClickablePanel>Clickable Panel</ClickablePanel>

<ClickableAltPanel>Clickable Panel (Alt)</ClickableAltPanel>
```
*/

/*doc
---
title: Highlight
name: panel_highlight_react
parent: panel_react
---

```react_example_table
<HighlightPanel>
  Highlight Panel
</HighlightPanel>
```
*/
