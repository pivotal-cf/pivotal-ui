---
title: Inputs
cssPath: pivotal-ui/css/inputs
reactPath: pivotal-ui/react/inputs
reactComponents:
  - Input
---

## Description

Most common form control, text-based input fields. Includes support for all HTML5 types: `text`, `password`, `datetime`, `datetime-local`, `date`, `month`, `time`, `week`, `number`, `email`, `url`, `search`, `tel`, and `color`.

Inputs will only be fully styled if their type is properly declared.

## Examples

```jsx
::title=Text field
 <Input placeholder="Text input" type="text"/>
```

```jsx
::title=Password field
<Input placeholder="Password" type="password" />
```

```jsx
::title=Size
::description=Input has a `size` attribute that takes three options: small, medium (default), and large.
<div>
    <Input placeholder="Date" type="date" size="small" className="mtxxl"  />
    <Input placeholder="Date" type="date" className="mtxxl"  />
    <Input placeholder="Date" type="date" size="large" className="mtxxl"  />
</div>
```

```jsx
::title=With icon
<div>
    <Input placeholder="Search" icon="search" />
    <Input placeholder="Success" icon="check" className="mtxxl" />
</div>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

Input uses the [Iconography](/iconography) component for icons. If specified, you will need to add an svg loader:

`npm install babel-loader react-svg-loader --save-dev`

`import {Input} from 'pivotal-ui/react/inputs';`

## Props

Property       | Required | Type                              | Default  | Description
---------------|----------|-----------------------------------|----------|------------
icon           | no       | String                            |          | See [Icons](/icons) for valid icon names
size           | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations

All other props are passed to the internal `<input>` tag.