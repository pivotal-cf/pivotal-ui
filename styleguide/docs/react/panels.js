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

## Basic usage

Import the subcomponents:

```
import {Panel} from 'pui-react-panels';
```

Panel components are straightforward implementations of the [Panel][panel] styling. The `Panel` component itself is the base, and there are a few different properties that can be applied to achieve the desired result. 

A `ScrollingPanel` is created by using a `Panel` component and including a true value for the `scrollable`
property. Alternatively, if this value is a number, it will become the height of the scrollable panel in pixels.

See examples below.

```react_example_table
<Panel className="bg-neutral-11">
  <p>Panel content</p>
</Panel>

<Panel className="bg-neutral-11 optional-class" innerClassName="opt-inner-class">
  <p>Panel content</p>
</Panel>

<Panel className="bg-neutral-11 box-shadow-1" header='Panel header' footer='Panel footer'>
  Panel with box-Shadow-1
</Panel>

<Panel className="bg-neutral-11 box-shadow-1" header="Title" subtitle="Subtitle">
  Panel with title and subtitle
</Panel>

<Panel className="bg-neutral-11 box-shadow-1" header={<h2>Custom Title</h2>} actions={<div><button className="btn btn-default mrl">Go</button><button className="btn btn-default-alt">Stop</button></div>}>
  Panel with custom header and actions
</Panel>

<Panel className="bg-neutral-11 box-shadow-1" padding="paxxl">
  <p>Panel with padding</p>
</Panel>

<Panel className="bg-neutral-11 box-shadow-1" scrollable={100}>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
</Panel>

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
*/
