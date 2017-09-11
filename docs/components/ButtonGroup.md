# Button group

## Description

Button groups wrap a series of buttons.

## Examples

```html
::title=Basic example
<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default-alt">Left</button>
  <button type="button" class="btn btn-default-alt">Middle</button>
  <button type="button" class="btn btn-default-alt">Right</button>
</div>
```

```html
::title=Selected button example
::description=You can also mark buttons in the group as selected by swapping between alt button styles.
<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default-alt">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default-alt">Right</button>
</div>
```

```html
::title=Flat button example
::description=If you are using flat buttons, there is a thinner, flat button group
<div class="btn-group-flat" role="group" aria-label="...">
  <button type="button" class="btn">Left</button>
  <button type="button" class="btn">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>
```

## Installation & Usage

`npm install pivotal-ui --save`

`import * as ButtonGroup from 'pivotal-ui/css/button-group';`