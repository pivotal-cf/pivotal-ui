---
title: Draggable List
menu: components
reactPath: pivotal-ui/react/draggable-list
reactComponents:
  - DraggableList
  - DraggableListItem
---

# Overview

# Examples

```jsx
::title=Draggable
<DraggableList className="my-list-class" innerClassName="my-item-class">
  <DraggableListItem>
    Get me out of here!
  </DraggableListItem>

  <DraggableListItem>
    LOL
  </DraggableListItem>

  <DraggableListItem>
    Can't stop
  </DraggableListItem>

  <DraggableListItem>
   Get me out of here!
  </DraggableListItem>

  <DraggableListItem>
   LOL
  </DraggableListItem>

  <DraggableListItem>
   Can't stop
  </DraggableListItem>
</DraggableList>
```

# Props

## DraggableList props

Property  | Required | Type | Default | Description
----------|----------|------|---------|------------
`children` | no | node | | Draggable items in list
`innerClassName` | no | string | | CSS class to apply to all items in list
`onDragEnd` | no | function | | Callback called with the item indices when a drag completes

## DraggableListItem props

_No props taken._