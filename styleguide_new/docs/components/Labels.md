# Labels

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

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
className | no | String | 'label label-primary' | Classname of the label
