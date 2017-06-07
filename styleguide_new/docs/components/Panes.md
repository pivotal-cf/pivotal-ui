# Alerts

## Description

## Basic Usage

Import the subcomponents:

```
import {Pane, BasePane} from 'pui-react-panes';
```

The `Pane` component is a straightforward implementation of the [Pane][pane] styling.
Any className values passed through are passed to the underlying `.pane`.

```jsx
::title=Basic Example
<div>
    <Pane className="bg-neutral-10">
      <h1>This is a pane</h1>
    </Pane>
    <br/>
</div>
```

In the event that you need additional configuration applied to a Pane, you can use the
`BasePane` component which accepts properties for `className` and `innerClassName`.

These values are added to the class name of the `.pane` and the `.container` respectively.

```jsx
::title=BasePane Example
<BasePane className="bg-dark-2" innerClassName="bg-glow">
  <h1 color="type-neutral-9">This is a pane (configurable)</h1>
</BasePane>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
className      | no | String | | Classname of the element
innerClassName | no | String | | Classname of the inner element
