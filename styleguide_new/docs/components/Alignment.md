# Alignment

## Description

## Basic Usage
The following classes can be used to for horizontal alignment.
```jsx
::title=Horizontal Alignment Example
<div>
    <p className="txt-l"> <code>.txt-l</code> </p>
    <p className="txt-c"> <code>.txt-c</code> </p>
    <p className="txt-r"> <code>.txt-r</code> </p>
</div>
```

On `display: inline` and `display: table-cell` elements,
the following classes can be used to for vertical alignment.

```jsx
::title=Vertical Alignment Example
<table className="table table-bordered" >
  <tr>
    <th width="40%">
      This long text is used to expand the height of this
      table so that we can demonstrate our verticle alignment classes
      to the right.
    </th>
    <td className="txt-t" width="20%">
      <code>.txt-t</code>
    </td>
    <td className="txt-m" width="20%">
      <code>.txt-m</code>
    </td>
    <td className="txt-b" width="20%">
      <code>.txt-b</code>
    </td>
  </tr>
</table>
```

If you need to vertically align an element that does not fit into those display types,
take a look at [vertical alignment][vertical_align].