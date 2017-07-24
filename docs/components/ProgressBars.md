# Progress bars

## Examples

```html
::title=Default
<div class="progress">
  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" class="progress-bar" role="progressbar" style="width: 0%;"></div>
</div>
<div class="mts">
  <div class="type-sm" style="float:left">0 MB / 100 MB</div>
  <div class="type-sm" style="float:right">0%</div>
</div>
<br />
<div class="progress">
  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" class="progress-bar" role="progressbar" style="width: 60%;"></div>
</div>
<div class="mts">
  <div class="type-sm" style="float:left">60 MB / 100 MB</div>
  <div class="type-sm" style="float:right">60%</div>
</div>
```

```html
::title=Custom background
::description=Customize the progress bar background color.
<div class="progress">
  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="90" class="progress-bar bg-error-3" role="progressbar" style="width: 90%;"></div>
</div>
<div class="mts">
  <div class="type-sm" style="float:left">90 MB / 100 MB</div>
  <div class="type-sm" style="float:right">90%</div>
</div>
```

```html
::title=Custom label and height
::description=Customize the progress bar with a custom label, larger height, and background color.
<div class="progress bg-shadow-3">
  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="90" class="progress-bar bg-neutral-5" role="progressbar" style="width: 60%;">
    <div class="label">60%</div>
  </div>
</div>
<p>
  60 MB / 100 MB
</p>
```

## Installation & Usage

`npm install pui-css-progress-bars --save`
