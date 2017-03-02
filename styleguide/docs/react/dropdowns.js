/*doc
---
title: Dropdowns
name: dropdown_react
categories:
- react_components_dropdowns
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-dropdowns --save

<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader svg-react-loader --save-dev
</code>

## Props

Property         | Required | Type                             | Default | Description
-----------------|----------|----------------------------------|---------|------------
border           | no       | Boolean                          |         | If true, adds a border between menu items
buttonClassName  | no       | String                           |         | Classname to add to the button
closeOnMenuClick | no       | Boolean                          | true    | If false, do not close the menu when clicking in the dropdown menu
disableScrim     | no       | Boolean                          | false   | If true, do not close the menu when clicking outside the dropdown
dropCaret        | no       | Boolean                          | true    | If false, do not render the caret in the dropdown toggle
flat             | no       | Boolean                          |         | If true, dropdown toggle has no borders and is transparent
link             | no       | Boolean                          |         | If true, color the dropdown toggle like a link
menuCaret        | no       | Boolean                          |         | If true, render a caret in the menu pointing at the toggle
onEntered        | no       | Function                         |         | Callback that fires after opening the dropdown
onExited         | no       | Function                         |         | Callback that fires after closing the dropdown
split            | no       | Boolean                          |         | If true, separates the button text from the toggle
title            | no       | Node                             |         | The button contents
toggle           | no       | Node                             |         | The toggle contents
menuAlign        | no       | oneOf(['none', 'left', 'right']) | 'none'  | Sets the alignment of the menu with the button
scroll           | no       | Boolean                          | false   | Enables scrolling in the dropdown menu when enabled

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

Import the subcomponents:

```
import {Dropdown, DropdownItem} from 'pui-react-dropdowns';
```

## Basic Dropdown

This is the basic dropdown. It has an attached menu that extends from the bottom.

```react_example
<Dropdown title='Basic DropDown'>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
</Dropdown>
```

## Float Dropdown Menu:

The float dropdown menu is spaced 2px below the toggle. It can also be pinned to the left or right for content that
exceeds the parent dropdown width.

```react_example
<div className="form-group" style={{display: 'flex'}}>
 <Dropdown title='Float DropDown Menu' menuCaret style={{marginRight: 32}}>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
 </Dropdown>

 <Dropdown title='Pinned Left' menuCaret menuAlign='left' style={{marginRight: 32}}>
 <DropdownItem href="#">Note that this option exceeds the width of the parent dropdown toggle</DropdownItem>
 <DropdownItem href="#">lorem ipsum</DropdownItem>
 <DropdownItem href="#">lorem ipsum</DropdownItem>
 </Dropdown>

 <Dropdown title='Pinned Right' menuCaret menuAlign='right'>
 <DropdownItem href="#">lorem ipsum</DropdownItem>
 <DropdownItem href="#">lorem ipsum</DropdownItem>
 <DropdownItem href="#">lorem ipsum</DropdownItem>
 </Dropdown>
</div>
```

## Float Scroll Menu:

Lists that are indeterminately long can utilize the float scroll menu. The size is
fixed so you'll have to customize the fixed height to achieve your desired results.

```react_example
<Dropdown title='Float Scroll Menu' scroll menuCaret>
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
```

## Split Dropdown:

Action with additional actions hidden in a dropdown. Only appropriate as a float menu.

```react_example
<Dropdown title='Split Dropdown' split>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
</Dropdown>
```

## Flat Button Dropdown:

Dropdown with the flat button styling.

```react_example
<Dropdown title='Flat Button DropDown' flat>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
</Dropdown>
```

## Link Dropdown:

Dropdown with the link styling, retains dropdown padding.

```react_example
<Dropdown title='Link DropDown' link>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
  <DropdownItem href="#">lorem ipsum</DropdownItem>
</Dropdown>
```
*/
