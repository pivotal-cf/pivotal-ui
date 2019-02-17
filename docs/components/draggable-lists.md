---
title: Draggable list
reactPath: pivotal-ui/react/draggable-list
reactComponents:
- DraggableList
- DraggableListItem
---

```jsx
//title=Draggable
<DraggableList className="my-list-class" innerClassName="my-item-class">
  <DraggableListItem>
    Item 1
  </DraggableListItem>

  <DraggableListItem>
    Item 5
  </DraggableListItem>

  <DraggableListItem>
    Item 4
  </DraggableListItem>

  <DraggableListItem>
   Item 6
  </DraggableListItem>

  <DraggableListItem>
   Item 3
  </DraggableListItem>

  <DraggableListItem>
   Item 2
  </DraggableListItem>
</DraggableList>;
```

## DraggableList props

Property  | Required | Type | Default | Description
----------|----------|------|---------|------------
`children` | no | node | | Draggable items in list
`innerClassName` | no | string | | CSS class to apply to all items in list
`onDragEnd` | no | function | | Callback called with the item indices when a drag completes

## DraggableListItem props

_No props taken._