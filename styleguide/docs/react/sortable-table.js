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


Property   | Required? | Type                             | Description
-----------| ----------| ---------------------------------| --------------------------------------------------------------------------
`headers`  | **yes**   | Array of TableHeader components  | The headers to display in the desired order

The `TableHeader` objects should have the following structure:

Property   | Required? | Type             | Description
-----------| ----------|------------------| --------------------------------------------------------------------------
`sortable` | no        | Boolean          | Is this column sortable? Defaults to false


If a column is marked as being sortable, it will attempt to sort the values as strings.


```jsx_example
var sortTableData = [
  {
    instances: '1',
    name: 'foo',
    cpu: 'po',
    synergy: 'qum',
    ram: 'bee',
  },
  {
    name: 'yee',
    instances: 'di',
    cpu: 'no',
    synergy: 'aum'
  },
  {
    name: 'zee',
    instances: 'si',
    cpu: 'mo',
    synergy: 'wum'
  },
  {
    name: 'jee',
    instances: 'ui',
    cpu: 'no',
    synergy: 'mum'
  }
];
```

```react_example
<SortableTable
  headers={[
    <TableHeader sortable={true}>Name</TableHeader>,
    <TableHeader sortable={true}>Instances</TableHeader>,
    <TableHeader sortable={true}>CPU</TableHeader>,
    <TableHeader>Synergy</TableHeader>,
  ]}
  className="table-light">

  {sortTableData.map(function(datum, key) {
    return (
      <TableRow key={key}>
      <TableCell>{datum.name}</TableCell>
      <TableCell>{datum.instances}</TableCell>
      <TableCell>{datum.cpu}</TableCell>
      <TableCell>{datum.synergy}</TableCell>
      </TableRow>
    );
  })}
</SortableTable>
```
*/
