# Vertical Alignment

## Installation & Usage

`npm install pui-css-vertical-alignment --save`

## Description

The Aligner allows you to vertically align children to the top, center, or bottom.
Its height is set by default to 230px.

## Examples

```html
<div class="alert alert-warning">
  <p class="em-high">
    This component is not supported in IE10 and below.
    While the content will appear, it will not be vertically aligned.
  </p>
</div>

<div class="aligner">
  <a class="aligner-item aligner-item-top" href="http://bit.ly/1wCDWdC">On Top</a>
  <a class="aligner-item" href="http://bitly.com/ZTHUDU">Center</a>
  <a class="aligner-item aligner-item-bottom" href="http://bit.ly/12TqYiL">Bottom</a>
</div>
```

```html
::description=Override the default height by setting an inline style like so:
<div class="aligner" style="height: 100px;">
  <a class="aligner-item" href="http://bitly.com/ZTHUDU">Center</a>
</div>
```

```html
::description=You can position both vertically and horizontally by combining the aligner with grids, or the text-alignment classes (`.txt-l`, `.txt-r`, and `.txt-c`)
<div class="aligner txt-c">
  <a class="aligner-item" href="http://bitly.com/ZTHUDU">Centered content</a>
</div>
```
