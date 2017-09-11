# Box shadows

## Description

Box-shadows are used to to describe the visual hierarchy of objects. Key light shadows are directional, ambient light shadows come from all sides, and shadow combines them both.

## Examples

```html
::title=Basic example
<div class="txt-c" style="display: flex">
  <div class="maxl paxl box-shadow-key-1" style="width: 33%;"><code>.box-shadow-key-1</code></div>
  <div class="maxl paxl box-shadow-amb-1" style="width: 33%;"><code>.box-shadow-amb-1</code></div>
  <div class="maxl paxl box-shadow-1" style="width: 33%;"><code>.box-shadow-1</code></div>
</div>
<div class="txt-c" style="display: flex">
  <div class="maxl paxl box-shadow-key-2" style="width: 33%;"><code>.box-shadow-key-2</code></div>
  <div class="maxl paxl box-shadow-amb-2" style="width: 33%;"><code>.box-shadow-amb-2</code></div>
  <div class="maxl paxl box-shadow-2" style="width: 33%;"><code>.box-shadow-2</code></div>
</div>
<div class="txt-c" style="display: flex">
  <div class="maxl paxl box-shadow-key-3" style="width: 33%;"><code>.box-shadow-key-3</code></div>
  <div class="maxl paxl box-shadow-amb-3" style="width: 33%;"><code>.box-shadow-amb-3</code></div>
  <div class="maxl paxl box-shadow-3" style="width: 33%;"><code>.box-shadow-3</code></div>
</div>
```

## Installation & Usage

`npm install pivotal-ui --save`

`import * as BoxShadows from 'pivotal-ui/css/box-shadows';`