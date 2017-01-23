# Tables

## Description

## Props

## Basic Usage

```jsx_example
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