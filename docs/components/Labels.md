# Labels

## Description

Labels are a straightforward implementation of the [Label][label] style.

## Examples

```jsx
::title=Basic example
::description=Labels can be used on their own
<div>
  <Label>yeah</Label>
</div>
```

```jsx
::title=Parent style example
::description=Labels used within an element which already has font modifier styles will use the parents' styling. For example:
<div>
  <h3>
    Now the label is in a typography component <Label>yeah</Label>
  </h3>
</div>
```

```html
::title=Removable labels
::description=Removable labels are used as tags in an editable list. The user will either enter text or select content (i.e.: a dropdown item), and it will be styled as a removable label (most likely in a list). Developers who use these labels must implement the close functionality for when the user clicks the close button.
<span class="label-removable">Removable
  <a class="close-btn" aria-label="Remove label">
    <img src="/static/close.svg" height="15" width="15"/>
  </a>
</span>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {Label} from 'pivotal-ui/react/labels';`

#### CSS Only
`npm install pivotal-ui --save`

`import * as Labels from 'pivotal-ui/css/labels';`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
className | no | String | 'label label-primary' | Classname of the label