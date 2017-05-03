/*doc
---
title: Collapse
name: collapse_react
categories:
 - react_components_collapse
 - react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-collapse --save

<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader react-svg-loader --save-dev
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
divider         | no  | Boolean |       | Specifying this property adds a divider between the clickable region and the expanded content region
header          | yes | Node    |       | The text of the clickable region to toggle the expand/collapse states
defaultExpanded | no  | Boolean | false | Setting this to true will make the component start expanded when the page loads

## Basic usage

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

Import the subcomponents:

```
import {BaseCollapse, AltCollapse, Collapse} from 'pui-react-collapse';
```

Collapse components are implementations of the [Accordion][accordion] style. In
all `Collapse` component variations, the `header` prop describes the text
of the clickable region to toggle the expand/collapse states. You can pass `defaultExpanded`
as a prop to the `Collapse` and it will start expanded when the page loads.

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

## Alt

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

## Arrows

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

## Adding Dividers

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
