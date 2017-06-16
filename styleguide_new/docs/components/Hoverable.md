# Hoverable

## Installation & Usage

#### React
`npm install pui-react-hoverable --save`

#### CSS Only
`npm install pui-css-hoverable --save`

## Description

This component is for showing hidden actions on hover.

## Basic Usage
If you put this on an element then hovering on that parent element will show the hidden element.
This can be used with any kind of list but the list group style seems to fit this use case best.

```html
::title=List Example
<div>
    <ul className="list-group">
      <li class="list-group-item" hoverable>List Item 1<a class="hovered" href="#">Edit</a></li>
      <li class="list-group-item" hoverable>List Item 2<a class="hovered" href="#">Edit</a></li>
      <li class="list-group-item" hoverable>List Item 3<a class="hovered" href="#">Edit</a></li>
      <li class="list-group-item">Not hoverable</li>
    </ul>
</div>
```

```html
::title=Table Example
<div>
  <table>
    <tr>
      <th>Name</th>
    </tr>
    <tr hoverable="true">
      <td>
        Row 1
        <a class="hovered" href="#">Delete</a>
      </td>
    </tr>
    <tr hoverable="<%= true %>">
      <td>
        Row 2
        <a class="hovered" href="#">Delete</a>
      </td>
    </tr>
    <tr hoverable="true">
      <td>
        Row 3
        <a class="hovered" href="#">Delete</a>
      </td>
    </tr>
    <tr>
      <td>
        Not hoverable
      </td>
    </tr>
  </table>
</div>
```
## Props
