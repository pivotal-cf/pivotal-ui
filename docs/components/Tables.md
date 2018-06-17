---
title: Table
menu: components
cssPath: pivotal-ui/css/tables
reactPath: pivotal-ui/react/table
componentProps:
  Table:
    columns: Metadata about columns
    data: The data to display in the table
    plugProps: (undocumented)
    plugTag: (undocumented)
    table: (undocumented)
    tableTag: (undocumented)
    tbody: (undocumented)
    tbodyTag: (undocumented)
    td: (undocumented)
    tdTag: (undocumented)
    tfoot: (undocumented)
    tfootTag: (undocumented)
    th: (undocumented)
    thTag: (undocumented)
    thead: (undocumented)
    theadTag: (undocumented)
    tr: (undocumented)
    trTag: (undocumented)
  FlexTable:
    _extends: Table
  SortableTable:
    _extends: Table
  SortableFlexTable:
    _extends: Table
  AdvancedTable:
    _extends: Table
    footerRow: Anything that evaluates into HTML. Only valid when used with `withFooterRow` plugin.
    rowClassName: Function with input `({rowDatum, isHeader, rowIndex})` and outputs a string. Only valid when used with `withRowClassName` plugin.
    rowDrawer: Function with input `(rowIndex)`. Only valid when used with `withRowDrawer` plugin.
    rowLink: Object comprising of `{link, onClick}`. `link` is a function whose input is `{rowDatum}` and outputs an `href`. `onClick` is a function that is executed when the row is clicked. Only valid with `withRowLink` plugin.
---

# Overview

The `Table` component is a robust component that offers a styled table. If the rows change, the content on the page will update.

Several enhanced Table components are also available:
* **SortableTable**: rows can be sorted ascending or descending by a chosen column.
* **FlexTable**: uses `div` tags to compose a table rather than traditional HTML tags.
* **SortableFlexTable**: a SortableTable that is composed of `div` tags.
* **AdvancedTable**: offers many additional features for advanced customization.

Tables can also be composed with any subset of the features offered by the **AdvancedTable**.

# Examples

```jsx
::title=Basic HTML Table with implicit columns
::description=When no `columns` prop is given, the table will automatically determine the columns and column headers based on the keys of `data`.
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
<Table data={data}/>
```

```jsx
::title=Basic HTML Table with simple columns
::description=When the `columns` prop contains strings, the associated data will be shown in the data in the order provided.
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
const columns = ['title', 'instances'];
<Table columns={columns} data={data}/>
```

```jsx
::title=Sortable HTML Table with explicit columns
::description=The `columns` prop defines the properties of each column. This allows for more complex table behavior, such as sorting.
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
::description=No borders to rows using class .table-no-borders on the table element.
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<Table columns={columns} data={data} className="table-no-borders"/>
```

# Using Plugins

The base Table component has a limited feature-set. Users can compose Tables with additional features by using plugins.

Here are the plugins provided by Pivotal UI:
* withFlex
* withCellClassName
* withCellEllipsis
* withCellOnClick
* withCellRenderer
* withRenderTdChildren
* withCellTooltip
* withCellWidth
* withFooterRow
* withRowClassName
* withRowDrawer
* withRowLink
* withSorting
* withScrollableTbody

A composed table can be created by composing one or more of the above plugins:

```
import {withFlex, withSorting, Table} from 'pivotal-ui/react/table';
const ComposedTable = withFlex(withSorting(Table));
ReactDOM.render(<ComposedTable columns={columns} data={data}/>;
```

Or with `lodash.flow`:
```
import flow from 'lodash.flow';
const ComposedTable = flow(withFlex, withSorting)(Table);
```

The following examples demonstrate the individual usage of each of the above plugins.

```jsx
::title=Flex
::description=Flex tables are composed of `div` tags.
const TableWithFlex = withFlex(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithFlex columns={columns} data={data}/>
```

```jsx
::title=Cell links (requires FlexTable)
::description=Each cell in a column of a FlexTable can be an `a` tag. In this example, the first column links to the top of this section, and the last column links to the top of this page.
const FlexTableWithCellLink = withCellLink(FlexTable);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].link = () => '#using-plugins';
columns[2].link = () => '#tables';
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
::title=Cell ellipsis (requires FlexTable)
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
::description=Each cell in a column can provide a custom component to render its children. In this example, the first column has a custom cell renderer component that reverses its text and applies a `strong` tag. To simply return some custom children for a cell, rather than use a whole custom component, consider using `withRenderTdChildren` instead of `withCellRenderer`. If an inline function is passed as a `CellRenderer`, it will unmount and remount the children of a cell whenever the table is given new props, rather than simply rerendering the children.
class CustomCellRenderer extends React.Component {
  render() {
    const {header1} = this.props;
    return <strong>{header1.split('').reverse().join('')}</strong>;
  }
}
const TableWithCellRenderer = withCellRenderer(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].CellRenderer = CustomCellRenderer;
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithCellRenderer columns={columns} data={data}/>
```

```jsx
::title=Custom renderTdChildren function
::description=Each cell in a column can provide a custom render function. In this example, the first column has a custom child render function that capitalizes its text.
const TableWithRenderTdChildren = withRenderTdChildren(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].renderTdChildren = rowDatum => rowDatum.header1.toUpperCase();
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithRenderTdChildren columns={columns} data={data}/>
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
::description=Each cell in a column can have a fixed width. In this example, the cells in the first column are 100px wide, and the cells in the second column are 200px. The cells in the final column use the remaining space.
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

```jsx
::title=Row drawer (requires FlexTable)
::description=When body rows of a FlexTable are clicked, drawer content is revealed.
const TableWithRowDrawer = withRowDrawer(FlexTable);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(row => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3', drawerContent: `Drawer content for Row ${row}.`}));
const rowDrawer = i => (
  <div className="table-drawer">
    <div className="table-drawer-content">
      <div className="table-drawer-container phxl">
        {data[i].drawerContent}
      </div>
    </div>
  </div>
);
<TableWithRowDrawer columns={columns} data={data} rowDrawer={rowDrawer}/>
```

```jsx
::title=Row links (requires FlexTable)
::description=An entire row of a FlexTable can be rendered as an `a` tag. In this example, clicking the first body row links to the top of this section.
const TableWithRowLink = withRowLink(FlexTable);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2].map(row => ({header1: `Row ${row}, Cell 1`, header2: `Row ${row}, Cell 2`, header3: `Row ${row}, Cell 3`}));
<TableWithRowLink columns={columns} data={data} rowLink={{link: ({header1}) => header1 === 'Row 1, Cell 1' && '#using-plugins'}}/>
```

```jsx
::title=Sorting
::description=A table can be sorted ascending or descending by a given column by clicking on that column's header.
const TableWithSorting = withSorting(Table);
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
<TableWithSorting columns={columns} data={data} defaultSort="instances"/>
```

```jsx
::title=Scrollable table body (requires FlexTable)
::description=When `scrollable` and `tbodyHeight="<some height>"`, the table body will scroll when that height is exceeded.
const ScrollableTable = withScrollableTbody(FlexTable);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(row => ({header1: `Row ${row}, Cell 1`, header2: `Row ${row}, Cell 2`, header3: `Row ${row}, Cell 3`}));
<ScrollableTable scrollable tbodyHeight='200px' columns={columns} data={data} rowLink={{link: ({header1}) => header1 === 'Row 1, Cell 1' && '#using-plugins'}}/>
```

# Writing Plugins

The Table component renders the following DOM elements: `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`.

Table plugins provide the ability to:

1. inspect and inject new props
1. use a custom DOM element or React component in place of one of the above standard table elements

In order to write a new plugin:

1. Create a new file that imports `TablePlugin` from `pivotal-ui/react/table`.
  ```
  import {TablePlugin} from 'pivotal-ui/react/table';
  ```
2. Export a function that takes a `Table` argument:
  ```
  export function withCellColor(Table) { /* ... */ }
  ```
3. Inside the function, return a class that extends `TablePlugin`:
  ```
  return class TableWithCellColor extends TablePlugin { /* ... */}
  ```
4. In the class, define a `render` function that returns the result of calling `this.renderTable` with the `Table` argument, and an Object:
  ```
  render() {
    return this.renderTable(Table, { /* ... */ }
  }
  ```

The Object can contain any of the following keys:
* Tag keys: `tableTag`, `theadTag`, `tbodyTag`, `tfootTag`, `trTag`, `thTag`, `tdTag`
* Prop keys: `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`

The value should be a callback.

For Tag callbacks, relevant `context` is passed as an argument.
The callback should return a new DOM element as a String or a React Component to be used in place of the standard HTML element.

For Prop callbacks, the first argument is the `props` that the element will receive. The second argument is relevant `context`.
The callback should return any new props that the element should be rendered with. They will generally overwrite any pre-existing props. The `className` and `style` props will be merged with the old values.

```jsx
::title=Table with cell color
::description=Each column has a different color: red, green, and blue.
function withCellColor(Table) {
  return class TableWithCellColor extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        td: (props, {column: {color}}) => ({style: {color}})
      });
    }
  }
}

const TableWithCellColor = withCellColor(Table);
const columns = [1, 2, 3].map(n => ({attribute: `header${n}`, displayName: `Header ${n}`}));
columns[0].color = 'red';
columns[1].color = 'green';
columns[2].color = 'blue';
const data = [1, 2].map(() => ({header1: 'Cell 1', header2: 'Cell 2', header3: 'Cell 3'}));
<TableWithCellColor columns={columns} data={data}/>;
```

For additional examples, [review the plugins that Pivotal UI provides](https://github.com/pivotal-cf/pivotal-ui/tree/master/src/react/table/plugins).



# Column Props

Property         | Required | Type | Default | Description
-----------------|----------|------|---------|------------
attribute        | yes      | String    |       | The key to use in the data prop to get data for that column
displayName      | no       | String    |       | The text in the TableHeader for that column
link             | no       | Function  |       | The link destination. Only valid when used with `withCellLink` plugin.
className        | no       | String or Function | | The class(es) to apply to a column. If this is a function, the inputs are `(rowDatum, isHeader)`. Only valid when used with `withCellClassName` plugin.
ellipsis         | no       | Boolean   | false | Ellipsify overflow text. Only valid when used with `withCellEllipsis` plugin.
onClick          | no       | Function  |       | The function to execute when the cell is clicked. The inputs to this function are `(event, rowDatum)`. Only valid when used with `withCellOnClick` plugin.
CellRenderer     | no       | React component  |       | Component to use to render cell children. Rendered with `{...rowDatum}` as props. Only valid when used with `withCellRenderer` plugin.
renderTdChildren | no       | Function  |       | Function which will be called to render custom cell children. Called with `rowDatum` as its argument. Only valid when used with `withRenderTdChildren` plugin.
tooltip          | no       | Function  |       | Function whose inputs are `({isHeader}, rowDatum)` and should output an object containing `{text, size, theme, showIcon}`. `text` and `size` are used in the [Tooltip](/tooltips#tooltips) Component. `theme` is a prop of the [OverlayTrigger](/tooltips#overlay-triggers) Component. `showIcon` determines if the info icon is shown. Only valid when used with `withCellTooltip` plugin.
width            | no       | String    |       | Can be any valid CSS `width` input. Only valid when used with `withCellWidth` plugin.
sortable         | no       | Boolean   |       | Determines whether a column is sortable. Only valid when used with `withSorting` plugin.
sortBy           | no       | Function  |       | Function that determines sort order. The input is the cell data. Only valid when used with `withSorting` plugin and if `sortable` is true.

# Table Modifiers

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