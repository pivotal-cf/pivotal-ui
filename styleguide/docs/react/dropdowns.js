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

Property         | Required | Type                                | Default        | Description
-----------------|----------|-------------------------------------|----------------|------------
buttonAriaLabel  | no       | String                              |                | aria-label for the button
buttonClassName  | no       | String                              |                | Classname to add to the button
closeOnMenuClick | no       | Boolean                             | true           | If false, do not close the menu when clicking in the dropdown menu
disableScrim     | no       | Boolean                             | false          | If true, do not close the menu when clicking outside the dropdown
flat             | no       | Boolean                             |                | If true, dropdown toggle has no borders and is transparent
floatMenu        | no       | Boolean                             | false          | If true, float the dropdown menu. This only applies to the basic dropdown
icon             | no       | String                              | 'chevron_down' | Name of the svg to use for the toggle icon
link             | no       | Boolean                             |                | If true, color the dropdown toggle like a link
menuAlign        | no       | oneOf(['none', 'left', 'right'])    | 'none'         | Sets the alignment of the menu with the button
onEntered        | no       | Function                            |                | Callback that fires after opening the dropdown
onExited         | no       | Function                            |                | Callback that fires after closing the dropdown
scroll           | no       | Boolean                             | false          | Enables scrolling in the dropdown menu when enabled
showIcon         | no       | Boolean                             | true           | If false, do not render an icon in the dropdown toggle. Icon can not be hidden if split or leaving out title.
size             | no       | oneOf(['normal', 'large', 'small']) | 'normal'       | Sets the size
split            | no       | Boolean                             |                | If true, separates the button text from the toggle
title            | no       | Node                                |                | The button contents

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

Import the subcomponents:

```
import {Dropdown, DropdownItem} from 'pui-react-dropdowns';
```
*/

/*doc
---
title: Basic Dropdown
name: 1_basic_dropdown_react
parent: dropdown_react
---

This is the basic dropdown. It has an attached menu that extends from the bottom.

```react_example
<div className="form-group">
  <Dropdown title='Basic Dropdown'>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```
*/

/*doc
---
title: Basic Dropdown With Custom Icon
name: custom_icon
parent: 1_basic_dropdown_react
---

```react_example
<div className="form-group">
  <Dropdown title='Basic Dropdown Custom Icon' icon='more_vert'>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```
 */

/*doc
---
title: Float Dropdown Menu
name: 2_float_dropdown_menu_react
parent: dropdown_react
---

The float dropdown menu is spaced 2px below the toggle. It can also be pinned to the left or right for content that
exceeds the parent dropdown width.

```react_example
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
*/

/*doc
---
title: Float Scroll Menu
name: 3_float_scroll_menu_react
parent: dropdown_react
---

Lists that are indeterminately long can utilize the float scroll menu. The size is
fixed so you'll have to customize the fixed height to achieve your desired results.

```react_example
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
*/

/*doc
---
title: Split Dropdown
name: 4_split_dropdown_react
parent: dropdown_react
---

Action with additional actions hidden in a dropdown. Floating menu only.

```react_example
<div className="form-group form-inline">
  <Dropdown title='Split Dropdown' split>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```
*/

/*doc
---
title: Flat Button Dropdown
name: 5_flat_button_dropdown_react
parent: dropdown_react
---

Dropdown with the flat button styling. Floating menu only.

```react_example
<div className="form-group form-inline">
  <Dropdown title='Flat Button Dropdown' flat>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```
*/

/*doc
---
title: Link Dropdown
name: 6_link_dropdown_react
parent: dropdown_react
---

Dropdown with the link styling, retains dropdown padding. Floating menu only.

```react_example
<div className="form-group form-inline">
  <Dropdown title='Link Dropdown' link>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```
*/

/*doc
---
title: Icon Dropdown
name: 7_icon_dropdown_react
parent: dropdown_react
---

Rendered when no title is specified. Floating menu only.

```react_example
<div className="form-group">
  <Dropdown icon='more_vert' menuAlign='left'>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
    <DropdownItem href="#">lorem ipsum</DropdownItem>
  </Dropdown>
</div>
```
*/

/*doc
---
title: Sizing
name: 8_dropdown_sizing_react
parent: dropdown_react
---

```react_example
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
*/