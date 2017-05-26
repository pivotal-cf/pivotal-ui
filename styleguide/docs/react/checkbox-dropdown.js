/*doc
---
title: Checkbox Dropdowns
name: checkbox_dropdown_react
parent: dropdown_react
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-checkbox-dropdown --save

<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader react-svg-loader --save-dev
</code>

## Props

Property         | Required | Type                                | Default  | Description
-----------------|----------|-------------------------------------|----------|------------
buttonAriaLabel  | no       | String                              |          | aria-label for the button
buttonClassName  | no       | String                              |          | Classname to add to the button
labels           | no       | Array                               |          | Array of labels
flat             | no       | Boolean                             |          | If true, dropdown toggle has no borders and is transparent
labelAriaLabel   | no       | String                              |          | aria-label for the label (split dropdown only)
onChange         | no       | Function                            |          | Callback that fires after opening the dropdown
size             | no       | oneOf(['normal', 'large', 'small']) | 'normal' | Sets the size
split            | no       | Boolean                             |          | If true, separates the button text from the toggle

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

Import the subcomponent:

```
import {CheckboxDropdown} from 'pui-react-checkbox-dropdown';
```
*/

/*doc
---
title: Basic Checkbox Dropdown
name: 1_basic_checkbox_dropdown_react
parent: checkbox_dropdown_react
---

This is the basic dropdown. It has an attached menu that extends from the bottom.

```react_example
<div className="form-group">
  <CheckboxDropdown labels={["item #1", "item #2"]} />
</div>
```

*/


/*doc
---
title: Basic Checkbox Dropdown With Callback
name: checkbox_dropdown_custom_callback
parent: 1_basic_checkbox_dropdown_react
---

This is the basic dropdown with a callback. It has an attached menu that extends from the bottom.

```react_example
<div className="form-group">
    <CheckboxDropdown labels={["item #1", "item #2"]} onChange={dropdown => console.log(dropdown)} />
</div>
```

*/
