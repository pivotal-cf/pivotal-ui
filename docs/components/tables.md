---
title: Tables
cssPath: pivotal-ui/css/tables
reactPath: pivotal-ui/react/table
reactComponents:
- Table
- Caption
- Thead
- Tbody
- Tfoot
- Tr
- Th
- Td
- TrHeaderForDrawers
- TrWithoutDrawer
- TrWithDrawer
- TableSelectable
- TrForBody
- TrHeader
---

The `Table` component is a component that offers a styled table.

```jsx
//title=Basic HTML Table
//description=Use this table like native html tables.
<Table>
  <Caption>Some table</Caption>
  <Thead>
    <Tr>
      <Th>A column header</Th>
      <Th>Another column header</Th>
      <Th>One more column header</Th>
      <Th>Last column header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>The</Td>
      <Td>very</Td>
      <Td>first</Td>
      <Td>row</Td>
    </Tr>
    <Tr>
      <Td>Another</Td>
      <Td>very</Td>
      <Td>cool</Td>
      <Td>row</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Td>A</Td>
      <Td>place</Td>
      <Td>for</Td>
      <Td>totals</Td>
    </Tr>
  </Tfoot>
</Table>
```

## Table modifiers

Class                         | Description
------------------------------| -----------------
`.pui-table`                  | Applied to the table element to define the style standards.
`.pui-table--tr-hover`        | Applied to the starting table element to add the hover effect on table body rows.
`.pui-table--td-hover`        | Applied to the starting table element to add the hover effect on table body cells.
`.pui-table--h-borders-none`  | Removes inner horizontal borders from the table body rows.
`.pui-table--ext-borders-none`| Removes external borders for the entire table when applied to the .table element.
`.pui-table--borders-none`    | Removes all borders, internal and external, when applied to the .table element.Removes all borders, internal and external, when applied to the .table element.
`.pui-table--scrollable`      | Makes the table body scrollable in the y direction.

```jsx
//title=Table row hover
//description=Adding a `pui-table--tr-hover` className to the table will change the background color to the table body rows on hover.
<Table className="pui-table--tr-hover">
  <Caption>Some table</Caption>
  <Thead>
    <Tr>
      <Th>A column header</Th>
      <Th>Another column header</Th>
      <Th>One more column header</Th>
      <Th>Last column header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>The</Td>
      <Td>very</Td>
      <Td>first</Td>
      <Td>row</Td>
    </Tr>
    <Tr>
      <Td>Hover</Td>
      <Td>over</Td>
      <Td>me</Td>
      <Td>!</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Td>A</Td>
      <Td>place</Td>
      <Td>for</Td>
      <Td>totals</Td>
    </Tr>
  </Tfoot>
</Table>
```

```jsx
//title=Table cell hover
//description=Adding `pui-table--td-hover` to the table will allow the user to highlight individual cells in the table body.
<Table className="pui-table--td-hover">
  <Caption>Some table</Caption>
  <Thead>
    <Tr>
      <Th>A column header</Th>
      <Th>Another column header</Th>
      <Th>One more column header</Th>
      <Th>Last column header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>The</Td>
      <Td>very</Td>
      <Td>first</Td>
      <Td>row</Td>
    </Tr>
    <Tr>
      <Td>Hover</Td>
      <Td>over</Td>
      <Td>me</Td>
      <Td>!</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Td>A</Td>
      <Td>place</Td>
      <Td>for</Td>
      <Td>totals</Td>
    </Tr>
  </Tfoot>
</Table>
```

```jsx
//title=No horizontal borders
//description=Remove all of the internal horizontal borders with class `pui-table--h-borders-none` on the table element.
<Table className="pui-table--h-borders-none">
  <Caption>Some table</Caption>
  <Thead>
    <Tr>
      <Th>A column header</Th>
      <Th>Another column header</Th>
      <Th>One more column header</Th>
      <Th>Last column header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>The</Td>
      <Td>very</Td>
      <Td>first</Td>
      <Td>row</Td>
    </Tr>
    <Tr>
      <Td>Hover</Td>
      <Td>over</Td>
      <Td>me</Td>
      <Td>!</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Td>A</Td>
      <Td>place</Td>
      <Td>for</Td>
      <Td>totals</Td>
    </Tr>
  </Tfoot>
</Table>
```

```jsx
//title=No external borders
//description=No external borders to rows using class `pui-table--ext-borders-none` on the table element.
<Table className="pui-table--ext-borders-none">
  <Caption>Some table</Caption>
  <Thead>
    <Tr>
      <Th>A column header</Th>
      <Th>Another column header</Th>
      <Th>One more column header</Th>
      <Th>Last column header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>The</Td>
      <Td>very</Td>
      <Td>first</Td>
      <Td>row</Td>
    </Tr>
    <Tr>
      <Td>Hover</Td>
      <Td>over</Td>
      <Td>me</Td>
      <Td>!</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Td>A</Td>
      <Td>place</Td>
      <Td>for</Td>
      <Td>totals</Td>
    </Tr>
  </Tfoot>
</Table>
```

```jsx
//title=No borders
//description=No borders to rows using class `pui-table--borders-none` on the table element.
<Table className="pui-table--borders-none">
  <Caption>Some table</Caption>
  <Thead>
    <Tr>
      <Th>A column header</Th>
      <Th>Another column header</Th>
      <Th>One more column header</Th>
      <Th>Last column header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>The</Td>
      <Td>very</Td>
      <Td>first</Td>
      <Td>row</Td>
    </Tr>
    <Tr>
      <Td>Hover</Td>
      <Td>over</Td>
      <Td>me</Td>
      <Td>!</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Td>A</Td>
      <Td>place</Td>
      <Td>for</Td>
      <Td>totals</Td>
    </Tr>
  </Tfoot>
</Table>
```

```jsx
//title=Scrollable table body
//description=Add a `pui-table--scrollable` class to the table to make the table body scrollable.
<Table className="pui-table--scrollable">
  <Thead>
    <Tr>
      <Th>Header 1</Th>
      <Th>Header 2</Th>
      <Th>Header 3</Th>
    </Tr>
  </Thead>
  <Tbody>
    {
      function() {
        const rows = [];
        for (let i = 0; i < 15; i++) {
          rows.push(
            <Tr key={i}>
              <Td>{`Row ${i}, Cell 1`}</Td>
              <Td>{`Row ${i}, Cell 2`}</Td>
              <Td>{`Row ${i}, Cell 3`}</Td>
            </Tr>
          )
        }
        return rows;
      }()
    }
  </Tbody>
</Table>
```

### Table Examples

```jsx
//title=Sortable Table Example
const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const dessertOptions = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

const ASCENDING = Symbol('asc');
const DESCENDING = Symbol('desc');
const NONE = Symbol('none');
const sortIconMap = {
  [ASCENDING]: 'chevron_up',
  [DESCENDING]: 'chevron_down',
  [NONE]: 'select_chevrons'
};

const ariaSortMap = {
  [ASCENDING]: 'ascending',
  [DESCENDING]: 'descending',
  [NONE]: 'none'
};

const sortStateMap = {
  [ASCENDING]: DESCENDING,
  [DESCENDING]: NONE,
  [NONE]: ASCENDING
};

const compareOptions = (option1, option2, sortCol) => {
  if (option2[sortCol] > option1[sortCol]) return 1;
  if (option2[sortCol] < option1[sortCol]) return -1;
  if (option2[sortCol] === option1[sortCol]) return 0
};

class SortableTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortDirection: NONE,
      sortCol: 'name'
    }
  }

  render() {
    const {sortDirection, sortCol} = this.state;
    const sortIconSrc = sortIconMap[sortDirection];
    const nextSortState = sortStateMap[sortDirection];

    const setSort = (col) => {
      if (sortCol === col) {
        this.setState({sortDirection: nextSortState});
      } else {
        this.setState({sortDirection: ASCENDING, sortCol: col});
      }
    };

    return (
      <Table>
        <Caption>Dessert Options</Caption>
        <Thead>
          <Tr>
            <Th className="pan" aria-sort={sortCol === 'name' ? ariaSortMap[sortDirection] : null}>
              <button onClick={() => setSort('name')}>
                <Grid justifyContent="space-between">
                  <FlexCol>Name</FlexCol>
                {sortCol === 'name' && <Icon className="float-right" src={sortIconSrc}/>}
                </Grid>
              </button>
            </Th>
            <Th className="pan" aria-sort={sortCol === 'calories' ? ariaSortMap[sortDirection] : null}>
              <button onClick={() => setSort('calories')}>
                <Grid justifyContent="space-between">
                  <FlexCol>Calories</FlexCol>
                {sortCol === 'calories' && <Icon className="float-right" src={sortIconSrc}/>}
                </Grid>
              </button>
            </Th>
            <Th className="pan" aria-sort={sortCol === 'fat' ? ariaSortMap[sortDirection] : null}>
              <button onClick={() => setSort('fat')}>
                <Grid justifyContent="space-between">
                  <FlexCol>Fat</FlexCol>
                {sortCol === 'fat' && <Icon className="float-right" src={sortIconSrc}/>}
                </Grid>
              </button>
            </Th>
            <Th className="pan" aria-sort={sortCol === 'carbs' ? ariaSortMap[sortDirection] : null}>
              <button onClick={() => setSort('carbs')}>
                <Grid justifyContent="space-between">
                  <FlexCol>Carbs</FlexCol>
                {sortCol === 'carbs' && <Icon className="float-right" src={sortIconSrc}/>}
                </Grid>
              </button>
            </Th>
            <Th className="pan" aria-sort={sortCol === 'protein' ? ariaSortMap[sortDirection] : null}>
              <button onClick={() => setSort('protein')}>
                <Grid justifyContent="space-between">
                  <FlexCol>Protein</FlexCol>
                {sortCol === 'protein' && <Icon className="float-right" src={sortIconSrc}/>}
                </Grid>
              </button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            [...dessertOptions]
              .sort((option1, option2) => {
                if (sortDirection === NONE) return 0;
                let order = compareOptions(option1, option2, sortCol);
                if (sortDirection === DESCENDING) return order * -1;
                return order;
              })
              .map(({name, calories, fat, carbs, protein}) => (
                <Tr key={name}>
                  <Td>{name}</Td>
                  <Td>{calories}</Td>
                  <Td>{fat}</Td>
                  <Td>{carbs}</Td>
                  <Td>{protein}</Td>
                </Tr>
              ))
          }
        </Tbody>
      </Table>
    )
  };
}

<SortableTable/>
```

```jsx
//title=Link Cell Table Example
//description=Table with links as cells
<Table>
  <Thead>
    <Tr>
      <Th>Header 1</Th>
      <Th>Header 2</Th>
      <Th>Header 3</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td><a href="/components/tables/#table-modifiers">Link to Modifiers</a></Td>
      <Td>Cell 2</Td>
      <Td><a href="/components/tables/#props">Link to Props</a></Td>
    </Tr>
    <Tr>
      <Td><a href="/components/tables/#table-modifiers">Link to Modifiers</a></Td>
      <Td>Cell 2</Td>
      <Td><a href="/components/tables/#props">Link to Props</a></Td>
    </Tr>
  </Tbody>
</Table>
```

```jsx
//title=Cell with className Example
//description=Apply classNames directly on the components
<Table>
  <Thead>
    <Tr>
      <Th className="h4">Header 1</Th>
      <Th className="width-50">Header 2</Th>
      <Th>Header 3</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td className="h4">Cell 1</Td>
      <Td className="type-ellipsis">CellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCellCell</Td>
      <Td>Cell 3</Td>
    </Tr>
    <Tr className="h4">
      <Td>Cell 1</Td>
      <Td>Cell 2</Td>
      <Td>Cell 3</Td>
    </Tr>
  </Tbody>
</Table>
```

```jsx
//title=Cell with onClick Example
//description=To apply an onClick to a table element, provide an interactive element as a child, add the onClick to that element, and provide a visual indication that the cell is interactive for accessibility
<Table>
  <Thead>
    <Tr>
      <Th className="pan"><button onClick={() => alert('Header 1 clicked')}>Header 1</button></Th>
      <Th>Header 2</Th>
      <Th>Header 3</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Th>Row 1</Th>
      <Td className="pan"><button onClick={() => alert('Row1, Cell 1 clicked')}>Cell 1</button></Td>
      <Td>Cell 2</Td>
    </Tr>
    <Tr>
      <Th>Row 2</Th>
      <Td>Cell 1</Td>
      <Td>Cell 2</Td>
    </Tr>
  </Tbody>
</Table>
```


```jsx
//title=Cell Tooltip Example
//description=To add a tooltip to a table element, render the TooltipTrigger component. Note that cells with TooltipTriggers cannot be `type-ellipsis` or the tooltip will be cut off.
<Table>
  <Thead>
    <Tr>
      <Th>Header 1<TooltipTrigger tooltip="Some information about Header 1"><Icon src="info" verticalAlign="baseline"/></TooltipTrigger></Th>
      <Th>Header 2</Th>
      <Th>Header 3</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Row 1, Cell 1</Td>
      <Td>Row 1, Cell 2</Td>
      <Td>Row 1, Cell 3</Td>
    </Tr>
    <Tr>
      <Td>Row 2, Cell 1</Td>
      <Td>Row 2, Cell 2</Td>
      <Td>Row 2, Cell 3</Td>
    </Tr>
  </Tbody>
</Table>
```

```jsx
//title=Cell Width Example
//description=To specify the width of the columns use one of the `width-{n}` helper classes on the table header or provide your own class to define the widths.
<Table>
  <Thead>
    <Tr>
      <Th className="width-30">Header 1</Th>
      <Th className="width-60">Header 2</Th>
      <Th className="width-10">Header 3</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Row 1, Cell 1</Td>
      <Td>Row 1, Cell 2</Td>
      <Td>Row 1, Cell 3</Td>
    </Tr>
    <Tr>
      <Td>Row 2, Cell 1</Td>
      <Td>Row 2, Cell 2</Td>
      <Td>Row 2, Cell 3</Td>
    </Tr>
  </Tbody>
</Table>
```

## Table with Drawers

```jsx
//title=Expandable table rows
//description=When the chevron is clicked, the drawer content is revealed. Provide the `ariaLabelCollapsed` and `ariaLabelExpanded` props to give a more descriptive label to assistive tech when the drawer is collapsed or expanded.
<Table>
  <Thead>
    <TrHeaderForDrawers>
      <Th>Header 1</Th>
      <Th>Header 2</Th>
      <Th>Header 3</Th>
    </TrHeaderForDrawers>
  </Thead>
  <Tbody>
    <TrWithDrawer
      ariaLabelCollapsed="Reveal more content"
      ariaLabelExpanded="Hide more content"
      buttonClassName="icon"
      drawerContent={<span className="paxl">Row 1: More content</span>}
    >
      <Td>Row 1, Cell 1</Td>
      <Td>Row 1, Cell 2</Td>
      <Td>Row 1, Cell 3</Td>
    </TrWithDrawer>
    <TrWithDrawer
      ariaLabelCollapsed="Reveal more content"
      ariaLabelExpanded="Hide more content"
      drawerContent={<span className="paxl">Row 2: More content</span>}
    >
      <Td>Row 2, Cell 1</Td>
      <Td>Row 2, Cell 2</Td>
      <Td>Row 2, Cell 3</Td>
    </TrWithDrawer>
  </Tbody>
</Table>
```

## Selectable Table

```jsx
//title=Selectable table
//description=A callback is triggered when the selection changes, the callback receives an object containing the identifiers of the currently selected rows 


class TableSelectableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: {}
    };
  }


  render() {

    const selectionAsArray = Object.keys(this.state.selection);
    return (
        <>
        <TableSelectable identifiers={['first-row', 'second-row']} onSelectionChange={(selection) => this.setState({selection})}>
          <Thead>
            <TrHeader>
              <Th>Header 1</Th>
              <Th>Header 2</Th>
              <Th>Header 3</Th>
            </TrHeader>
          </Thead>
          <Tbody>
            <TrForBody
              identifier={'first-row'}
            >
              <Td>Row 1, Cell 1</Td>
              <Td>Row 1, Cell 2</Td>
              <Td>Row 1, Cell 3</Td>
            </TrForBody>
            <TrForBody
              identifier={'second-row'}
            >
              <Td>Row 2, Cell 1</Td>
              <Td>Row 2, Cell 2</Td>
              <Td>Row 2, Cell 3</Td>
            </TrForBody>
          </Tbody>
        </TableSelectable>
        <p> Number selected: {selectionAsArray.length}, Rows selected: {selectionAsArray.join(', ')} </p>
        </>
    );
  }
}

<TableSelectableExample/>
```

```jsx
//title=Selectable Table with drawer
//description=When the TrWithDrawer or TrWithoutDrawer components are within a TableSelectable they become selectable.
<TableSelectable identifiers={['first-row', 'second-row', 'fourth-row']} onSelectionChange={() => {}}>
  <Thead>
    <TrHeaderForDrawers>
      <Th>Header 1</Th>
      <Th>Header 2</Th>
      <Th>Header 3</Th>
    </TrHeaderForDrawers>
  </Thead>
  <Tbody>
    <TrWithDrawer
      identifier={'first-row'}
      ariaLabelCollapsed="Reveal more content"
      ariaLabelExpanded="Hide more content"
      drawerContent={<span className="paxl">Row 1: More content</span>}
    >
      <Td>Row 1, Cell 1</Td>
      <Td>Row 1, Cell 2</Td>
      <Td>Row 1, Cell 3</Td>
    </TrWithDrawer>
    <TrWithDrawer
      identifier={'second-row'}
      ariaLabelCollapsed="Reveal more content"
      ariaLabelExpanded="Hide more content"
      drawerContent={<span className="paxl">Row 2: More content</span>}
    >
      <Td>Row 2, Cell 1</Td>
      <Td>Row 2, Cell 2</Td>
      <Td>Row 2, Cell 3</Td>
    </TrWithDrawer>
    <TrWithDrawer
      notSelectable
      ariaLabelCollapsed="Reveal more content"
      ariaLabelExpanded="Hide more content"
      drawerContent={<span className="paxl">but it still has a drawer</span>}
    >
      <Td>This row</Td>
      <Td>is not</Td>
      <Td>selectable</Td>
    </TrWithDrawer>

    <TrWithoutDrawer
      identifier={'fourth-row'}
    >
      <Td>This row</Td>
      <Td>does not</Td>
      <Td>have a drawer</Td>
    </TrWithoutDrawer>
  </Tbody>
</TableSelectable>
```

## Props

### Th props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`scope` | no | oneOf['col', 'row'] | 'col' | Indicates if the table header is for the row or the column.

### TrHeader props

Property            | Required |  Type   | Default | Description
--------------------|----------|---------|---------|------------
`withoutSelectAll`  | no       | boolean |  false  | Removes the checkbox when the Tr is within a TableSelectable

### Tr props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`scope` | no | oneOf['col', 'row'] | 'col' | Indicates if the table header is for the row or the column.

### TableSelectable props

Property            | Required | Type  | Default | Description
--------------------|----------|-------|---------|------------
`identifiers`       | yes      | Array |         | Array of Strings used to select all selectable rows. (this should contain all identifiers passed to each selectable row) 
`onSelectionChange` | yes      | func  |         | Callback for when any or all are selected or deselected

### TrWithDrawer props

Property            | Required | Type    | Default | Description
--------------------|----------|---------|---------|------------
`ariaLabelCollapsed`| yes      | String  |         | Aria label when the drawer is collapsed
`ariaLabelExpanded` | yes      | String  |         | Aria label when the drawer is expanded
`drawerContent`     | no       | node    |         | Content to render in the expanded drawer
`onExpand`          | no       | func    |         | Callback for when the drawer is expanded
`children`          | no       | node    |         | Content to render in the table row
`identifier`        | no       | String  |         | String used by this row to report when the checkbox is toggled (this should match one of the identifiers passed to the TableSelectable)
`notSelectable`     | no       | boolean |  false  | Removes the checkbox when the Tr is within a TableSelectable

### TrForBody props

Property            | Required | Type    | Default | Description
--------------------|----------|---------|---------|------------
`identifier`        | no       | String  |         | String used by this row to report when the checkbox is toggled (this should match one of the identifiers passed to the TableSelectable)
`notSelectable`     | no       | boolean |  false  | Removes the checkbox when the Tr is within a TableSelectable
