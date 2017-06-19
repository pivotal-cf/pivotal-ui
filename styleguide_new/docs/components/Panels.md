# Panels

## Installation & Usage

#### React
`npm install pui-react-panels --save`

`import {Panel} from 'pui-react-panels';`

#### CSS Only
`npm install pui-css-panels --save`

## Description

Using Panels, you can organize information collections into logical groups, aggregate your content and show it to be context specific. They include box headers, footers, and can be combined with any background. See it in action [here](https://pui-pivots.cfapps.io/).

Panel components are straightforward implementations of the [Panel][panel] styling. The `Panel` component itself is the base, and there are a few different properties that can be applied to achieve the desired result.

A `ScrollingPanel` is created by using a `Panel` component and including a true value for the `scrollable`
property. Alternatively, if this value is a number, it will become the height of the scrollable panel in pixels.

## Do's and Don'ts
Do's         | Don'ts
-------------|----------
Use a panel to logically group content that has the following form: header, body, and/or footer. | Use a panel as a generic wrapping element. Instead, avail yourself of the various background color modifiers we have.
Use multiple panels or list-group inside to group a collection of related content objects. | Overload the panel header with too many calls to action.
Distinguish between primary and secondary CTAs in the header and footer (e.g., primary vs secondary buttons). | Use a panel when screen real estate is valuable, instead consider a table layout or grouped-list.

## Examples

```jsx
::title=Basic Panel
<div>
  <Panel className="bg-neutral-11 optional-class" innerClassName="opt-inner-class">
    <p>Base Panel</p>
  </Panel>
</div>
```

```jsx
::title=Panel with Header
<div>
  <Panel className="bg-neutral-11 box-shadow-1" header='header'>
    Base Panel with base header
  </Panel>
</div>
```

```jsx
::title=Panel with Subtitle
<div>
  <Panel className="bg-neutral-11 box-shadow-1" header="Title" subtitle="subtitle">
    Base Panel with subtitle
  </Panel>
</div>
```

```jsx
::title=Panel with Custom Header & Actions
<Panel className="bg-neutral-11 box-shadow-1" header={<h2>Custom Title</h2>} actions={<div><button className="btn btn-default mrl">Go</button><button className="btn btn-default-alt">Stop</button></div>}>
  Panel with custom header and actions
</Panel>
```

```jsx
::title=Panel with Padding
<Panel className="bg-neutral-11 box-shadow-1" padding="paxxl">
  <p>Panel with padding</p>
</Panel>
```

```html
::title=Panel with Loading Animation
<div class="panel box-shadow-1">
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
<Panel className="bg-neutral-11 box-shadow-1" scrollable={true}>
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
<Panel className="bg-neutral-11 box-shadow-1" scrollable={100}>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
</Panel>
```

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
