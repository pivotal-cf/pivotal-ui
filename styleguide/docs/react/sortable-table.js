/*doc
---
title: Tables
name: table_react
categories:
 - react_base_tables
 - react_all
---
*/

/*doc

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-sortable-table --save
</i>
</code>

Require the subcomponents:

```
var SortableTable = require('pui-react-sortable-table').SortableTable;
var TableHeader = require('pui-react-sortable-table').TableHeader;
var TableRow = require('pui-react-sortable-table').TableRow;
var TableCell = require('pui-react-sortable-table').TableCell;
```

---
title: Sortable
name: table_sortable_react
parent: table_react
---

The `SortableTable` component is a robust component that offers a styled table with fully
functioning sort. If the rows change, the content on the page will update.

The `SortableTable` expects the following properties:

Property     | Required? | Type             | Description
-------------| ----------| -----------------| --------------------------------------------------------------------------
`columns`    | **yes**   | Array of Objects | Metadata about columns
`CustomRow`  | **no**    | Component        | The Component to use when rendering table rows
`data`       | **yes**   | Array of Objects | The data to display in the table
`defaultSort`| **no**    | String           | The name of the column to use for sorting before user input

The objects in `columns` expect the following properties:

Property     | Required? | Type             | Description
-------------| ----------|------------------| --------------------------------------------------------------------------
`attribute`  | **yes**   | String           | The key to use in the `data` prop to get data for that column
`CustomCell` | **no**    | Component        | Component to use when rendering cells, defaults to `TableCell`
`displayName`| **no**    | String           | The text in the TableHeader for that column
`headerProps`| **no**    | Object           | React props that will be passed through to that column
`sortable`   | **no**    | Boolean          | Is this column sortable? Defaults to false
`sortBy`     | **no**    | Function         | Function to transform data before sorting


```jsx_example
var columns = [
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
var data = [
   {
     instances: '1',
     bar: 11,
     title: 'foo',
     unsortable: '14',
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

```

```react_example
<SortableTable columns={columns} data={data} defaultSort='instances'/>
```

The `TableRow` component is provided for users who wish to customize their rows
with the `CustomRow` prop to `SortableTable`. If a custom row is provided, the table will use that
component to render each row, giving it a `children` prop representing the cells for that row and `index`
representing the (zero-indexed) row number.

Note that sorting occurs on the actual data.
Changing the presentation of the data does not affect the sort behavior.

```jsx_example
var CustomRow = React.createClass({
  render() {
    return (
      <TableRow className={"row-number"+this.props.index}>
        {this.props.children}
      </TableRow>
    );
  }
});
```

```react_example
<SortableTable columns={columns} data={data} CustomRow={CustomRow}/>
```

 The `TableCell` component is provided for users who wish to customize their cells
 with the `CustomCell` attribute on the `columns` prop. If a custom cell is provided, the table will use that
 component to render each cell, giving it a `value` prop representing the attribute from the datum for that row and `index`
 representing the (zero-indexed) row number.

 Note that sorting occurs on the actual data.
 Changing the presentation of the data does not affect the sort behavior.

 ```jsx_example
 var CustomCell = React.createClass({
   render() {
     return (
       <TableCell>
         {this.props.index}: {this.props.value}
       </TableCell>
     );
   }
 });

 var newColumns = [
   {
     attribute: 'title',
     displayName: 'Title',
     sortable: false,
     CustomCell: CustomCell
   },
   {
     attribute: 'instances',
     sortable: true
   }
 ];

 ```

 ```react_example
 <SortableTable columns={newColumns} data={data}/>
 ```

*/
