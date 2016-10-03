/*doc
---
title: Draggable
name: 05_list_draggable_react
parent: list_react
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-draggable-list --save
</code>

Require the subcomponents:

```
var DraggableList = require('pui-react-draggable-list').DraggableList;
var DraggableListItem = require('pui-react-draggable-list').DraggableListItem;
```
Creates a draggable list.

The property `onDragEnd` is a callback when a drag event has completed. Use this
if you need to make an API call to update the order of some elements.

```jsx_example
var dragEndCallback = function(data) {
  alert('New item indices order: ' + data);
};
```

```react_example
<DraggableList onDragEnd={dragEndCallback} className="my-list-class" innerClassName="my-item-class">
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
*/
