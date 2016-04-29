/*doc
---
title: Dropdowns
name: dropdown_react
categories:
 - react_components_dropdowns
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-dropdowns --save
</i>
</code>

Require the subcomponents:

```
var Dropdown = require('pui-react-dropdowns').Dropdown;
var DropdownItem = require('pui-react-dropdowns').DropdownItem;
var LinkDropdown = require('pui-react-dropdowns').LinkDropdown;
var DefaultAltDropdown = require('pui-react-dropdowns').DefaultAltDropdown;
var LowlightDropdown = require('pui-react-dropdowns').LowlightDropdown;
var DangerDropdown = require('pui-react-dropdowns').DangerDropdown;
var HighlightDropdown = require('pui-react-dropdowns').HighlightDropdown;
var HighlightAltDropdown = require('pui-react-dropdowns').HighlightAltDropdown;
```

This is the basic bootstrap dropdown:

```react_example_table
<Dropdown title='DropDown'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</Dropdown>
```

Here are all the different dropdown styles:

```react_example_table
<LinkDropdown title='Link'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</LinkDropdown>

<DefaultAltDropdown title='Default Alt'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>

<LowlightDropdown title='Lowlight'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</LowlightDropdown>

<DangerDropdown title='Danger'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DangerDropdown>

<HighlightDropdown title='Highlight'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</HighlightDropdown>

<HighlightAltDropdown title='Highlight Alt'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</HighlightAltDropdown>
```

If you want to customize the dropdown, you can use `className` to add a modifier class to the `btn-group`.

To customize the dropdown button, you can add modifier classes to it
using the `buttonClassName` property. `id` and `style` will also be applied to the dropdown button.

```react_example
<DefaultAltDropdown title='DropDown' buttonClassName='btn-lg'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want to separate your dropdown label from the toggle trigger, you can pass a `split` attribute.

```react_example
<DefaultAltDropdown split title='DropDown'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want a dropdown without a label, you can omit the `title` attribute.

```react_example
<DefaultAltDropdown toggle={<div style={{color: 'darkgoldenrod'}}>&#9733;</div>}>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want a custom toggle trigger, you can pass the `toggle` attribute.

```react_example
<DefaultAltDropdown toggle={<span style={{color: 'darkgoldenrod'}}>&#9733;</span>} title='DropDown'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want to add borders between items, you can pass a `border` attribute to any of our Dropdowns.

```react_example
<DefaultAltDropdown title='DropDown' border>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want to right align the dropdown menu, you can pass a `pullRight` attribute to any of our Dropdowns.

```react_example
<DefaultAltDropdown title='DropDown' pullRight>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want to divide the dropdown menu with dividers, you can pass a `divider` attribute to a DropdownItem.

```react_example
<DefaultAltDropdown title='DropDown'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem divider></DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
</DefaultAltDropdown>
```

A DropdownItem renders a link if given an `href` prop. For more control, do not provide an `href` prop to a DropdownItem.

```react_example
<DefaultAltDropdown title='DropDown'>
  <DropdownItem className="pam"><div onClick={function(){alert('You clicked Booyeah!')}}>Booyeah</div></DropdownItem>
  <DropdownItem className="pam"><div onClick={function(){alert('You clicked Adorable!')}}>Adorable</div></DropdownItem>
</DefaultAltDropdown>
```

*/
