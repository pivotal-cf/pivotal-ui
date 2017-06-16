# Labels

## Installation & Usage

#### React
`npm install pui-react-labels --save`

#### CSS Only
`npm install pui-css-labels --save`

## Description

## Basic Usage

Import the subcomponents:

```
import {Label} from 'pui-react-labels';
```

Labels are a straightforward implementation of the [Label][label] style.

Labels can be used on their own:

```jsx
::title=Basic Example
<div>
  <Label>yeah</Label>
</div>
```

Labels used within an element which already has font modifier styles will use
the parents' styling. For example:

```jsx
::title=Parent Style Example
<div>
  <h3>
    Now the label is in a typography component <Label>yeah</Label>
  </h3>
</div>
```

## Removable Labels

Removable labels are used as tags in an editable list. The user will either enter text or select content (i.e.: a dropdown item), and it will be styled as a removable label (most likely in a list). Developers who use these labels must implement the close functionality for when the user clicks the close button.

```html
<span class="label-removable">Removable
  <a class="close-btn" aria-label="Remove label">
    <img src="/styleguide/close.svg" height="15" width="15"/>
  </a>
</span>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
className | no | String | 'label label-primary' | Classname of the label