# Alignment

## Description

## Examples

```jsx
::title=Horizontal alignment example
::description=The following classes can be used to for horizontal alignment.
<div>
    <p className="txt-l"> <code>.txt-l</code> </p>
    <p className="txt-c"> <code>.txt-c</code> </p>
    <p className="txt-r"> <code>.txt-r</code> </p>
</div>
```

```jsx
::title=Vertical alignment example
::description=On `display: inline` and `display: table-cell` elements, the following classes can be used to for vertical alignment.
<table className="table table-bordered">
  <tbody>
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
  </tbody>
</table>
```

## Installation & Usage

#### CSS Only
`npm install pivotal-ui --save`

`import 'pivotal-ui/css/alignment';`
