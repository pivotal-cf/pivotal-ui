---
title: Border
menu: modifiers
cssPath: pivotal-ui/css/border
---

# Overview

Use border modifiers to control borders around an element. Whenever possible, use these instead of defining custom borders in CSS.

## Classes

Modifier | Purpose
---------|--------
`border` | Add borders on all sides
`border-top` | Add a border on the top
`border-right` | Add a border on the right
`border-bottom` | Add a border on the bottom
`border-left` | Add a border on the left
`border-none` | Remove borders from all sides
`border-top-0` | Remove border from the top
`border-right-0` | Remove border from the right
`border-bottom-0` | Remove border from the bottom
`border-left-0` | Remove border from the left
`border-rounded` | Make borders rounded
`border-not-rounded` | Make borders not rounded

# Examples

```html
::title=Adding borders
<div class="mvxl paxl border"><code>border</code></div>
<div class="mvxl paxl border-top"><code>border-top</code></div>
<div class="mvxl paxl border-right"><code>border-right</code></div>
<div class="mvxl paxl border-bottom"><code>border-bottom</code></div>
<div class="mvxl paxl border-left"><code>border-left</code></div>
```

```html
::title=Adding borders in tables
<table class="border">
  <tbody>
    <tr>
      <td class="paxl border-bottom"><code>border-bottom</code></td>
      <td class="paxl"></td>
      <td class="paxl"></td>
    </tr>
    <tr>
      <td class="paxl"></td>
      <td class="paxl"></td>
      <td class="paxl border"><code>border</code></td>
    </tr>
    <tr>
      <td class="paxl border-right"><code>border-right</code></td>
      <td class="paxl"></td>
      <td class="paxl"></td>
    </tr>
    <tr>
      <td class="paxl"></td>
      <td class="paxl"></td>
      <td class="paxl border-top"><code>border-top</code></td>
    </tr>
    <tr>
      <td class="paxl"></td>
      <td class="paxl border-left"><code>border-left</code></td>
      <td class="paxl"></td>
    </tr>
  </tbody>
</table>
```

```html
::title=Removing borders
<div class="mvxl paxl border border-none"><code>border-none</code></div>
<div class="mvxl paxl border border-top-0"><code>border-top-0</code></div>
<div class="mvxl paxl border border-right-0"><code>border-right-0</code></div>
<div class="mvxl paxl border border-bottom-0"><code>border-bottom-0</code></div>
<div class="mtxl paxl border border-left-0"><code>border-left-0</code></div>
```

```html
::title=Rounded borders
<div class="mvxl paxl border border-rounded"><code>border-rounded</code></div>
<div class="mvxl paxl border border-not-rounded"><code>border-not-rounded</code></div>
```