---
title: Whitespace
menu: modifiers
cssPath: pivotal-ui/css/whitespace
---

# Overview

Use the whitespace modifiers to control the spacing around elements (margin) and within elements (padding).

## Classes

Whitespace class names are composed of three parts, following this format: `{spacing-type}{direction}{size}`. The tables below list the possible values for each part. Some examples:

- `mtxl`: margin-top-extra-large (add a 32-pixel margin on top)
- `pan`: padding-all-none (remove padding on all sides)
- `mvs`: margin-vertical-small (add 2-pixel margins on the top and bottom)

Spacing type | Description
-------------|------------
`p` | Padding (spacing within an element's borders)
`m` | Margin (spacing outside of an element's borders)

Direction | Description
----------|------------
`a` | All sides
`t` | Top only
`r` | Right side only
`b` | Bottom only
`l` | Left side only
`h` | Left and right sides (horizontal)
`v` | Top and bottom (vertical)

Size | Description
-----|------------
`n`    | None (0px)
`s`    | Small (2px)
`m`    | Medium (4px)
`l`    | Large (8px)
`xl`   | Extra large (16px)
`xxl`  | Extra extra large (24px)
`xxxl` | Extra extra extra large (32px)

# Examples

```html
::title=Padding modification example
<p>A normal paragraph</p>
<p class="pal">A paragraph with large padding</p>
```
