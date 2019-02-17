---
title: Text filter
cssPath: pivotal-ui/css/text-filter
reactPath: pivotal-ui/react/text-filter
reactComponents:
- TextFilter
---

The `TextFilter` component provides a filter text input and allows you to filter
and render a list of data based on the entered filter text.

```jsx
//title=Filter out data that does not contain the filter text
//description=Given a list of data, render only the items that contain the filter text.
const isOdd = (data, userInput) => {
  return data.filter(dataNum => {
    const dataStr = dataNum.toString();
    return dataStr.indexOf(userInput) !== -1;
  });
};
const renderData = dataItem => dataItem.map((item, i) => <li key={i}>{item}</li>);

<TextFilter {...{
  data: [1,2,3,4,5,6,7,8,9,10,1,5,15,124,215,345,4565,12],
  filter: isOdd,
  renderFilteredData: renderData
}}/>;
```

```jsx
//title=Filter out rows of a table based on filter text
//description=Given a list of objects, render table rows for the objects with a `name` property that contains the filter text.
const filter = (data, userInput) => {
  return data.filter(item => {
    return item.name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
  });
};
const renderData = filteredData => {
  return (<AdvancedTable {...{
    columns: [{attribute: 'name'}, {attribute: 'age'}],
    data: filteredData
  }}/>);
};

<TextFilter {...{
  data: [
    {name: 'Alice', age: 10},
    {name: 'Bob', age: 30},
    {name: 'Lucy', age: 100},
    {name: 'Ralf', age: 29},
    {name: 'Alfred', age: 88}
  ],
  emptyState: (<p id="wompwomp">No results</p>),
  filter,
  filterPlaceholderText: 'Enter a name...',
  renderFilteredData: renderData
}}/>;
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`data`     | true    | array | [] | array of the data to filter.
`emptyState` | false | node  |  | Node to render when there is no results due to filtering. If not provided `renderFilteredData` will be called with empty data.
`filter`   | true    | function| (data, filterText) => data | filter function takes in the data and the current filter text, applies transformations, and returns the filtered data.
`filterPlaceholderText` | false | string | 'Filter...' | Text to show where user input is accepted
`renderFilteredData` | true | function | () => null | callback to render the result of filtering on the data.
