---
title: Alignment
menu: modifiers
cssPath: pivotal-ui/css/alignment
---

# Overview

Alignment modifier classes are used control horizontal and vertical alignment of an element's contents.

## Classes

Modifier | Purpose
---------|--------
`txt-l` | Align contents to the left
`txt-c` | Center contents horizontally
`txt-r` | Align contents to the right
`txt-t` | Align contents to the top
`txt-m` | Center contents vertically
`txt-b` | Align contents to the bottom

Note that the vertical alignment classes listed here (`txt-t`, `txt-m`, `txt-b`) will only work when applied to elements with `display: inline` or `display: table-cell`. For vertical alignment within `display: block` elements, [these modifiers](/vertical-alignment) might be more useful.

# Examples

```jsx
::title=Horizontal alignment
<div>
  <p className="txt-l"><code>txt-l</code></p>
  <p className="txt-c"><code>txt-c</code></p>
  <p className="txt-r"><code>txt-r</code></p>
</div>
```

```jsx
::title=Vertical alignment
<table className="table">
  <tbody>
    <tr>
      <td width="40%">
        This long text is used to expand the height of this
        table so that we can demonstrate our vertical alignment classes
        to the right.
      </td>
      <td className="txt-t" width="20%">
        <code>txt-t</code>
      </td>
      <td className="txt-m" width="20%">
        <code>txt-m</code>
      </td>
      <td className="txt-b" width="20%">
        <code>txt-b</code>
      </td>
    </tr>
  </tbody>
</table>
```
