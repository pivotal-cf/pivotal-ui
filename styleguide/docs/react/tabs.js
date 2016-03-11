/*doc
---
title: Tabs
name: tabs_react
categories:
 - react_components_tabs
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-tabs --save
</i>
</code>

Require the subcomponents:

```
var Tabs = require('pui-react-tabs').Tabs;
var LeftTabs = require('pui-react-tabs').LeftTabs;
var Tab = require('pui-react-tabs').Tab;
```


Using Tab components in React consists of a parent element for the desired Tab type (for example,
`Tabs` or `LeftTabs`). Each `Tab` is a child of this and has a `tab` property for the
string value a Tab should display. Additionally, each `Tab` must define an `eventKey` property
for uniquely identifying this tab to its parent component.

Property   | Required? | Type             | Description
-----------| ----------|------------------| --------------------------------------------------------------------------
`responsiveBreakpoint` | no        | one of: `"xs"`, `"sm"`, `"md"`, `lg`,          | The size at which the small-screen tabs (accordion-style) should switch to large-screen tabs (folder-style)
`defaultActiveKey` | no            | should equal one of your tab's event keys | The tab which will start out open
`smallScreenClassName` | no  | css class | Will be applied to small screen tabs only
`largeScreenClassName` | no  | css class | Will be applied to large screen tabs only
`onSelect` | no | function | Will override default behavior when clicking on a tab. If you want to retain the default behavior as well as add new functionality, change default active key in the function you provide
`tabType` | no | one of: `"simple"`, `"simple-alt"` | Change the styling of your tabs, mostly whether the selected tab is transparent
`actions` | no | node | an element or text that will display in the upper right

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
