# Tables

## Description

The `Table` component is a robust component that offers a styled table with fully
functioning sort. If the rows change, the content on the page will update.

## Examples

```jsx
::title=Basic Example
const columns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false
  },
  {
    attribute: 'instances',
    sortable: true
  },
  {
    attribute: 'bar',
    displayName: 'Bar',
    sortable: true,
    headerProps: {
      className: 'bar-header',
      id: 'barId'
    },
    sortBy: function(value) { return -value; }
  },
  {
    attribute: 'unsortable',
    sortable: false
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<div>
    <Table columns={columns} data={data} defaultSort='instances'/>
</div>
```

```html
::title=Table Row Hover
::description=Adding .tr-hover to a specific table row or the table element itself will add the hover effect.
<table class="table">
  <tbody>
    <tr>
      <th> Header 1 </th>
      <th> Header 2 </th>
      <th> Header 3 </th>
    </tr>
    <tr class="tr-hover">
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
  </tbody>
</table>
```

```html
::title=Table Cell Hover
::description=Adding .td-hover to the table element will allow the user to highlight individual cells.
<table class="table td-hover">
  <tbody>
    <tr>
      <th> Header 1 </th>
      <th> Header 2 </th>
      <th> Header 3 </th>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
  </tbody>
</table>
```

```html
::title=Table Border Modifiers
::description=Remove all of the internal horizontal borders with class .tr-no-h-borders applied to the table row or the table element.
<table class="table tr-no-h-borders">
  <tbody>
    <tr>
      <th> Header 1 </th>
      <th> Header 2 </th>
      <th> Header 3 </th>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
  </tbody>
</table>
```

```html
::title=No External Borders
::description=No external borders to rows using class .table-no-ext-borders on the table element.
<table class="table table-no-ext-borders">
  <tbody>
    <tr>
      <th> Header 1 </th>
      <th> Header 2 </th>
      <th> Header 3 </th>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
  </tbody>
</table>
```

```html
::title=No Borders
::description=No external borders to rows using class .table-no-borders on the table element.
<table class="table table-no-borders">
  <tbody>
    <tr>
      <th> Header 1 </th>
      <th> Header 2 </th>
      <th> Header 3 </th>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
    <tr>
      <td> Cell 1 </td>
      <td> Cell 2 </td>
      <td> Cell 3 </td>
    </tr>
  </tbody>
</table>
```

# TableRow

## Description

The `TableRow` component is provided for users who wish to customize their rows
with the `CustomRow` prop to `Table`. If a custom row is provided, the table will use that
component to render each row, giving it a `children` prop representing the cells for that row and `index`
representing the (zero-indexed) row number.

Note that sorting occurs on the actual data.
Changing the presentation of the data does not affect the sort behavior.

## Examples

```jsx
::title=Custom Row Example

const columns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false
  },
  {
    attribute: 'instances',
    sortable: true
  },
  {
    attribute: 'bar',
    displayName: 'Bar',
    sortable: true,
    headerProps: {
      className: 'bar-header',
      id: 'barId'
    },
    sortBy: function(value) { return -value; }
  },
  {
    attribute: 'unsortable',
    sortable: false
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

class CustomRow extends React.Component {
  render() {
    return (
      <TableRow className={"row-number"+this.props.index}>
        {this.props.children}
      </TableRow>
    );
  }
}

<Table columns={columns} data={data} CustomRow={CustomRow}/>
```

```jsx
::title=Custom Cell
::description=The `TableCell` component is provided for users who wish to customize their cells with the `CustomCell` attribute on the `columns` prop. If a custom cell is provided, the table will use that component to render each cell, giving it a `value` prop representing the attribute from the datum for that row and `index` representing the (zero-indexed) row number. For more advanced use cases, the `rowDatum` prop is also passed into the custom cell. Note that sorting occurs on the actual data. Changing the presentation of the data does not affect the sort behavior.
class CustomCell extends React.Component {
  render() {
    return (
      <TableCell>
        {this.props.index}: {this.props.value}, Bar value {this.props.rowDatum.bar}
      </TableCell>
    );
  }
}

const customCellColumns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false,
    CustomCell: CustomCell
  },
  {
    attribute: 'bar',
    sortable: true
  },
  {
    attribute: 'instances',
    sortable: true
  }
];

const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<Table columns={customCellColumns} data={data}/>
```
## CSS Classes

Class                   | Description
------------------------| -----------------
`.table`                | Applied to the starting element to define the style standards.
`.tr-hover`             | Applied to the starting table element or the desired row to add the hover effect.
`.td-hover`             | Applied to the starting .table element to change the table row hover effect to a table cell hover.
`.tr-no-h-borders`      | Removes inner horizontal borders from the desired .table or table row element.
`.table-no-ext-borders` | Removes external borders for the entire table when applied to the .table element.
`.table-no-borders`     | Removes all borders, internal and external, when applied to the .table element.Removes all borders, internal and external, when applied to the .table element.

## Props

Table

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
columns     | yes | Array     | | Metadata about columns
CustomRow   | no  | Component | | The component to use when rendering table rows
data        | yes | Array     | | The data to display in the table
defaultSort | no  | String    | | The name of the column to use for sorting before user input

Items in 'Column'

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
attribute   | yes | String    |       | The key to use in the data prop to get data for that column
CustomCell  | no  | Component |       | Component to use when rendering cells, defaults to TableCell
displayName | no  | String    |       | The text in the TableHeader for that column
headerProps | no  | Object    |       | React props that will be passed through to that column
sortable    | no  | Boolean   | false | Is this column sortable? Defaults to false
sortBy      | no  | Function  |       | Function to transform data before sorting
cellClass   | no  | String    |       | Class to apply to all cells in a column

# Flex Tables

## Description

The `FlexTable` component is similar to the `Table` component except it will build the underlying table
as a flex grid instead of a traditional html table.

## Examples

```jsx
::title=Basic FlexTable
const columns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false,
    cellClass: 'col-2',
    width: '100px'
  },
  {
    attribute: 'instances',
    sortable: true,
    cellClass: 'col-8'
  },
  {
    attribute: 'bar',
    displayName: 'Bar',
    sortable: true,
    headerProps: {
      className: 'bar-header',
      id: 'barId'
    },
    sortBy: function(value) { return -value; }
  },
  {
    attribute: 'unsortable',
    sortable: false,
    cellClass: 'col-8'
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<FlexTable columns={columns} data={data} defaultSort='instances'/>
```

```jsx
::title=Custom Row
::description=The `FlexTableRow` component is provided for users who wish to customize their rows with the `CustomRow` prop to `FlexTable`.
class CustomRow extends React.Component {
  render() {
    return (
      <FlexTableRow className={"tr-hover"}>
        {this.props.children}
      </FlexTableRow>
    );
  }
}
const columns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false,
    cellClass: 'col-2',
    width: '100px'
  },
  {
    attribute: 'instances',
    sortable: true,
    cellClass: 'col-8'
  },
  {
    attribute: 'bar',
    displayName: 'Bar',
    sortable: true,
    headerProps: {
      className: 'bar-header',
      id: 'barId'
    },
    sortBy: function(value) { return -value; }
  },
  {
    attribute: 'unsortable',
    sortable: false,
    cellClass: 'col-8'
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<FlexTable columns={columns} data={data} CustomRow={CustomRow}/>
```

```jsx
::title=Custom Cell
::description=The `FlexTableCell` component is provided for users who wish to customize their cells with the `CustomCell` attribute on the `columns` prop.
class CustomCell extends React.Component {
  render() {
    return (
      <FlexTableCell>
        {this.props.index}: {this.props.value}, Bar value {this.props.rowDatum.bar}
      </FlexTableCell>
    );
  }
}

const customCellColumns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false,
    CustomCell: CustomCell
  },
  {
    attribute: 'bar',
    sortable: true
  },
  {
    attribute: 'instances',
    sortable: true
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<FlexTable columns={customCellColumns} data={data}/>
```

```html
::title=Table Cell Alignment
::description=Thanks to the power of the flexbox grid you can take advantage of content alignment classes like .col-top and .col-bottom to align the content of a column.
<div class="table">
  <div class="tr grid">
    <div class="th col col-8"> Head </div>
    <div class="th col col-8"> Head </div>
    <div class="th col col-8"> Head </div>
  </div>
  <div class="tr grid">
    <div class="td col col-8">
      <div>Cell 1</div>
      <div>Cell 1.2</div>
    </div>
    <div class="td col col-8 col-top">
      <code>.col-top</code>
    </div>
    <div class="td col col-8 col-bottom">
      <code>.col-bottom</code>
    </div>
  </div>
</div>
```

```html
::title=Dynamic Cell Width
::description=The Flex table can take advantage of the dynamic column widths provided by the flexbox grid. You can use the base .col class for auto widths, .col-1 to .col-24 to define a percentage width between 1/24, .col-fixed to define a specific pixel count or just observe the width of it’s children, and finally the .col-grow-2 to .col-grow-11 to define a flex-grow column. These can all be used in conjunction. Read more about them here to learn their proper use. Also note that placing a div with .type-ellipsis into any of these cells will truncate your text content.
<div class="table">
  <div class="tr grid">
    <div class="th col col-fixed" style="width: 100px"> Fixed Width </div>
    <div class="th col col-6"> 25% Width </div>
    <div class="th col"> Auto Width </div>
    <div class="th col col-grow-2"> Double the Auto Width </div>
  </div>
  <div class="tr grid">
    <div class="td col col-fixed" style="width: 100px"> .col.col-fixed </div>
    <div class="td col col-6"> .col.col-6 </div>
    <div class="td col"> .col </div>
    <div class="td col col-grow-2"> .col-grow-2 </div>
  </div>
</div>
```

```html
::title=Table Linking
::description=The flex table is able to swap out any of it’s divs for an a tag. In the example below we can see a single cell can be made into a link or an entire row.
<div class="table">
  <div class="tr grid">
    <div class="th col col-2"> Header 1 </div>
    <div class="th col col-2"> Header 2 </div>
    <div class="th col col-4"> Header 3 </div>
    <div class="th col col-8"> Header 4 </div>
    <div class="th col col-8"> Header 5 </div>
  </div>
  <div class="tr grid">
    <div class="td col col-2"> Cell 1 </div>
    <div class="td col col-2"> Cell 2 </div>
    <div class="td col col-4"> Cell 3 </div>
    <div class="td col col-8"> Cell 4 </div>
    <a class="td col col-8" href="#tables" title="Everyone Can Read It"> Cell 5 (a tag cell) </a>
  </div>
  <a class="tr grid" href="#tables" title="Everyone Can Read It">
    <div class="td col col-24"> Cell 1-5 (a tag row with div cell) </div>
  </a>
</div>
```

## Installation & Usage

#### React
`npm install babel-loader react-svg-loader --save-dev`

`npm install pui-react-table --save`

```
import {Table, TableRow, TableCell} from 'pui-react-table';
import {FlexTable, FlexTableRow, FlexTableCell} from 'pui-react-table';
```

#### CSS Only
`npm install pui-css-table --save`

## Props

FlexTable

Property           | Required | Type      | Default | Description
-------------------|----------|-----------|---------|------------
columns            | yes      | Array     |         | Metadata about columns
CustomRow          | no       | Component |         | The component to use when rendering table rows
data               | yes      | Array     |         | The data to display in the table
defaultSort        | no       | String    |         | The name of the column to use for sorting before user input
headerRowClassName | no       | String    |         | Class name to apply to the header row
bodyRowClassName   | no       | String    |         | Class name to apply to the body rows
hideHeaderRow      | no       | Boolean   | false   | Render the header row? Defaults to false
rowProps           | no       | Object    |         | Props passed to row components
