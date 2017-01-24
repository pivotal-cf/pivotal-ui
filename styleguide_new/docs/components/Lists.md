# Lists

## Description

## Props

## Basic Usage

### Breadcrumb
 
```jsx
<div>
    <BreadcrumbList>
      <ListItem><a href="/">Home</a></ListItem>
      <ListItem><a href="/react.html">React</a></ListItem>
      <ListItem className="current"><span>Lists</span></ListItem>
    </BreadcrumbList>
</div>
```

### Draggable

```jsx
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

### Group
```jsx
<div>
    <GroupList>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </GroupList>
    <br/>
    <GroupListInverse>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </GroupListInverse>
</div>
```

### Inline

```jsx
<div>
    <InlineList>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </InlineList>
</div>
```    

### Ordered

```jsx
<div>
    <OrderedList>
     <ListItem>Item 1</ListItem>
     <ListItem>Item 2</ListItem>
     <ListItem>Item 3</ListItem>
    </OrderedList>
</div>
```

### Steps

```jsx
<div>
    <StepList>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem className="current">Item 3</ListItem>
    </StepList>
</div>
```

### Unordered

```jsx
<div>
    <UnorderedList>
      <ListItem>feep</ListItem>
      <ListItem>fop</ListItem>
      <ListItem>meep</ListItem>
    </UnorderedList>
</div>
```