/*doc
---
title: Buttons
name: button_react
categories:
 - react_base_buttons
 - react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-buttons --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
alt   | no | Boolean | false | Whether to render as 'alternate' button
flat  | no | Boolean | false | Whether to render as a 'flat' button
href  | no | String  |       | If specified, button clicks will redirect to this href
large | no | Boolean | false | Whether to render the button large
small | no | Boolean | false | Whether to render teh button small

## Basic usage

Import the subcomponents:

```
import {DefaultButton, PrimaryButton, DangerButton, BrandButton} from 'pui-react-buttons';
import {Icon} from 'pui-react-iconography';
```

Buttons use the button tag by default. If you'd like a link rather than a button, simply add an `href` attribute.

```react_example_table
<DefaultButton>
  Button
</DefaultButton>

<DefaultButton href="http://example.com">
  Link
</DefaultButton>
```
*/

/*doc
---
title: Styling
name: 01_button_styling_react
parent: button_react
---

Every button type has a default style, an alt style (with inverted colors and a transparent background) and a flat style (alt with transparent borders).

Button                                           | Button Alt                                               | Button Flat                                                | Description
-------------------------------------------------|----------------------------------------------------------|------------------------------------------------------------|-----------
<button class="btn btn-default"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Default</button> |<button class="btn btn-default-alt"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Default Alt</button>  | <button class="btn"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Default Flat</button>                  | This the default button style.
<button class="btn btn-primary"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Primary</button> |<button class="btn btn-primary-alt"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Primary Alt</button>  | <button class="btn btn-primary-flat"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Primary Flat</button> | Use this button for primary actions.
<button class="btn btn-danger"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Danger</button>   |<button class="btn btn-danger-alt"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Danger Alt</button>    | <button class="btn btn-danger-flat"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Danger Flat</button>   | This button is for delete actions, these actions should also have a confirmation dialog
<button class="btn btn-brand"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Brand</button>     |<button class="btn btn-brand-alt"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Brand Alt</button>      | <button class="btn btn-brand-flat"><div class="icon icon-middle spinner"><svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"><circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle><circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%" r="45%"></circle></svg></div>Brand Flat</button>     | This button is for marketing purposes only

The most common button examples are below:

```react_example_table
<DefaultButton>Default</DefaultButton>

<DefaultButton alt>Default Alt</DefaultButton>

<PrimaryButton>Primary</PrimaryButton>

<PrimaryButton alt>Primary Alt</PrimaryButton>

<PrimaryButton flat>Primary Flat</PrimaryButton>

<DangerButton>Danger</DangerButton>
```

*/


/*doc
---
title: Sizes
name: 02_button_sizes_react
parent: button_react
---
To make a button large, set the `large` property to true, to make it small, set `small` to true.

```react_example_table
<DefaultButton large>
  Big Button
</DefaultButton>

<DefaultButton>
Default
</DefaultButton>

<DefaultButton small>
  Small Button
</DefaultButton>
```

*/

/*doc
---
title: Icons
name: 03_button_icons_react
parent: button_react
---

Buttons can contain icons:

```react_example_table
<PrimaryButton>
 <Icon src="add"/>Some button
</PrimaryButton>

<DefaultButton alt>
 <Icon src="spinner-sm"/>Loading
</DefaultButton>
```
*/
