# Dropdowns

## Description
Description for dropdown.

## Dropdown Types

### Basic Dropdown

This is the basic dropdown. It has an attached menu that extends from the bottom.

```jsx
::title=Example
<div className="form-group">
  <Dropdown title='Basic Dropdown'>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```

### Basic Dropdown with Custom Icon

```jsx
::title=Example
<div className="form-group">
  <Dropdown title='Basic Dropdown Custom Icon' icon='more_vert'>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```

### Float Dropdown Menu

The float dropdown menu is spaced 2px below the toggle. It can also be pinned to the left or right for content that
exceeds the parent dropdown width.

```jsx
::title=Example
<div>
  <div className="form-group form-inline">
    <Dropdown title='Float Dropdown Menu' floatMenu>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
    </Dropdown>
  </div>

  <div className="form-group form-inline">
    <Dropdown title='Pinned Left' floatMenu menuAlign='left'>
      <DropdownItem href="#">Note that this option exceeds the width of the parent dropdown toggle</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
   </Dropdown>
  </div>

  <div className="form-group form-inline">
    <Dropdown title='Pinned Right' floatMenu menuAlign='right'>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
   </Dropdown>
  </div>
</div>
```

### Float Scroll Menu

Lists that are indeterminately long can utilize the float scroll menu. The size is
fixed so you'll have to customize the fixed height to achieve your desired results.

```jsx
::title=Example
<div className="form-group">
  <Dropdown title='Float Scroll Menu' scroll floatMenu>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```

### Split Dropdown

Action with additional actions hidden in a dropdown. Note the position of the label, in order to style the
focused state. Only appropriate as a float menu.

```jsx
::title=Example
<div className="form-group">
  <Dropdown title='Split Dropdown' split>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```
### Flat Button Dropdown


Dropdown with the flat button styling. Floating menu only.

```jsx
::title=Example
<div className="form-group form-inline">
  <Dropdown title='Flat Button Dropdown' flat>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```

### Link Dropdown

Dropdown with the link styling, retains dropdown padding. Floating menu only.

```jsx
::title=Example
<div className="form-group form-inline">
  <Dropdown title='Link Dropdown' link>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```

### Icon Dropdown

Rendered when no title is specified. Floating menu only.

```jsx
::title=Example
<div className="form-group">
  <Dropdown icon='more_vert' menuAlign='left'>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```

## Sizing

```jsx
<div>
  <div className="form-group form-inline">
    <Dropdown title='Large Dropdown' size='large'>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
    </Dropdown>
  </div>
  <div className="form-group form-inline">
    <Dropdown title='Normal Dropdown'>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
    </Dropdown>
  </div>
  <div className="form-group form-inline">
    <Dropdown title='Small Dropdown' size='small'>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
      <DropdownItem href="#">lorem ipsum</DropdownItem>
    </Dropdown>
  </div>
</div>
```

## Props

Property         | Required | Type                                | Default        | Description
-----------------|----------|-------------------------------------|----------------|------------
buttonAriaLabel  | no       | String                              |                | aria-label for the button
buttonClassName  | no       | String                              |                | Classname to add to the button
closeOnMenuClick | no       | Boolean                             | true           | If false, do not close the menu when clicking in the dropdown menu
disableScrim     | no       | Boolean                             | false          | If true, do not close the menu when clicking outside the dropdown
flat             | no       | Boolean                             |                | If true, dropdown toggle has no borders and is transparent
floatMenu        | no       | Boolean                             | false          | If true, float the dropdown menu. This only applies to the basic dropdown
href             | no       | String                              |                | Link for the default option (split dropdown only)
icon             | no       | String                              | 'chevron_down' | Name of the svg to use for the toggle icon
link             | no       | Boolean                             |                | If true, color the dropdown toggle like a link
labelAriaLabel   | no       | String                              |                | aria-label for the label (split dropdown only)
menuAlign        | no       | oneOf(['none', 'left', 'right'])    | 'none'         | Sets the alignment of the menu with the button
onClick          | no       | Function                            |                | Callback that fires after clicking the button
onEntered        | no       | Function                            |                | Callback that fires after opening the dropdown
onExited         | no       | Function                            |                | Callback that fires after closing the dropdown
onSelect         | no       | Function                            |                | Callback that fires after clicking the default option (split dropdown only)
onSplitClick     | no       | Function                            |                | Callback that fires after clicking the text (split dropdown only)
scroll           | no       | Boolean                             | false          | Enables scrolling in the dropdown menu when enabled
showIcon         | no       | Boolean                             | true           | If false, do not render an icon in the dropdown toggle. Icon can not be hidden if split or leaving out title.
size             | no       | oneOf(['normal', 'large', 'small']) | 'normal'       | Sets the size
split            | no       | Boolean                             |                | If true, separates the button text from the toggle
splitClassName   | no       | String                              |                | Classname to add to the text (split dropdown only)
title            | no       | Node                                |                | The button contents

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

### DropdownItems Props


Property         | Required | Type                                | Default        | Description
-----------------|----------|-------------------------------------|----------------|------------
className        | no       | String                              |                | Classes to apply
style            | no       | Object                              |                | Inline style to apply
href             | no       | String                              |                | Link for the DropdownItem option
header           | no       | Boolean                             |                | Makes the DropdownItem of type header
divider          | no       | Boolean                             |                | Makes the DropdownItem of type Divider
disabled         | no       | Boolean                             |                | Disables the DropdownItem
eventKey         | no       | String                              |                | DropdownItem identifier
onSelect         | no       | Function                            |                | Callback that fires after clicking the DropdownItem

Import the subcomponents:

```
import {Dropdown, DropdownItem} from 'pui-react-dropdowns';
```