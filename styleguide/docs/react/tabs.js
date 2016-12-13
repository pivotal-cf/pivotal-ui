/*doc
---
title: Tabs
name: tabs_react
categories:
- react_components_tabs
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-tabs --save
</code>

Import the subcomponents:

```
import {Tabs} from 'pui-react-tabs';
import {LeftTabs} from 'pui-react-tabs';
import {Tab} from 'pui-react-tabs';
```

Using Tab components in React consists of a parent element for the desired Tab type (for example,
`Tabs` or `LeftTabs`). Each `Tab` is a child of this and has a `tab` property for the
string value a Tab should display. Additionally, each `Tab` must define an `eventKey` property
for uniquely identifying this tab to its parent component.

##Tabs Properties

Property   | Required? | Type             | Description
-----------| ----------|------------------| --------------------------------------------------------------------------
`actions` | no | Node | an element or text that will display in the upper right
`animation` | no | Boolean | Whether to animate when moving between tabs, defaults to true
`defaultActiveKey` | no            | anything | The tab which will start out open. This should equal one of your tab's event keys.
`largeScreenClassName` | no  | String | Will be applied to large screen tabs only
`onSelect` | no | Function | Will override default behavior when clicking on a tab. If you want to retain the default behavior as well as add new functionality, change default active key in the function you provide
`responsiveBreakpoint` | no        | one of: `"xs"`, `"sm"`, `"md"`, `lg`,          | The size at which the small-screen tabs (accordion-style) should switch to large-screen tabs (folder-style)
`smallScreenClassName` | no  | String | Will be applied to small screen tabs only
`tabType` | no | one of: `"simple"`, `"simple-alt"` | Change the styling of your tabs, mostly whether the selected tab is transparent

##Tab Properties
Property   | Required? | Type             | Description
-----------| ----------|------------------| --------------------------------------------------------------------------
`aria-labelledby` | no | String | overwrite the default `aria-labelledby` for the tab for more specific accessibility information
`className` | no | String | className to add to the tab content
`disabled` | no | Boolean | If true, disable the tab
`eventKey` | no | anything | data representing the tab, to be used with `defaultActiveKey` or `onSelect`
`onEntered` | no | Function | a function that gets called with the `eventKey` on entering a tab once animations have finished
`onExited` | no | Function | a function that gets called with the `eventKey` on exiting a tab once animations have finished
`title` | yes | Node | Text or an element rendered in the tab link
`tabClassName` | no | String | className to add to the tab link

*/

/*doc
---
title: Tabs
name: 01_tabs_react
parent: tabs_react
---

```react_example
<Tabs defaultActiveKey={1} actions={<a>Action!</a>}>
  <Tab eventKey={1} title="Tab 1">Wow!</Tab>
  <Tab eventKey={2} title="Tab 2">
    <h2>Neat!</h2>
    <span>So much content.</span>
  </Tab>
</Tabs>
```
*/

/*doc
---
title: Alt
name: 02_alt_tabs_react
parent: tabs_react
---

```react_example
<Tabs tabType="simple-alt" defaultActiveKey={2}>
  <Tab eventKey={1} title="Tab 1">Wow!</Tab>
  <Tab eventKey={2} title="Tab 2">
    <h2>Neat!</h2>
    <span>So much content.</span>
  </Tab>
</Tabs>
```
*/

/*doc
---
title: Left
name: 03_left_tabs_react
parent: tabs_react
---

`LeftTabs` can be used to create tabs where the nav is stacked on the left. They
take a few optional special properties in addition to the properties in Tabs.

Property   | Required? | Type             | Description                                  | Default
-----------| ----------|------------------| ---------------------------------------------|------------------------
`tabWidth` | no        |  `number`        | The number of bs columns for the tabs        | 6
`paneWidth` | no       | `number`         | The number of bs columns for the tab content | 24 - `tabWidth`

```react_example
<LeftTabs defaultActiveKey={1} tabWidth={3} paneWidth={9}>
  <Tab eventKey={1} title="Tab 1">Wow!</Tab>
  <Tab eventKey={2} title="Tab 2">
    Neat!
    <span>So much content.</span>
  </Tab>
</LeftTabs>
```
*/

/*doc
---
title: Responsive Breakpoints
name: 04_responsive_tabs_react
parent: tabs_react
---

Tabs can be responsive, and will display accordion-style on small screens and folder-style on large
screens.

```react_example
<Tabs defaultActiveKey={1} responsiveBreakpoint="md">
  <Tab eventKey={1} title="Tab 1"> I'm so responsive </Tab>
  <Tab eventKey={2} title="Tab 2"> Me too </Tab>
</Tabs>
```
*/
