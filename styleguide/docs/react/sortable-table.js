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

The objects in `columns` following properties:

Property     | Required? | Type             | Description
-------------| ----------|------------------| --------------------------------------------------------------------------
`attribute`  | **yes**   | String           | The key to use in the `data` prop to get data for that column
`displayName`| **no**    | String           | The text in the TableHeader for that column
`headerProps`| **no**    | Object           | React props that will be passed through to that column
`sortable`   | **no**    | Boolean          | Is this column sortable? Defaults to false


```jsx_example
var columns = [
   {
     attribute: 'title',
     displayName: 'Title',
     sortable: false
   },
   {
     attribute: 'instances',
     sortable: true,

   },
   {
     attribute: 'bar',
     displayName: 'Bar',
     sortable: true,
     headerProps: {
       className: 'bar-header',
       id: 'barId'
     }
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

The `TableRow` and `TableCell` components are provided for users who wish to customize their rows
with the `CustomRow` prop to `SortableTable`. If a custom row is provided, the table will use that
component to render each row, giving it a `datum` prop representing the data for that row and `index`
representing the (zero-indexed) row number.

Note that sorting occurs on the actual data.
Changing the presentation of the data does not affect the sort behavior.

```jsx_example
var CustomRow = React.createClass({
  render() {
    var title = this.props.datum.title;
    return (
      <TableRow className={"row-number"+this.props.index}>
        <TableCell onClick={function(){alert(title)}}>Title: {title}</TableCell>
        <TableCell>{this.props.datum.instances}</TableCell>
        <TableCell>{-this.props.datum.bar}</TableCell>
        <TableCell>something</TableCell>
      </TableRow>
    );
  }
});
```

```react_example
<SortableTable columns={columns} data={data} CustomRow={CustomRow}/>
```

*/
