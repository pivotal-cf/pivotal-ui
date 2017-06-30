# Panels

## Description

Using Panels, you can organize information collections into logical groups, aggregate your content and show it to be context specific. They include box headers, footers, and can be combined with any background. See it in action [here](https://pui-pivots.cfapps.io/).

A `ScrollingPanel` is created by using a `Panel` component and including a true value for the `scrollable`
property. Alternatively, if this value is a number, it will become the height of the scrollable panel in pixels.


Do        | Don't
----------|----------
Use a panel to logically group content that has the following form: header, body, and/or footer. | Use a panel as a generic wrapping element. Instead, avail yourself of the various background color modifiers we have.
Use multiple panels or list-group inside to group a collection of related content objects. | Overload the panel header with too many calls to action.
Distinguish between primary and secondary CTAs in the header and footer (e.g., primary vs secondary buttons). | Use a panel when screen real estate is valuable, instead consider a table layout or grouped-list.

## Examples

```jsx
::title=Panel
::description= By default the panel applies basic padding to content.
<div>
  <Panel className="bg-neutral-11 optional-class" innerClassName="opt-inner-class">
    <p>Panel content</p>
  </Panel>
</div>
```

```jsx
::title=Panel with box-shadow and rounded corners
::description=Adding `.box-shadow-1` to the `.panel` lightly pops the panel off the page. This is the preferred aesthetic instead of a border. This works great for pushing the panel up from the workspace.
<div>
  <Panel className="bg-neutral-11 box-shadow-1 border-rounded" innerClassName="opt-inner-class">
    <p>Panel content</p>
  </Panel>
</div>
```

```jsx
::title=Panel with header and footer
<div>
  <Panel className="bg-neutral-11 box-shadow-1 border-rounded" header='header' footer='Panel footer'>
    Base Panel with base header
  </Panel>
</div>
```

```jsx
::title=Panel with title and subtitle
<div>
  <Panel className="bg-neutral-11 box-shadow-1 border-rounded" header="Title" subtitle="subtitle">
    Panel with title and subtitle
  </Panel>
</div>
```

```jsx
::title=Panel with Custom Header & Actions
<Panel className="bg-neutral-11 box-shadow-1 border-rounded" header={<h2>Custom Title</h2>} actions={<div><button className="btn btn-default mrl">Go</button><button className="btn btn-default-alt">Stop</button></div>}>
  Panel with custom header and actions
</Panel>
```

```html
::title=Panel with Loading Animation
::description=Add a loading animation to a panel with the class `panel-loading-indicator`. The animation is intended for panels that utilize panel-header and panel-body. This should be used when the content of the panel is being loaded asynchronously and you’d like to communicate to the user that their content is on the way.
<div class="panel box-shadow-1 border-rounded">
  <div class="panel-header">
    <div class="panel-title-alt">Panel Title Alt</div>
  </div>
  <div class="panel-body">
    <div class="panel-loading-indicator"></div>
    Look, I'm loading!
  </div>
</div>
```

```jsx
::title=Default Scrollable Panel
::description=The scrollable panel sets a fixed max-height of 184px and scrolls any content that extends beyond that limit.
<Panel className="bg-neutral-11 box-shadow-1 border-rounded" scrollable={true}>
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

```jsx
::title=Scrollable Panel with specified Height
::description=Set the max-height of the scrollable zone to a custom number.
<Panel className="bg-neutral-11 box-shadow-1 border-rounded" scrollable={100}>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
</Panel>
```

## Installation & Usage

#### React
`npm install pui-react-panels --save`

`import {Panel} from 'pui-react-panels';`

#### CSS Only
`npm install pui-css-panels --save`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
header         | no | Node                   | | Node to render in the header
footer         | no | Node                   | | Node to render in the footer
actions        | no | Node                   | | Node to render as actions in the header (recommended: array of nodes)
subtitle       | no | Node                   | | An element or text to render as the subtitle in the header (only works if header is a string)
innerClassName | no | String                 | | The className to be added on the panel body
padding        | no | String                 | | Padding to use on the panel body (e.g pam, pan, phl, ptl)
scrollable     | no | oneOf(Boolean, Number) | | Use default scrolling height when boolean or a specified scrolling height
