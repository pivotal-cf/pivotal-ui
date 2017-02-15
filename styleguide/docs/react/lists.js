/*doc
---
title: Lists
name: list_react
categories:
- react_base_lists
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-lists --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
className | no | String  |       | Classname of the list
unstyled  | no | Boolean | false | Whether to style the list
divider   | no | Boolean | false | Whether to include a divider between items

## Breadcrumb

Import the subcomponents:

```
import {BreadcrumbList, ListItem} from 'pui-react-lists';
```

```react_example
<BreadcrumbList>
  <ListItem><a href="/">Home</a></ListItem>
  <ListItem><a href="/react.html">React</a></ListItem>
  <ListItem className="current"><span>Lists</span></ListItem>
</BreadcrumbList>
```

## Inline

Import the subcomponents:

```
import {InlineList, ListItem} from 'pui-react-lists';
```

```react_example_table
<InlineList>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</InlineList>
```

```react_example_table
<InlineList divider>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</InlineList>
```

## Ordered

Import the subcomponents:

```
import {OrderedList, ListItem} from 'pui-react-lists';
```

```react_example_table
<OrderedList>
 <ListItem>Item 1</ListItem>
 <ListItem>Item 2</ListItem>
 <ListItem>Item 3</ListItem>
</OrderedList>
```

```react_example_table
<OrderedList unstyled>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</OrderedList>
```

## Unordered

Import the subcomponents:

```
import {UnorderedList, ListItem} from 'pui-react-lists';
```

```react_example_table
<UnorderedList>
  <ListItem>feep</ListItem>
  <ListItem>fop</ListItem>
  <ListItem>meep</ListItem>
</UnorderedList>
```

```react_example_table
<UnorderedList unstyled>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</UnorderedList>
```

*/

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
  <DraggableListItem>Get me out of here!</DraggableListItem>
  <DraggableListItem>LOL</DraggableListItem>
  <DraggableListItem>Can't stop</DraggableListItem>
  <DraggableListItem>Get me out of here!</DraggableListItem>
  <DraggableListItem>LOL</DraggableListItem>
  <DraggableListItem>Can't stop</DraggableListItem>
</DraggableList>
```
*/
