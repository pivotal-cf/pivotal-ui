/*doc
---
title: Draggable
name: 05_list_draggable_react
parent: list_react
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-draggable-list --save

<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader svg-react-loader --save-dev
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
onDragEnd      | no | Function | | Callback when a drag event has completed
innerClassName | no | String   | | Use this to specify the classname of the inner div

## Basic usage

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

Import the subcomponents:

```
import {DraggableList} from 'pui-react-draggable-list';
import {DraggableListItem} from 'pui-react-draggable-list';
```

Creates a draggable list.

The property `onDragEnd` is a callback when a drag event has completed. Use this
if you need to make an API call to update the order of some elements.

```jsx_example
const dragEndCallback = data => alert('New item indices order: ' + data);
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
