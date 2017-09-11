# Lists

## Subcomponents

- [Breadcrumb Lists](#breadcrumb-lists)
- [Draggable Lists](#draggable-lists)
- [Inline Lists](#inline-lists)
- [Ordered Lists](#ordered-lists)
- [Unordered Lists](#unordered-lists)

# Breadcrumb Lists

## Example

```jsx
::title=Breadcrumb
<div>
    <BreadcrumbList>
      <ListItem><a href="/">Home</a></ListItem>
      <ListItem><a href="/react.html">React</a></ListItem>
      <ListItem className="current"><span>Lists</span></ListItem>
    </BreadcrumbList>
</div>
```

```html
::title=Breadcrumb CSS
::description=The `.list-breadcrumb` can be used to provide additional page navigation. Breadcrumbs use their own monospace font-family.
<ul class="list-breadcrumb">
  <li>
    <a href="http://google.com">Parent</a>
  </li>
  <li>
    <a href="http://google.com">Child</a>
  </li>
  <li class="current">
    <span>Current Page</span>
  </li>
</ul>
```

# Draggable Lists

## Example

```jsx
::title=Draggable
<div>
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
</div>
```

# Inline Lists

## Example

```jsx
::title=Inline
<div>
    <InlineList>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </InlineList>
</div>
```    

# Ordered Lists

## Examples

```jsx
::title=Ordered
<div>
    <OrderedList>
     <ListItem>Item 1</ListItem>
     <ListItem>Item 2</ListItem>
     <ListItem>Item 3</ListItem>
    </OrderedList>
</div>
```

# Unordered Lists

## Example

```jsx
::title=Unordered
<div>
    <UnorderedList>
      <ListItem>feep</ListItem>
      <ListItem>fop</ListItem>
      <ListItem>meep</ListItem>
    </UnorderedList>
</div>
```

```jsx
::title=Unordered unstyled list
<div>
    <UnorderedList unstyled>
      <ListItem>feep</ListItem>
      <ListItem>fop</ListItem>
      <ListItem>meep</ListItem>
    </UnorderedList>
</div>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {BreadcrumbList, InlineList, ListItem, OrderedList, UnorderedList} from 'pivotal-ui/react/lists';`

#### CSS Only
`npm install pivotal-ui --save`

`import * as Lists from 'pivotal-ui/css/lists';`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
className | no | String  |       | Classname of the list
unstyled  | no | Boolean | false | Whether to style the list
divider   | no | Boolean | false | Whether to include a divider between items
