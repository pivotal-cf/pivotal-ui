# Border

## Description

All textual `<a>`, `<input>`, `<p>`, `<span>`, `<div>`, and `<table>` elements with border or `.border-*` are set to `width: 1px solid $input-color;` by default.

## Examples

```html
::title=Default border
<div>
    <div class="border">.border</div>
</div>
<div>
    <div class="border-top mvxl">.border-top</div>
</div>
<div>
    <div class="border-right mvxl">.border-right</div>
</div>
<div>
    <div class="border-bottom mvxl">.border-bottom</div>
</div>
<div>
    <div class="border-left mvxl">.border-left</div>
</div>
```

```html
::title=Table border
<div>
    <table class="border">
      <thead>
      <tr>
        <td>one</td>
        <td>two</td>
        <td>three</td>
        <td>four</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="border-bottom">.border-bottom</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td class="border">.border</td>
        <td></td>

      </tr>
      <tr>
        <td class="border-right">.border-right</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td class="border-top">.border-top</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td class="border-left">.border-left</td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
```

```html
::title=Border none
::description=Borders can also be controlled with the use of `border-*-0` to remove specific borders or `border-none` to remove them all.
<div>
    <div class="border mvxl border-none">.border-none</div>
</div>

<div>
    <div class="border mvxl border-top-0">.border-top-0</div>
</div>

<div>
    <div class="border mvxl border-right-0">.border-right-0</div>
</div>

<div>
    <div class="border mvxl border-bottom-0">.border-bottom-0</div>
</div>

<div>
    <div class="border mvxl border-left-0">.border-left-0</div>
</div>
```

```html
::title=Rounded borders
::description=Borders can also be rounded with `border-rounded`, or all radii effect removed with `border-not-rounded`.
<div class="panel bg-neutral-11 border border-rounded">
  <div class="panel-body">
    Border Rounded
  </div>
</div>
<br />
<div class="panel bg-neutral-11 border border-not-rounded">
  <div class="panel-body">
    Border Not Rounded
  </div>
</div>
```

## Installation & Usage

`npm install pivotal-ui --save`

`import * as Border from 'pivotal-ui/css/border';`