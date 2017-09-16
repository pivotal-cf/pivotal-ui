# Tables

## Description

The `Table` component is a robust component that offers a styled table. If the rows change, the content on the page will update.

Several enhanced Table components are also available:
* **SortableTable**: rows can be sorted ascending or descending by a chosen column.
* **FlexTable**: uses `div` tags to compose a table rather than traditional HTML tags
* **SortableFlexTable**: a SortableTable that is composed of `div` tags
* **AdvancedTable**: offers many additional features for advanced customization

Tables can also be composed with any subset of the features offered by the AdvancedTable.

## Examples

```jsx
::title=Basic HTML Table
const columns = [{
  attribute: 'title', displayName: 'Title'
}, {
  attribute: 'instances'
}, {
  attribute: 'bar', displayName: 'Bar'
}];
const data = [{
  instances: '1',
  bar: 11,
  title: 'foo'
}, {
  instances: '3',
  bar: 7,
  title: 'sup'
}, {
  title: 'yee',
  instances: '2',
  bar: 8
}];
<Table columns={columns} data={data}/>
```

```jsx
::title=Sortable HTML Table
const columns = [{
  attribute: 'title',
  displayName: 'Title',
  sortable: false
}, {
  attribute: 'instances',
  sortable: true
}, {
  attribute: 'bar',
  displayName: 'Bar',
  sortable: true,
  sortBy: function(value) { return -value; }
}, {
  attribute: 'unsortable',
  sortable: false
}];
const data = [{
  instances: '1',
  bar: 11,
  title: 'foo',
  unsortable: '14'
}, {
  instances: '3',
  bar: 7,
  title: 'sup',
  unsortable: '22'
}, {
  title: 'yee',
  instances: '2',
  bar: 8,
  unsortable: '1'
}];
<SortableTable columns={columns} data={data} defaultSort="instances"/>
```

```jsx
::title=Basic Flex Table
const columns = [{
  attribute: 'title', displayName: 'Title'
}, {
  attribute: 'instances'
}, {
  attribute: 'bar', displayName: 'Bar'
}];
const data = [{
  instances: '1',
  bar: 11,
  title: 'foo'
}, {
  instances: '3',
  bar: 7,
  title: 'sup'
}, {
  title: 'yee',
  instances: '2',
  bar: 8
}];
<FlexTable columns={columns} data={data}/>
```

```jsx
::title=Sortable Flex Table
const columns = [{
  attribute: 'title',
  displayName: 'Title',
  sortable: false
}, {
  attribute: 'instances',
  sortable: true
}, {
  attribute: 'bar',
  displayName: 'Bar',
  sortable: true,
  sortBy: function(value) { return -value; }
}, {
  attribute: 'unsortable',
  sortable: false
}];
const data = [{
  instances: '1',
  bar: 11,
  title: 'foo',
  unsortable: '14'
}, {
  instances: '3',
  bar: 7,
  title: 'sup',
  unsortable: '22'
}, {
  title: 'yee',
  instances: '2',
  bar: 8,
  unsortable: '1'
}];
<SortableFlexTable columns={columns} data={data} defaultSort="instances"/>
```

```jsx
::title=Table row hover
::description=Adding .tr-hover to a specific table row or the table element itself will add the hover effect.
const ComposedTable = withRowClassName(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<ComposedTable columns={columns} data={data} rowClassName={({isHeader}) => !isHeader && 'tr-hover'}/>
```

```jsx
::title=Table cell hover
::description=Adding .td-hover to the table element will allow the user to highlight individual cells.
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<Table columns={columns} data={data} className="td-hover"/>
```

```jsx
::title=Table border modifiers
::description=Remove all of the internal horizontal borders with class .tr-no-h-borders applied to the table row or the table element.
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<Table columns={columns} data={data} className="tr-no-h-borders"/>
```

```jsx
::title=No external borders
::description=No external borders to rows using class .table-no-ext-borders on the table element.
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<Table columns={columns} data={data} className="table-no-ext-borders"/>
```

```jsx
::title=No borders
::description=No external borders to rows using class .table-no-borders on the table element.
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<Table columns={columns} data={data} className="table-no-borders"/>
```

## Props

Table

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
columns     | yes | Array     | | Metadata about columns
data        | yes | Array     | | The data to display in the table

Items in 'Column'

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
attribute   | yes | String    |       | The key to use in the data prop to get data for that column
displayName | no  | String    |       | The text in the TableHeader for that column

## CSS Classes

Class                   | Description
------------------------| -----------------
`.table`                | Applied to the starting element to define the style standards.
`.tr-hover`             | Applied to the starting table element or the desired row to add the hover effect.
`.td-hover`             | Applied to the starting .table element to change the table row hover effect to a table cell hover.
`.tr-no-h-borders`      | Removes inner horizontal borders from the desired .table or table row element.
`.table-no-ext-borders` | Removes external borders for the entire table when applied to the .table element.
`.table-no-borders`     | Removes all borders, internal and external, when applied to the .table element.Removes all borders, internal and external, when applied to the .table element.
`.table-td-pal`         | Applied to table cell to add 8px vertical padding
`.table-td-paxl`        | Applied to table cell to add 16px vertical padding

## Using Plugins

The base Table component has a limited feature-set. Users can compose Tables with additional features by using plugins. The following sections demonstrate the available set of plugins provided by Pivotal UI.

```jsx
::title=Flex
::description=Flex tables are composed of `div` tags.
const TableWithFlex = withFlex(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithFlex columns={columns} data={data}/>
```

```jsx
::title=Cell links
::description=Each cell in a column of a FlexTable can be an `a` tag. In this example, the first column links to the `tables` styleguide page, and the last column links to the `alerts` page.
const FlexTableWithCellLink = withCellLink(FlexTable);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].link = () => 'https://styleguide.pivotal.io/tables';
columns[2].link = () => 'https://styleguide.pivotal.io/alerts';
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<FlexTableWithCellLink columns={columns} data={data}/>
```

```jsx
::title=Cell className
::description=Each cell in a column can have custom classes. In this example, the first column has the `h4` class applied.
const TableWithClassName = withCellClassName(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].className = 'h4';
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithClassName columns={columns} data={data}/>
```

```jsx
::title=Cell ellipsis
::description=Each cell in a column of a FlexTable can be set to trail off with an ellipsis when the contents exceed the available space. In this example, the first column has the `type-ellipsis` class applied.
const FlexTableWithCellEllipsis = withCellEllipsis(FlexTable);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].ellipsis = true;
const data = [1, 2].map(() => ({header1: 'CellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCell', header2: 'Cell 2', header3: 'Cell 3'}));
<FlexTableWithCellEllipsis columns={columns} data={data}/>
```

```jsx
::title=Cell onClick
::description=Each cell in a column can be provided an onClick handler. In this example, the first column has the will show an alert with  contextual information for the row when clicked.
const TableWithCellOnClick = withCellOnClick(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].onClick = (e, context) => alert(JSON.stringify(context, null, 2)); 
const data = [1, 2].map(row => ({header1: `Row ${row}, Cell 1`, header2: `Row ${row}, Cell 2`, header3: `Row ${row}, Cell 3`}));
<TableWithCellOnClick columns={columns} data={data}/>
```

```jsx
::title=Cell renderer
::description=Each cell in a column can provide a custom render function. In this example, the first column has a custom cell renderer that reverses its text and applies a `strong` tag.
const TableWithCellRenderer = withCellRenderer(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].CellRenderer = ({header1}) => <strong>{header1.split('').reverse().join('')}</strong>;
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithCellRenderer columns={columns} data={data}/>
```

```jsx
::title=Cell tooltip
::description=Each cell in a column can have a tooltip. In this example, the first column has a tooltip that displays its text, reversed. The header tooltip has a dark theme, while the body cell tooltips have a light theme.
const TableWithCellTooltip = withCellTooltip(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].tooltip = ({isHeader}, {header1} = {}) => ({text: (header1 || new Date().toLocaleString()).split('').reverse().join(''), theme: isHeader ? 'dark' : 'light'});
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithCellTooltip columns={columns} data={data}/>
```

```jsx
::title=Cell width
::description=Each cell in a column can have a fixed width. In this example, the cells in the first column are 100px, and the cells in the second column are 200px. The cells in the final column use the remaining space.
const TableWithCellWidth = withCellWidth(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].width = '100px';
columns[1].width = '200px';
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithCellWidth columns={columns} data={data}/>
```

```jsx
::title=Footer row
::description=A custom footer row can be provided.
const TableWithFooterRow = withFooterRow(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
const footerRow = <tr><td colSpan={3}><strong>I am a footer!</strong></td></tr>;
<TableWithFooterRow columns={columns} data={data} footerRow={footerRow}/>
```

```jsx
::title=Row className
::description=A className can be provided to a row element. In this example, the body rows are given the `h4` class.
const TableWithRowClassName = withRowClassName(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithRowClassName columns={columns} data={data} rowClassName={({isHeader}) => !isHeader && 'h4'}/>
```

### Row drawer

### Row link

### Sorting

## Writing Plugins

## Installation & Usage

`npm install babel-loader react-svg-loader --save-dev`

`npm install pivotal-ui --save`

```
import {Table, SortableTable, FlexTable, SortableFlexTable, AdvancedTable} from 'pivotal-ui/react/table';
```