---
title: Lists
menu: components
cssPath: pivotal-ui/css/lists
reactPath: pivotal-ui/react/lists
componentProps:
  BreadcrumbList:
    className: Classname of the list
    unstyled: Whether to style the list
    divider: Whether to include a divider between items
  InlineList:
    className: Classname of the list
    unstyled: Whether to style the list
    divider: Whether to include a divider between items
  ListItem:
    ...props: All props passed directly to `li` tag.
---

# Overview

# Examples

```jsx
::title=Breadcrumb
<BreadcrumbList>
  <ListItem><a href="#">Home</a></ListItem>
  <ListItem><a href="#react">React</a></ListItem>
  <ListItem className="current"><span>Lists</span></ListItem>
</BreadcrumbList>
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

```jsx
::title=Inline
<InlineList>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</InlineList>
```