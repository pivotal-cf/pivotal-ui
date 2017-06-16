# Portals

## Installation & Usage

#### React
`npm install pui-react-portals --save`

#### CSS Only
`npm install pui-css-portals --save`

## Description

Import the subcomponents:

```
import {PortalSource, PortalDestination} from 'pui-react-portals';
```

The `Portal` components render DOM nodes elsewhere on the page. This is useful for things like
modals, tooltips, and dropdowns, when you want to define the content near the trigger, but have
it display at the bottom of the page (generally to solve z-index and overflow incompatibilities).

For example, modals can be rendered at the bottom of `<body>`, but the React component that creates
the modal content (e.g. a `<button>`) does not have access to `<body>` directly.
If a `PortalDestination` is put at the bottom of `<body>`, a `PortalSource` can then be used
anywhere without knowing about `<body>`.

## Examples

```jsx
::title=Basic Example
<div>
  <section>
    <span>Content will be transported from here:</span>
    <PortalSource name="modal">Transported content</PortalSource>
  </section>
  <section className="mvxxl">Unrelated content</section>
  <section>
    <span>To here:</span>
    <PortalDestination name="modal"/>
  </section>
</div>
```

## Props

PortalSource/PortalDestination

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
name | yes | String | | Use same name to connect sources and destinations
