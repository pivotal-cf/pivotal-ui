---
title: Box Shadows
menu: modifiers
cssPath: pivotal-ui/css/box-shadows
---

# Overview

These modifiers add box shadows to elements. Box shadows are used to to describe the visual hierarchy of objects.

`box-shadow-key-*` modifiers add directional shadows (heavier on the bottom than the top). `box-shadow-amb-*` modifiers add shadows that are even on all sides, emulating ambient light. `box-shadow-*` modifiers combine them both.

## Classes

Modifier | Purpose
---------|--------
`box-shadow-key-1` | Add light key shadow
`box-shadow-key-2` | Add medium key shadow
`box-shadow-key-3` | Add heavy key shadow
`box-shadow-amb-1` | Add light ambient shadow
`box-shadow-amb-2` | Add medium ambient shadow
`box-shadow-amb-3` | Add heavy ambient shadow
`box-shadow-1` | Add light shadow
`box-shadow-2` | Add medium shadow
`box-shadow-3` | Add heavy shadow

# Examples

```html
::title=Basic example
<div class="txt-c" style="display: flex">
  <div class="maxl paxl box-shadow-key-1" style="width: 33%;"><code>box-shadow-key-1</code></div>
  <div class="maxl paxl box-shadow-amb-1" style="width: 33%;"><code>box-shadow-amb-1</code></div>
  <div class="maxl paxl box-shadow-1" style="width: 33%;"><code>box-shadow-1</code></div>
</div>
<div class="txt-c" style="display: flex">
  <div class="maxl paxl box-shadow-key-2" style="width: 33%;"><code>box-shadow-key-2</code></div>
  <div class="maxl paxl box-shadow-amb-2" style="width: 33%;"><code>box-shadow-amb-2</code></div>
  <div class="maxl paxl box-shadow-2" style="width: 33%;"><code>box-shadow-2</code></div>
</div>
<div class="txt-c" style="display: flex">
  <div class="maxl paxl box-shadow-key-3" style="width: 33%;"><code>box-shadow-key-3</code></div>
  <div class="maxl paxl box-shadow-amb-3" style="width: 33%;"><code>box-shadow-amb-3</code></div>
  <div class="maxl paxl box-shadow-3" style="width: 33%;"><code>box-shadow-3</code></div>
</div>
```