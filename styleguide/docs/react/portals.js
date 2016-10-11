/*doc
---
title: Portals
name: portals_react
categories:
 - react_components_portals
 - react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-portals --save
</code>

Require the subcomponents:

```
var PortalSource = require('pui-react-portals').PortalSource;
var PortalDestination = require('pui-react-portals').PortalDestination;
```

The `Portal` components render DOM nodes elsewhere on the page. This is useful for things like
modals, tooltips, and dropdowns, when you want to define the content near the trigger, but have
it display at the bottom of the page (generally to solve z-index and overflow incompatibilities).

For example, modals can be rendered at the bottom of `<body>`, but the React component that creates
the modal content (e.g. a `<button>`) does not have access to `<body>` directly.
If a `PortalDestination` is put at the bottom of `<body>`, a `PortalSource` can then be used
anywhere without knowing about `<body>`.

```react_example
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
*/
