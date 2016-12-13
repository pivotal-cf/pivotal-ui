/*doc
---
title: Panels
name: panel_react
categories:
 - react_components_panels
 - react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-panels --save
</code>

Import the subcomponents:

```
import {Panel} from 'pui-react-panels';
```

Panel components are straightforward implementations of the [Panel][panel]
styling. The `Panel` component itself is the base, and there are many different
flavors of Panels which all construct a particularly styled `Panel`.

The `Panel` expects the following properties:

Property        | Required? | Type              | Description
----------------| ----------| ------------------| --------------------------------------------------------------------------
`header`        | **no**    | Node         | An element or text to render in the header
`footer`        | **no**    | Node         | An element or text to render in the footer
`actions`       | **no**    | Node         | An array of elements or text to render as actions in the header
`subtitle`      | **no**    | Node         | An element or text to render as the subtitle in the header (only works if header is a string)
`innerClassName`| **no**    | String            | The className to be added on the panel body
`padding`       | **no**    | String            | Padding to use on the panel body using OOCSS naming convention (e.g pam, pan, phl, ptl)
`scrollable`    | **no**    | Boolean or Number | Use default scrolling height when boolean or a specified scrolling height

A `ScrollingPanel` is created by using a `Panel` component and including a true value for the `scrollable`
property. Alternatively, if this value is a number, it will become the height of the scrollable panel in pixels.

See examples below.

```react_example_table
<Panel className="bg-neutral-10">
  <p>Base Panel</p>
</Panel>

<Panel className="bg-neutral-10 optional-class" innerClassName="opt-inner-class">
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

<Panel className="bg-neutral-8" padding="paxxl">
  <p>Base Panel</p>
</Panel>

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
title: Simple
name: 01_panel_simple_react
parent: panel_react
---

```
import {SimplePanel} from 'pui-react-panels';
```

```react_example_table
<SimplePanel>
  Simple Panel
</SimplePanel>
```
*/

/*doc
---
title: Basic
name: 02_panel_basic_react
parent: panel_react
---

```
import {BasicPanel} from 'pui-react-panels';
```

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
name: 03_panel_basic_alt_react
parent: panel_react
---

```
import {BasicPanelAlt} from 'pui-react-panels';
```

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
name: 00_panel_title_react
parent: panel_react
---

```
import {PanelTitle} from 'pui-react-panels';
import {BasicPanelAlt} from 'pui-react-panels';
```

All Panels accept a `header` property. If `header` is a string, it will render
a panel title with some default styling using the `PanelTitle` component
internally. If `header` is a react component, it will render the component
without additional style. To create a header with some default title styling,
use the `PanelTitle` component.

```react_example_table
<BasicPanelAlt header={<div><PanelTitle>Panel Title</PanelTitle>subtitle</div>}>
  Basic Panel With Custom Title
</BasicPanelAlt>
```
*/

/*doc
---
title: Shadow
name: 06_panel_shadow_react
parent: panel_react
---

```
import {ShadowPanel} from 'pui-react-panels';
```

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
name: 05_panel_clickable_react
parent: panel_react
---

```
import {ClickablePanel} from 'pui-react-panels';
import {ClickableAltPanel} from 'pui-react-panels';
```

```react_example_table
<ClickablePanel>Clickable Panel</ClickablePanel>
<ClickableAltPanel>Clickable Panel (Alt)</ClickableAltPanel>
```
*/

/*doc
---
title: Highlight
name: 04_panel_highlight_react
parent: panel_react
---

```
import {HighlightPanel} from 'pui-react-panels';
```

```react_example_table
<HighlightPanel>
  Highlight Panel
</HighlightPanel>
```
*/
