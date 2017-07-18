# Button Group

## Installation & Usage

`npm install pui-css-button-group --save`

## Description

Button groups wrap a series of buttons.

## Example

```html
<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default-alt">Left</button>
  <button type="button" class="btn btn-default-alt">Middle</button>
  <button type="button" class="btn btn-default-alt">Right</button>
</div>
```

```html
::description=You can also mark buttons in the group as selected by swapping between alt button styles.
<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default-alt">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default-alt">Right</button>
</div>
```

```html
::description=If you are using flat buttons, there is a thinner, flat button group
<div class="btn-group-flat" role="group" aria-label="...">
  <button type="button" class="btn">Left</button>
  <button type="button" class="btn">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>
```