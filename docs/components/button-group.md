---
title: Button group
cssPath: pivotal-ui/css/button-group
---

Button groups wrap a series of buttons to clearly indicate their relation.

```html
//title=Basic example
<div class="pui-btn-group" role="group" aria-label="...">
  <button type="button" class="pui-btn pui-btn--default pui-btn--alt">Left</button>
  <button type="button" class="pui-btn pui-btn--default pui-btn--alt">Middle</button>
  <button type="button" class="pui-btn pui-btn--default pui-btn--alt">Right</button>
</div>
```

```html
//title=Selected button example
//description=You can also mark buttons in the group as selected by swapping between alt button styles.
<div class="pui-btn-group" role="group" aria-label="...">
  <button type="button" class="pui-btn pui-btn--default pui-btn--alt">Left</button>
  <button type="button" class="pui-btn pui-btn--default">Middle</button>
  <button type="button" class="pui-btn pui-btn--default pui-btn--alt">Right</button>
</div>
```

```html
//title=Flat button example
//description=If you are using flat buttons, there is a thinner, flat button group
<div class="pui-btn-group-flat" role="group" aria-label="...">
  <button type="button" class="pui-btn">Left</button>
  <button type="button" class="pui-btn">Middle</button>
  <button type="button" class="pui-btn pui-btn--default">Right</button>
</div>
```