---
title: Dropdowns
menu: components
cssPath: pivotal-ui/css/dropdowns
reactPath: pivotal-ui/react/dropdowns
componentProps:
  Dropdown:
    blockingScrim: If true, blocks mouse events outside of the dropdown. Clicking outside of the dropdown will still close the dropdown.
    border: (undocumented)
    buttonAriaLabel: aria-label for the button
    buttonClassName: Classname to add to the button
    closeOnMenuClick: If false, do not close the menu when clicking in the dropdown menu
    disableScrim: If true, do not close the menu when clicking outside the dropdown
    flat: If true, dropdown toggle has no borders and is transparent
    floatMenu: If true, float the dropdown menu. This only applies to the basic dropdown
    icon: Name of the svg to use for the toggle icon
    itemClassName: Classname to add to each child `li`
    link: If true, color the dropdown toggle like a link
    menuAlign: Sets the alignment of the menu with the button
    onClick: Callback that fires after clicking the button
    onEntered: Callback that fires after opening the dropdown
    onExited: Callback that fires after closing the dropdown
    scroll: Enables scrolling in the dropdown menu when enabled
    showIcon: If false, do not render an icon in the dropdown toggle. Icon can not be hidden if split or leaving out title.
    size: Sets the size
    split: If true, separates the button text from the toggle
    title: The button contents
    toggle: a node to render instead of the button that opens the dropdown
---

# Overview

# Examples

```jsx
::title=Basic dropdown
::description=This is the basic dropdown. It has an attached menu that extends from the bottom.
<Dropdown title='Basic Dropdown'>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
</Dropdown>
```

```jsx
::title=Basic dropdown with custom icon
<Dropdown title='Basic Dropdown Custom Icon' icon='more_vert'>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
</Dropdown>
```

```jsx
::title=Float dropdown menu
::description=The float dropdown menu is spaced 2px below the toggle. It can also be pinned to the left or right for content that exceeds the parent dropdown width.
<Grid>
  <FlexCol fixed>
  <Dropdown title='Float Dropdown Menu' floatMenu>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
  </Dropdown>
  </FlexCol>

  <FlexCol fixed>
  <Dropdown title='Pinned Left' floatMenu menuAlign='left'>
    <a href="#">Note that this option exceeds the width of the parent dropdown toggle</a>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
 </Dropdown>
 </FlexCol>

  <FlexCol fixed>
  <Dropdown title='Pinned Right' floatMenu menuAlign='right'>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
 </Dropdown>
 </FlexCol>
</Grid>
```

```jsx
::title=Float scroll menu
::description=Lists that are indeterminately long can utilize the float scroll menu. The size is fixed so you'll have to customize the fixed height to achieve your desired results.
<Dropdown title='Float Scroll Menu' scroll floatMenu>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
</Dropdown>
```

```jsx
::title=Split dropdown
::description=Action with additional actions hidden in a dropdown. Note the position of the label, in order to style the focused state. Only appropriate as a float menu.
<Dropdown title='Split Dropdown' split>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
</Dropdown>
```

```jsx
::title=Flat button dropdown
::description=Dropdown with the flat button styling. Floating menu only.
<Dropdown title='Flat Button Dropdown' flat>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
</Dropdown>
```

```jsx
::title=Link dropdown
::description=Dropdown with the link styling, retains dropdown padding. Floating menu only.
<Dropdown title='Link Dropdown' link>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
</Dropdown>
```

```jsx
::title=Icon dropdown
::description=Rendered when no title is specified. Floating menu only.
<Dropdown icon='more_vert' menuAlign='left'>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
  <a href="#">lorem ipsum</a>
</Dropdown>
```

```jsx
::title=Sizing
<div>
  <Dropdown title='Large Dropdown' size='large'>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
  </Dropdown>
  <Dropdown title='Normal Dropdown'>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
  </Dropdown>
  <Dropdown title='Small Dropdown' size='small'>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
    <a href="#">lorem ipsum</a>
  </Dropdown>
</div>
```