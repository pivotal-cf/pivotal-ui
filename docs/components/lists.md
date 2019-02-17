---
title: Lists
cssPath: pivotal-ui/css/lists
reactPath: pivotal-ui/react/lists
reactComponents:
- BreadcrumbList
- InlineList
- ListItem
---

```jsx
//title=Breadcrumb
<BreadcrumbList>
  <ListItem><a href="#">Home</a></ListItem>
  <ListItem><a href="#react">React</a></ListItem>
  <ListItem className="current"><span>Lists</span></ListItem>
</BreadcrumbList>;
```

```html
//title=Breadcrumb CSS
//description=The `.list-breadcrumb` can be used to provide additional page navigation. Breadcrumbs use their own monospace font-family.
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

```jsx
//title=Inline
<InlineList>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</InlineList>;
```

## Props

### BreadcrumbList props

Property    | Required | Type | Default | Description
------------|----------|------|---------|------------
`className` | no | String  |       | Classname of the list
`divider`   | no | Boolean | false | Whether to include a divider between items
`unstyled`  | no | Boolean | false | Whether to style the list

### InlineList props

Property    | Required | Type | Default | Description
------------|----------|------|---------|------------
`className` | no | String  |       | Classname of the list
`divider`   | no | Boolean | false | Whether to include a divider between items
`unstyled`  | no | Boolean | false | Whether to style the list

### ListItem props

_All props passed directly to inner `li` element._